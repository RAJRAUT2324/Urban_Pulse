import mongoose from 'mongoose';

const pollSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        options: [
            {
                label: { type: String, required: true },
                votes: { type: Number, default: 0 },
            }
        ],
        voters: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                optionLabel: { type: String },
                timestamp: { type: Date, default: Date.now }
            }
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        wardId: {
            type: String, // Optional: for ward-specific polls
        },
        category: {
            type: String,
            enum: ['Infrastructure', 'Health', 'Environment', 'Culture', 'Education', 'General'],
            default: 'General'
        }
    },
    {
        timestamps: true,
    }
);

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;
