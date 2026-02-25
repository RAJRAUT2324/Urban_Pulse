import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import all models
import Grievance from './backend/models/Grievance.js';
import User from './backend/models/User.js';
import News from './backend/models/News.js';
import Poll from './backend/models/Poll.js';
import Asset from './backend/models/Asset.js';
import AuditLog from './backend/models/AuditLog.js';
import CivicCredits from './backend/models/CivicCredits.js';
import WardVote from './backend/models/WardVote.js';

dotenv.config();

const LOCAL_URI = 'mongodb://127.0.0.1:27017/urbanpulse';
const ATLAS_URI = process.env.MONGO_URI;

const migrate = async () => {
    try {
        console.log('--- COMPREHENSIVE DATA MIGRATION STARTED ---');

        // 1. Connect to Local and Fetch Data
        console.log('Connecting to local DB...');
        await mongoose.connect(LOCAL_URI);

        const data = {
            users: await User.find({}),
            grievances: await Grievance.find({}),
            news: await News.find({}),
            polls: await Poll.find({}),
            assets: await Asset.find({}),
            auditLogs: await AuditLog.find({}),
            civicCredits: await CivicCredits.find({}),
            wardVotes: await WardVote.find({}),
        };

        console.log('--- Local Data Summary ---');
        for (const [key, val] of Object.entries(data)) {
            console.log(`${key}: ${val.length}`);
        }

        await mongoose.disconnect();

        // 2. Connect to Atlas and Save Data
        console.log('\nConnecting to Atlas DB...');
        await mongoose.connect(ATLAS_URI);

        const migrationTasks = [
            { name: 'Users', model: User, items: data.users },
            { name: 'Grievances', model: Grievance, items: data.grievances },
            { name: 'News', model: News, items: data.news },
            { name: 'Polls', model: Poll, items: data.polls },
            { name: 'Assets', model: Asset, items: data.assets },
            { name: 'AuditLogs', model: AuditLog, items: data.auditLogs },
            { name: 'CivicCredits', model: CivicCredits, items: data.civicCredits },
            { name: 'WardVotes', model: WardVote, items: data.wardVotes },
        ];

        for (const task of migrationTasks) {
            if (task.items.length > 0) {
                console.log(`Migrating ${task.name}...`);
                try {
                    await task.model.insertMany(task.items, { ordered: false });
                    console.log(`✅ ${task.name} migrated.`);
                } catch (err) {
                    console.log(`⚠️ Partial migration for ${task.name}: ${err.message}`);
                }
            }
        }

        console.log('\n--- MIGRATION COMPLETED SUCCESSFULLY ---');
        process.exit(0);
    } catch (error) {
        console.error('\n❌ MIGRATION FAILED:', error);
        process.exit(1);
    }
};

migrate();
