import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Grievance from './backend/models/Grievance.js';
import User from './backend/models/User.js';

dotenv.config();

const seedWorkerTasks = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('--- Seeding Worker Portal Demo Data ---');

        // Find a worker to assign a task
        const worker = await User.findOne({ role: 'Worker' });
        const workerId = worker ? worker._id : new mongoose.Types.ObjectId();

        const demoTasks = [
            {
                citizenName: "Amravati Resident",
                email: "resident@amravati.gov",
                phone: "9876543210",
                category: "Roads",
                location: "Rajapeth Bridge Area, Amravati",
                latitude: 20.9250,
                longitude: 77.7550,
                description: "Severe potholes detected near the main junction. AI suggests immediate leveling.",
                status: "AI Classified",
                grievanceId: "GRV-" + Math.floor(100000 + Math.random() * 900000),
                priorityScore: 85,
                department: "Roads"
            },
            {
                citizenName: "Civic Watch",
                email: "watchman@amravati.gov",
                phone: "9988776655",
                category: "Water",
                location: "Gadge Nagar, Amravati",
                latitude: 20.9450,
                longitude: 77.7700,
                description: "Main water pipeline leakage reported. Flow intensity is high.",
                status: "AI Classified",
                grievanceId: "GRV-" + Math.floor(100000 + Math.random() * 900000),
                priorityScore: 92,
                department: "Water"
            },
            {
                citizenName: "Asha System",
                email: "asha@urbanpulse.ai",
                phone: "1112223333",
                category: "Electricity",
                location: "Irwin Hospital Road, Amravati",
                latitude: 20.9330,
                longitude: 77.7530,
                description: "Streetlight outage across 5 poles. Predicted circuit fault.",
                status: "Worker Assigned",
                assignedWorker: workerId,
                assignedAt: new Date(),
                grievanceId: "GRV-" + Math.floor(100000 + Math.random() * 900000),
                priorityScore: 78,
                department: "Electricity"
            }
        ];

        await Grievance.insertMany(demoTasks);
        console.log(`Success! Inserted 3 demo grievances for Amravati.`);
        console.log(`- 2 Tasks added to "Task Auction" (AI Classified)`);
        console.log(`- 1 Task assigned to ${worker ? worker.name : 'Mock Worker ID'} (Worker Assigned)`);

        process.exit(0);
    } catch (error) {
        console.error('ERROR:', error);
        process.exit(1);
    }
};

seedWorkerTasks();
