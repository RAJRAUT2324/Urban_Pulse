import SupportRequest from '../models/SupportRequest.js';
import Grievance from '../models/Grievance.js';
import AuditLog from '../models/AuditLog.js';

// @desc    Get user's real grievances for escalation
// @route   GET /api/support/user-grievances/:userId
export const getUserGrievances = async (req, res) => {
    try {
        const grievances = await Grievance.find({ originalReporter: req.params.userId }).sort({ createdAt: -1 });
        res.json(grievances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit Help or Contact request
// @route   POST /api/support
export const submitSupportRequest = async (req, res) => {
    try {
        const { userId, type, subject, message, relatedGrievanceId, reason, proofUrl } = req.body;

        const referenceId = 'SUP' + Math.floor(100000 + Math.random() * 900000);

        const request = await SupportRequest.create({
            userId, type, subject, message, relatedGrievanceId, reason, proofUrl, referenceId
        });

        // Audit Logging
        await AuditLog.create({
            ticketId: request._id,
            action: `${type.toUpperCase()}_REQUEST_SUBMITTED`,
            previousHash: 'NA',
            currentHash: 'SECURE_HASH_' + Math.random().toString(36).substring(7),
            metadata: { referenceId, type }
        });

        // Simulated Email Trigger
        console.log(`\n--- EMAIL: New ${type} Request ${referenceId} sent to Admin Authority ---`);

        res.status(201).json(request);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
