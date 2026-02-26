import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Grievance from '../models/Grievance.js';
import { runAISuperior } from '../utils/AutomatedSuperior.js';

// @desc    Trigger AI Superior Dispatching
// @route   POST /api/superior/dispatch
// @access  Private/Worker (or Admin)
export const triggerAIDispatch = asyncHandler(async (req, res) => {
    const { simulateWeather } = req.body;

    // Mock weather data if simulation is active
    const weatherInput = simulateWeather ? {
        precipitation: 18.5, // Heavy rain
        windSpeed: 52,       // High wind
        temp: 22
    } : null;

    const decisions = await runAISuperior(weatherInput);
    res.json({
        status: simulateWeather ? "EMERGENCY SIMULATION ACTIVE" : "AI SUPERIOR DISPATCH",
        weatherAlert: simulateWeather ? "HEAVY PRECIPITATION DETECTED (18.5mm/hr)" : "NORMAL",
        decisions
    });
});

// @desc    Get Worker Leaderboard
// @route   GET /api/superior/leaderboard
// @access  Public
export const getLeaderboard = asyncHandler(async (req, res) => {
    const workers = await User.find({ role: 'Worker' })
        .sort({ workerPoints: -1 })
        .select('name workerPoints tasksVerified qualityScore')
        .limit(10);

    res.json(workers);
});

// @desc    Get AI Recent Decisions (Mocked/Logged)
// @route   GET /api/superior/decisions
// @access  Public
export const getRecentDecisions = asyncHandler(async (req, res) => {
    // In a real app, you might log these to a 'Decisions' collection
    // For now, we'll return some smart simulated data based on active assignments
    const assignments = await Grievance.find({ status: 'Worker Assigned' })
        .populate('assignedWorker', 'name')
        .sort({ updatedAt: -1 })
        .limit(5);

    const decisions = assignments.map(a => ({
        taskId: a.grievanceId,
        workerName: a.assignedWorker ? a.assignedWorker.name : 'Unknown',
        timestamp: a.updatedAt,
        action: 'Assigned',
        reason: `AI optimized for ${a.category} based on 1.4km proximity.`
    }));

    res.json(decisions);
});
