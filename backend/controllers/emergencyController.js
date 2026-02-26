import EmergencyComplaint from '../models/EmergencyComplaint.js';
import AuditLog from '../models/AuditLog.js';

// @desc    Submit Emergency Complaint
// @route   POST /api/emergency
export const submitEmergencyComplaint = async (req, res) => {
    try {
        const { userId, type, description, officerDetails, proofUrl, location } = req.body;

        const referenceId = 'EMG' + Math.floor(100000 + Math.random() * 900000);

        const complaint = await EmergencyComplaint.create({
            userId, type, description, officerDetails, proofUrl, location, referenceId
        });

        // Audit Logging
        await AuditLog.create({
            ticketId: complaint._id,
            action: 'EMERGENCY_COMPLAINT_LOGGED',
            previousHash: 'SAFE_ISOLATION_GENESIS',
            currentHash: 'EMG_HASH_' + Math.random().toString(36).substring(7),
            metadata: { referenceId, type }
        });

        console.log(`\n--- CRITICAL ALERT: Emergency ${type} ${referenceId} Logged ---`);

        res.status(201).json(complaint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all emergency complaints (Officer Only)
// @route   GET /api/emergency
export const getEmergencyComplaints = async (req, res) => {
    try {
        const complaints = await EmergencyComplaint.find({}).sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Take action on emergency complaint
// @route   PUT /api/emergency/:id
export const updateEmergencyStatus = async (req, res) => {
    try {
        const { status, outcome } = req.body;
        const complaint = await EmergencyComplaint.findById(req.params.id);

        if (complaint) {
            complaint.status = status;
            complaint.outcome = outcome;
            await complaint.save();

            // Audit
            await AuditLog.create({
                ticketId: complaint._id,
                action: `EMERGENCY_UPDATE_${status.toUpperCase()}`,
                previousHash: 'EMG_FLOW',
                currentHash: 'EMG_UPDATE_HASH_' + Math.random().toString(36).substring(7),
                metadata: { status, outcome }
            });

            res.json(complaint);
        } else {
            res.status(404).json({ message: 'Complaint not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
