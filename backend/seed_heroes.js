import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Grievance from './models/Grievance.js';
import connectDB from './config/db.js';

dotenv.config();

const seedHeroes = async () => {
    try {
        await connectDB();

        // 1. Create Fake Workers (with Pune coordinates)
        const workers = [
            {
                name: "Arjun PMC",
                email: "arjun@pmc.gov",
                password: "password123",
                role: "Worker",
                workerPoints: 1250,
                tasksVerified: 12,
                qualityScore: 98,
                latitude: 18.5204,
                longitude: 73.8567
            },
            {
                name: "Suresh Field Ops",
                email: "suresh@ops.gov",
                password: "password123",
                role: "Worker",
                workerPoints: 950,
                tasksVerified: 9,
                qualityScore: 92,
                latitude: 18.5304,
                longitude: 73.8667
            },
            {
                name: "Meera Urban",
                email: "meera@urban.gov",
                password: "password123",
                role: "Worker",
                workerPoints: 1100,
                tasksVerified: 11,
                qualityScore: 95,
                latitude: 18.5104,
                longitude: 73.8467
            }
        ];

        console.log('Seeding workers...');
        const createdWorkers = [];
        for (const w of workers) {
            const existing = await User.findOne({ email: w.email });
            if (!existing) {
                const user = await User.create(w);
                createdWorkers.push(user);
            } else {
                existing.workerPoints = w.workerPoints;
                existing.tasksVerified = w.tasksVerified;
                existing.qualityScore = w.qualityScore;
                existing.latitude = w.latitude;
                existing.longitude = w.longitude;
                await existing.save();
                createdWorkers.push(existing);
            }
        }

        // 2. Create Fake Grievances
        console.log('Seeding grievances...');
        const grievanceData = [
            // Resolved
            {
                citizenName: "Rahul Sharma",
                email: "rahul@example.com",
                phone: "9876543210",
                category: "Pothole",
                location: "Kothrud Depot",
                description: "Deep pothole causing traffic",
                status: "Resolved",
                assignedWorker: createdWorkers[0]._id,
                grievanceId: "GRV100001",
                latitude: 18.5204,
                longitude: 73.8567
            },
            // Pending (for Task Auction)
            {
                citizenName: "Amit Shah",
                email: "amit@example.com",
                phone: "9876543220",
                category: "Health Hazard",
                location: "Viman Nagar Square",
                description: "Open sewage drain near market",
                status: "AI Classified",
                grievanceId: "GRV200001",
                latitude: 18.5300,
                longitude: 73.8600,
                department: "Public Health",
                priorityScore: 95
            },
            {
                citizenName: "Sneha Patil",
                email: "sneha@example.com",
                phone: "9876543221",
                category: "Electricity",
                location: "Baner Road",
                description: "Streetlight wires hanging dangerously low",
                status: "AI Classified",
                grievanceId: "GRV200002",
                latitude: 18.5150,
                longitude: 73.8500,
                department: "Electricity",
                priorityScore: 85
            },
            {
                citizenName: "Test User",
                email: "test@example.com",
                phone: "9999999999",
                category: "Pothole",
                location: "Worker Current Location (SYCHRONIZED)",
                description: "Critical testing point for AI Geofencing and CV verification.",
                status: "AI Classified",
                grievanceId: "GRV300001",
                latitude: 18.5204,
                longitude: 73.8567,
                department: "Roads",
                priorityScore: 100
            }
        ];

        for (const g of grievanceData) {
            const existing = await Grievance.findOne({ grievanceId: g.grievanceId });
            if (!existing) {
                await Grievance.create(g);
            } else {
                existing.status = g.status;
                existing.latitude = g.latitude;
                existing.longitude = g.longitude;
                await existing.save();
            }
        }

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedHeroes();
