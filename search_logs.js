import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuditLog from './backend/models/AuditLog.js';

dotenv.config({ path: './.env' });

const searchLogs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const logs = await AuditLog.find({
            $or: [
                { action: /Raj/i },
                { action: /Resolved/i },
                { action: /Verified/i },
                { action: /Archived/i }
            ]
        }).sort({ createdAt: -1 });

        console.log(`Found ${logs.length} logs.`);
        logs.forEach(l => {
            console.log(`Action: ${l.action}, Ticket: ${l.ticketId}, Date: ${l.createdAt}`);
            if (l.metadata) console.log(`  Metadata: ${JSON.stringify(l.metadata)}`);
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

searchLogs();
