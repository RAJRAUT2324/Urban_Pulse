import Grievance from '../models/Grievance.js';
import AuditLog from '../models/AuditLog.js';
import User from '../models/User.js';
import Asset from '../models/Asset.js';
import CivicCredits from '../models/CivicCredits.js';
import { createBlockData } from '../utils/ledgerUtils.js';

// --- HELPER: AI Priority Calculation ---
const calculateInternalPriority = (category, description, locationContext = {}) => {
    let severity = 5;
    if (category === 'Pothole') severity = 7;
    if (category === 'Health Hazard') severity = 10;
    if (category === 'Drainage Leak') severity = 8;

    let multiplier = 1.0;
    if (description.toLowerCase().includes('hospital')) multiplier *= 2.0;
    if (description.toLowerCase().includes('school')) multiplier *= 1.8;
    if (description.toLowerCase().includes('highway') || description.toLowerCase().includes('main road')) multiplier *= 1.5;

    // Population impact mock
    const popFactor = 5;
    return severity * popFactor * multiplier;
};

// @desc    Submit a new grievance
// @route   POST /api/grievances
// @access  Public
export const submitGrievance = async (req, res) => {
    try {
        const {
            citizenName, email, phone, category, location,
            description, latitude, longitude, exifTimestamp,
            proofUrl, userId, assetId
        } = req.body;

        const grievanceId = 'GRV' + Math.floor(100000 + Math.random() * 900000);

        // 1. AI Department Assignment
        const categoryMap = {
            'Pothole': 'Roads',
            'Drainage Leak': 'Water',
            'Water Supply': 'Water',
            'Streetlight': 'Electricity',
            'Garbage': 'Waste Management',
            'Health Hazard': 'Public Health'
        };
        const department = categoryMap[category] || 'Other';

        // 2. AI Dynamic Priority
        const priorityScore = calculateInternalPriority(category, description);

        // 3. AI Root-Cause & Asset Tracking
        const aiAnalysis = {
            rootCause: "Awaiting deeper correlation...",
            structuralHealth: 100, // default
            historicalFrequency: 0,
            contextEscalation: priorityScore > 80
        };

        if (assetId) {
            const asset = await Asset.findOne({ assetId });
            if (asset) {
                asset.failureCount18Months += 1;
                asset.lastFailureDate = new Date();

                if (asset.failureCount18Months >= 10) {
                    asset.healthStatus = 'STRUCTURAL_FATIGUE';
                    asset.recommendation = 'FULL_REBUILD';
                } else if (asset.failureCount18Months >= 5) {
                    asset.healthStatus = 'DEGRADED';
                    asset.recommendation = 'PATCH';
                }

                aiAnalysis.historicalFrequency = asset.failureCount18Months;
                aiAnalysis.structuralHealth = asset.healthStatus === 'GOOD' ? 90 : (asset.healthStatus === 'DEGRADED' ? 40 : 10);
                aiAnalysis.rootCause = asset.healthStatus === 'STRUCTURAL_FATIGUE' ?
                    "Chronic failure history detected. Recommend full infrastructure rebuild." :
                    "AI correlating with local asset health profiles...";

                await asset.save();
            }
        }

        // Initial block data
        const blockData = createBlockData(null, 'Grievance Created', '0');

        const grievance = await Grievance.create({
            citizenName, email, phone, category, location,
            latitude, longitude, exifTimestamp, description,
            grievanceId, proofUrl, originalReporter: userId,
            lastHash: blockData.currentHash,
            department, priorityScore, aiAnalysis,
            status: 'AI Classified',
            assetId
        });

        // Update block with actual ticket DB ID
        blockData.ticketId = grievance._id;

        await AuditLog.create(blockData);

        res.status(201).json(grievance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update grievance status with blockchain audit
// @route   PUT /api/grievances/:id/status
// @access  Private/Admin
export const updateGrievanceStatus = async (req, res) => {
    try {
        const { status, actionMetadata } = req.body;
        const grievance = await Grievance.findOne({ grievanceId: req.params.id });

        if (!grievance) {
            return res.status(404).json({ message: 'Grievance not found' });
        }

        const oldStatus = grievance.status;
        const action = `Status Changed: ${oldStatus} -> ${status}`;

        const blockData = createBlockData(grievance._id, action, grievance.lastHash);

        grievance.status = status;
        grievance.lastHash = blockData.currentHash;
        await grievance.save();

        await AuditLog.create({
            ...blockData,
            metadata: actionMetadata
        });

        // WhatsApp Notification & Learning Loop
        if (status === 'Resolved') {
            console.log(`\n--- WHATSAPP: Dear ${grievance.citizenName}, report ${grievance.grievanceId} is RESOLVED. ---`);
            console.log(`Please verify the fix at: http://localhost:5173/city-pulse`);

            // FEEDBACK LOOP (Industrial Learning System)
            // If resolving a high-priority issue quickly, we reinforce the priority engine's weights.
            if (grievance.priorityScore > 100) {
                console.log(`[LEARNING_SYSTEM] Feedback reinforcement: Priority formula validated for ${grievance.category}.`);
                // In a production app, we would update a 'ModelWeight' collection here.
            }
        }

        res.json(grievance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Verify fix by original reporter
// @route   PUT /api/grievances/:id/verify
// @access  Private
export const verifyFix = async (req, res) => {
    try {
        const grievance = await Grievance.findOne({ grievanceId: req.params.id });

        if (!grievance) {
            return res.status(404).json({ message: 'Grievance not found' });
        }

        // Logic for reporter verification
        const blockData = createBlockData(grievance._id, 'Fix Verified by Reporter', grievance.lastHash);

        grievance.status = 'Archived';
        grievance.lastHash = blockData.currentHash;
        await grievance.save();

        // --- NEW: Gamification System ---
        // Award credit points to the user who verified the fix
        if (grievance.originalReporter) {
            const user = await User.findById(grievance.originalReporter);
            if (user) {
                user.scoreCredit += 50; // Legacy score
                await user.save();

                // ADDITIVE: Purpose-Locked Civic Credits
                let civicCredits = await CivicCredits.findOne({ userId: user._id });
                if (!civicCredits) {
                    civicCredits = new CivicCredits({ userId: user._id });
                }

                const amount = 10; // 10 credits per verification
                civicCredits.totalCredits += amount;

                // Purpose Lock Split: 40% Tax, 30% Health, 30% Voting
                civicCredits.lockedCredits.taxUtility += amount * 0.4;
                civicCredits.lockedCredits.healthcare += amount * 0.3;
                civicCredits.lockedCredits.developmentVoting += amount * 0.3;

                civicCredits.history.push({
                    reason: 'Verified fix for complaint',
                    credits: amount,
                    complaintId: grievance.grievanceId
                });

                await civicCredits.save();
            }
        }
        // -------------------------------

        await AuditLog.create(blockData);

        res.json({ message: 'Grievance archived successfully and credit points awarded', grievance });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get nearby verified users for validation
// @route   GET /api/grievances/:id/nearby-validators
// @access  Private
export const getNearbyValidators = async (req, res) => {
    try {
        const grievance = await Grievance.findOne({ grievanceId: req.params.id });
        if (!grievance) return res.status(404).json({ message: 'Grievance not found' });

        // Mocking neighbor search based on lat/long
        // In a real MongoDB setup, you'd use $near or $geoWithin
        const neighbors = await User.find({
            isVerified: true,
            _id: { $ne: grievance.originalReporter }
        }).limit(5);

        res.json(neighbors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all grievances
// @route   GET /api/grievances
// @access  Public
export const getGrievances = async (req, res) => {
    try {
        const grievances = await Grievance.find({}).sort({ createdAt: -1 });
        res.json(grievances);
    } catch (error) {
        console.error("GET_GRIEVANCES_ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get grievance by ID
// @route   GET /api/grievances/:id
// @access  Public
export const getGrievanceById = async (req, res) => {
    try {
        const grievance = await Grievance.findOne({ grievanceId: req.params.id });
        if (grievance) {
            res.json(grievance);
        } else {
            res.status(404).json({ message: 'Grievance not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// @desc    Get Department-wise metrics
// @route   GET /api/grievances/stats/departments
// @access  Private/Admin
export const getDepartmentStats = async (req, res) => {
    try {
        const stats = await Grievance.aggregate([
            {
                $group: {
                    _id: "$department",
                    count: { $sum: 1 },
                    resolved: {
                        $sum: { $cond: [{ $eq: ["$status", "Resolved"] }, 1, 0] }
                    },
                    pending: {
                        $sum: { $cond: [{ $eq: ["$status", "Reported"] }, 1, 0] }
                    }
                }
            }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Review Resolution (Citizen Feedback Loop)
// @route   PUT /api/grievances/:id/review
// @access  Private
export const reviewResolution = async (req, res) => {
    try {
        const { satisfaction, comment } = req.body;
        const grievance = await Grievance.findOne({ grievanceId: req.params.id });

        if (!grievance) return res.status(404).json({ message: "Grievance not found" });

        grievance.citizenFeedback = satisfaction ? 'Resolved' : 'Not Resolved';
        grievance.feedbackComment = comment;

        if (satisfaction) {
            grievance.status = 'Archived';
        } else {
            // Re-open if citizen rejects the fix
            grievance.status = 'Reported';
            grievance.priorityScore += 50; // Bump priority due to failed fix
        }

        await grievance.save();
        res.json({ message: "Review processed", grievance });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
