import mongoose from 'mongoose';

const wardVoteSchema = mongoose.Schema(
    {
        wardId: {
            type: String,
            required: true,
        },
        option: {
            type: String,
            required: true, // e.g., 'Tree Plantation', 'Park Benches'
        },
        votes: {
            type: Number,
            required: true,
            default: 0,
        },
        voters: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        creditSpent: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);

// Compound index to ensure options are unique within a ward (optional, but good for data integrity)
wardVoteSchema.index({ wardId: 1, option: 1 }, { unique: true });

const WardVote = mongoose.model('WardVote', wardVoteSchema);

export default WardVote;
