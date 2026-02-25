import mongoose from 'mongoose';

const civicCreditsSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            unique: true,
        },
        totalCredits: {
            type: Number,
            required: true,
            default: 0,
        },
        lockedCredits: {
            taxUtility: { type: Number, default: 0 },
            healthcare: { type: Number, default: 0 },
            developmentVoting: { type: Number, default: 0 },
        },
        history: [
            {
                reason: { type: String, required: true },
                credits: { type: Number, required: true },
                date: { type: Date, default: Date.now },
                complaintId: { type: String },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const CivicCredits = mongoose.model('CivicCredits', civicCreditsSchema);

export default CivicCredits;
