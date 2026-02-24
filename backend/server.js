import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import grievanceRoutes from './routes/grievanceRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const startServer = async () => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    try {
        await connectDB();
    } catch (error) {
        console.error(`⚠️ ${error.message}`);
        console.log('Backend starting in LIMITED MODE (MongoDB unavailable)');
    }

    app.use('/api/grievances', grievanceRoutes);
    app.use('/api/news', newsRoutes);
    app.use('/api/users', userRoutes);

    const PORT = process.env.PORT || 5000;

    try {
        app.listen(
            PORT,
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
        );
    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
};

startServer();

