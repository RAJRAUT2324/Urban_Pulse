import mongoose from 'mongoose';

const emergencyComplaintSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['Women Emergency', 'Employee Misconduct', 'Officer Inaction'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    officerDetails: {
        type: String
    },
    proofUrl: {
        type: String
    },
    location: {
        type: String
    },
    referenceId: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        default: 'Reported',
        enum: ['Reported', 'Under Investigation', 'Action Taken', 'Closed']
    },
    outcome: {
        type: String
    },
    isRestricted: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const EmergencyComplaint = mongoose.model('EmergencyComplaint', emergencyComplaintSchema);

export default EmergencyComplaint;
