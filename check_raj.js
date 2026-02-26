import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Grievance from './backend/models/Grievance.js';
import CivicCredits from './backend/models/CivicCredits.js';

dotenv.config({ path: './.env' });

const checkUserGrievances = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const userId = '699db3f697635efa6441e282';

        const grievances = await Grievance.find({ originalReporter: userId });
        console.log(`Grievances for Raj Raut: ${grievances.length}`);
        grievances.forEach(g => {
            console.log(`ID: ${g.grievanceId}, Status: ${g.status}, CitizenFeedback: ${g.citizenFeedback}`);
        });

        const credits = await CivicCredits.findOne({ userId });
        if (credits) {
            console.log(`CivicCredits Found: Total: ${credits.totalCredits}, History Count: ${credits.history.length}`);
            credits.history.forEach((h, i) => {
                console.log(`History ${i + 1}: Reason: ${h.reason}, Credits: ${h.credits}, ID: ${h.complaintId}`);
            });
        } else {
            console.log("No CivicCredits record found for Raj Raut.");
        }

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkUserGrievances();
