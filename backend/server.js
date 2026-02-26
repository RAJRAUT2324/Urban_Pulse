import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import grievanceRoutes from './routes/grievanceRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import impactRoutes from './routes/impactRoutes.js';
import supportRoutes from './routes/supportRoutes.js';
import emergencyRoutes from './routes/emergencyRoutes.js';
import superiorRoutes from './routes/superiorRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

let io;

const startServer = async () => {

    const app = express();
    const server = http.createServer(app);
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    app.use(cors());
    app.use(express.json());

    // Socket.io initialization
    io.on('connection', (socket) => {
        console.log('New client connected to Asha Neural Bridge');
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    // Share io instance with request
    app.use((req, res, next) => {
        req.io = io;
        next();
    });

    // Diagnostic Logger
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.originalUrl}`);
        next();
    });

    app.get('/api/ping', (req, res) => {
        const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
        res.json({
            status: 'Asha Neural Bridge active',
            database: states[mongoose.connection.readyState] || 'unknown'
        });
    });

    try {
        await connectDB();
    } catch (error) {
        console.error(`⚠️ ${error.message}`);
    }

    app.use('/api/grievances', grievanceRoutes);
    app.use('/api/news', newsRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/ai', aiRoutes);
    app.use('/api/impact', impactRoutes);
    app.use('/api/support', supportRoutes);
    app.use('/api/emergency', emergencyRoutes);
    app.use('/api/superior', superiorRoutes);

    app.use(notFound);
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;

    try {
        server.listen(
            PORT,
            console.log(`🚀 Asha Neural Bridge active in ${process.env.NODE_ENV} mode on port ${PORT}`)
        );
    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
};

startServer();

export { io };

