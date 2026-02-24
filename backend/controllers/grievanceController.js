import Grievance from '../models/Grievance.js';
import AuditLog from '../models/AuditLog.js';
import User from '../models/User.js';
import { createBlockData } from '../utils/ledgerUtils.js';

// @desc    Submit a new grievance
// @route   POST /api/grievances
// @access  Public
export const submitGrievance = async (req, res) => {
    try {
        const {
            citizenName, email, phone, category, location,
            description, latitude, longitude, exifTimestamp,
            proofUrl, userId
        } = req.body;

        const grievanceId = 'GRV' + Math.floor(100000 + Math.random() * 900000);

        // Initial block data
        const blockData = createBlockData(null, 'Grievance Created', '0');

        const grievance = await Grievance.create({
            citizenName,
            email,
            phone,
            category,
            location,
            latitude,
            longitude,
            exifTimestamp,
            description,
            grievanceId,
            proofUrl,
            originalReporter: userId,
            lastHash: blockData.currentHash
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

        // Mock WhatsApp Notification if moving to 'Resolved'
        if (status === 'Resolved') {
            console.log('\n--- MOCK WHATSAPP NOTIFICATION ---');
            console.log(`To: ${grievance.phone}`);
            console.log(`Message: Dear ${grievance.citizenName}, your report ${grievance.grievanceId} has been marked as RESOLVED by the department.`);
            console.log(`Please provide your feedback here: http://127.0.0.1:5173/city-pulse`);
            console.log('----------------------------------\n');
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

        await AuditLog.create(blockData);

        res.json({ message: 'Grievance archived successfully', grievance });
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
// @desc    Submit feedback by original reporter
// @route   PUT /api/grievances/:id/feedback
// @access  Private
export const submitFeedback = async (req, res) => {
    try {
        const { feedback, comment } = req.body;
        const grievance = await Grievance.findOne({ grievanceId: req.params.id });

        if (!grievance) {
            return res.status(404).json({ message: 'Grievance not found' });
        }

        grievance.citizenFeedback = feedback;
        grievance.feedbackComment = comment;

        // If user says 'Resolved', we can archive it
        if (feedback === 'Resolved') {
            grievance.status = 'Archived';
            const blockData = createBlockData(grievance._id, 'Citizen Confirmed Resolution', grievance.lastHash);
            grievance.lastHash = blockData.currentHash;
            await AuditLog.create(blockData);
        }

        await grievance.save();
        res.json({ message: 'Feedback submitted successfully', grievance });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
