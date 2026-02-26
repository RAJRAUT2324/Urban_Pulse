import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Grievance from './backend/models/Grievance.js';
import AuditLog from './backend/models/AuditLog.js';

dotenv.config({ path: './.env' });

const searchMore = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const nameQuery = "Raj Raut";
        const userId = '699db3f697635efa6441e282';

        console.log("Searching by Name...");
        const byName = await Grievance.find({ citizenName: new RegExp(nameQuery, 'i') });
        console.log(`Found ${byName.length} by name.`);
        byName.forEach(g => {
            console.log(`ID: ${g.grievanceId}, Reporter: ${g.originalReporter}, Status: ${g.status}`);
        });

        console.log("\nSearching Audit Logs for Raj Raut...");
        // This is a bit harder as audit logs don't directly link user names easily in the schema I saw.
        // But let's check for any logs with 'Raj' in metadata if any.
        const logs = await AuditLog.find({ action: /Verified|Resolved/i }).limit(20);
        console.log(`Found ${logs.length} resolution logs.`);
        logs.forEach(l => {
            console.log(`Log Action: ${l.action}, Ticket: ${l.ticketId}`);
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

searchMore();
