import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Grievance from './backend/models/Grievance.js';

dotenv.config();

const auditGrievances = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const grievances = await Grievance.find({});
        console.log('--- Worker Portal Data Audit ---');
        console.log('Total Grievances:', grievances.length);
        grievances.forEach(g => {
            console.log(`ID: ${g.grievanceId}, Status: "${g.status}", AssignedTo: "${g.assignedWorker}", Category: ${g.category}`);
        });
        process.exit(0);
    } catch (error) {
        console.error('ERROR:', error);
        process.exit(1);
    }
};

auditGrievances();
