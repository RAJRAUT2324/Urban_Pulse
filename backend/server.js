import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import grievanceRoutes from './routes/grievanceRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
const startServer = async () => {

    const app = express();
    app.use(cors());
    app.use(express.json());

    // Diagnostic Logger
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.originalUrl}`);
        next();
    });

    app.get('/api/ping', (req, res) => res.json({ status: 'Asha Neural Bridge active' }));

    try {
        await connectDB();
    } catch (error) {
        console.error(`⚠️ ${error.message}`);
    }

    app.use('/api/grievances', grievanceRoutes);
    app.use('/api/news', newsRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/ai', aiRoutes);

    app.use(notFound);
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;
    // ...


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

