import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ['Local People', 'Worker', 'Department'],
            default: 'Local People',
        },
        scoreCredit: {
            type: Number,
            required: true,
            default: 0,
        },
        phoneNumber: {
            type: String,
        },
        address: {
            type: String,
        },
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        workerPoints: {
            type: Number,
            default: 0,
        },
        tasksVerified: {
            type: Number,
            default: 0,
        },
        qualityScore: {
            type: Number,
            default: 0,
        },
        badgeCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
