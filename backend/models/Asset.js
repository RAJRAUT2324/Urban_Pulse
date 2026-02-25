import mongoose from 'mongoose';

const assetSchema = mongoose.Schema({
    assetId: { type: String, required: true, unique: true },
    assetType: {
        type: String,
        required: true,
        enum: ['ROAD', 'PIPE', 'POLE', 'LIGHT', 'OTHER']
    },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], index: '2dsphere' } // [longitude, latitude]
    },
    failureCount18Months: { type: Number, default: 0 },
    lastFailureDate: { type: Date },
    healthStatus: {
        type: String,
        enum: ['GOOD', 'DEGRADED', 'STRUCTURAL_FATIGUE'],
        default: 'GOOD'
    },
    recommendation: {
        type: String,
        enum: ['PATCH', 'FULL_REBUILD', 'NONE'],
        default: 'NONE'
    },
    relatedComplaints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grievance' }]
}, {
    timestamps: true
});

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;
