import mongoose from 'mongoose';

const auditLogSchema = mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grievance',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    action: {
        type: String,
        required: true
    },
    previousHash: {
        type: String,
        required: true
    },
    currentHash: {
        type: String,
        required: true
    },
    metadata: {
        type: Object
    }
}, {
    timestamps: true
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
