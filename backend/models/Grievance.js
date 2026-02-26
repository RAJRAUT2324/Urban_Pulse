import mongoose from 'mongoose';

const grievanceSchema = mongoose.Schema({
    citizenName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    exifTimestamp: { type: Date },
    description: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ['Reported', 'AI Classified', 'Worker Assigned', 'Work Under Review', 'Blockchain Verified', 'Pending Verification', 'Resolved', 'Archived'],
        default: 'Reported'
    },
    assignedWorker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedAt: { type: Date },
    completedAt: { type: Date },
    resolutionProofUrl: { type: String },
    department: {
        type: String,
        enum: ['Roads', 'Water', 'Electricity', 'Waste Management', 'Public Health', 'Other'],
        default: 'Other'
    },
    priorityScore: { type: Number, default: 0 },
    aiAnalysis: {
        rootCause: { type: String },
        structuralHealth: { type: Number }, // 0-100
        historicalFrequency: { type: Number },
        contextEscalation: { type: Boolean, default: false }
    },
    grievanceId: { type: String, required: true, unique: true },
    proofUrl: { type: String },
    lastHash: { type: String },
    verificationVotes: {
        upvotes: { type: Number, default: 0 },
        downvotes: { type: Number, default: 0 }
    },
    citizenFeedback: {
        type: String,
        enum: ['Resolved', 'Not Resolved', 'Pending'],
        default: 'Pending'
    },
    feedbackComment: { type: String },
    originalReporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {

    timestamps: true
});

const Grievance = mongoose.model('Grievance', grievanceSchema);

export default Grievance;
