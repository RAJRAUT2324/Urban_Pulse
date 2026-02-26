import mongoose from 'mongoose';

const supportRequestSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['Help', 'Contact'],
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    relatedGrievanceId: {
        type: String // Plain ID from Grievance model
    },
    reason: {
        type: String // Dropdown reason for escalation
    },
    proofUrl: {
        type: String
    },
    referenceId: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        default: 'Submitted'
    }
}, {
    timestamps: true
});

const SupportRequest = mongoose.model('SupportRequest', supportRequestSchema);

export default SupportRequest;
