import Grievance from '../models/Grievance.js';
import User from '../models/User.js';

// Haversine Formula to calculate distance between two coordinates in km
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

/**
 * AI Weather Intelligence Superior
 * Analyzes weather data to preemptively spawn tasks in flood-prone or high-risk zones.
 * Works by correlating precipitation, wind, and temp with GIS zone data.
 */
export const weatherSuperior = async (weatherData, cityZones = []) => {
    const predictiveTasks = [];

    // Default zones if none provided (Mock GIS data)
    const activeZones = cityZones.length > 0 ? cityZones : [
        { name: "Kothrud Sector 4", isFloodProne: true, coords: { lat: 18.5074, lon: 73.8077 }, avgTraffic: "High" },
        { name: "Viman Nagar North", isFloodProne: false, coords: { lat: 18.5679, lon: 73.9143 }, avgTraffic: "Medium" },
        { name: "Baner Lowlands", isFloodProne: true, coords: { lat: 18.5596, lon: 73.7799 }, avgTraffic: "Critical" }
    ];

    // A. Flood Prediction Logic
    if (weatherData.precipitation > 10) { // If rain > 10mm/hr predicted
        for (const zone of activeZones) {
            if (zone.isFloodProne) {
                const task = await spawnPredictiveTask({
                    type: "Preventive Drainage Check",
                    priority: "CRITICAL",
                    location: zone.coords,
                    reason: `High Flood Risk: ${weatherData.precipitation}mm rain predicted in ${zone.name}.`
                });
                predictiveTasks.push(task);
            }
        }
    }

    // B. Pothole Growth Predictor (Heavy Rain + High Traffic)
    if (weatherData.precipitation > 5) {
        for (const zone of activeZones) {
            if (zone.avgTraffic === "Critical" || zone.avgTraffic === "High") {
                const task = await spawnPredictiveTask({
                    type: "Road Structural Inspection",
                    priority: "Medium",
                    location: zone.coords,
                    reason: `Pothole Risk: Rain (${weatherData.precipitation}mm) + ${zone.avgTraffic} traffic erosion.`
                });
                predictiveTasks.push(task);
            }
        }
    }

    return predictiveTasks;
};

const spawnPredictiveTask = async ({ type, priority, location, reason }) => {
    const grievanceId = `PRED-${Math.floor(100000 + Math.random() * 900000)}`;

    const newTask = new Grievance({
        citizenName: "AI Superior (Predictive)",
        email: "superior@pmc.gov",
        phone: "000-WEATHER-AI",
        category: type,
        location: `Predictive Sector: ${location.lat}, ${location.lon}`,
        latitude: location.lat,
        longitude: location.lon,
        description: `PREDICTIVE TASK: ${reason}`,
        status: 'AI Classified',
        priorityScore: priority === "CRITICAL" ? 150 : 80,
        grievanceId: grievanceId,
        department: type.includes("Drainage") ? "Water" : "Roads"
    });

    await newTask.save();
    return {
        id: grievanceId,
        type,
        location: location,
        reason
    };
};

/**
 * AI Automated Superior Agent Logic
 */
export const runAISuperior = async (weatherInput = null) => {
    try {
        let weatherDecisions = [];
        if (weatherInput) {
            weatherDecisions = await weatherSuperior(weatherInput);
        }

        // 1. Fetch all 'Reported' or 'AI Classified' grievances that are NOT assigned
        const pendingGrievances = await Grievance.find({
            status: { $in: ['Reported', 'AI Classified', 'Pending Verification'] },
            assignedWorker: { $exists: false }
        });

        if (pendingGrievances.length === 0) return { message: "No pending tasks for the Superior to process." };

        // 2. Fetch all active Workers with GPS coordinates
        const activeWorkers = await User.find({
            role: 'Worker',
            latitude: { $exists: true },
            longitude: { $exists: true }
        });

        if (activeWorkers.length === 0) return { message: "No active workers detected in the grid." };

        const decisions = [];

        for (const grievance of pendingGrievances) {
            let bestWorker = null;
            let minDistance = Infinity;

            for (const worker of activeWorkers) {
                const distance = calculateDistance(
                    grievance.latitude, grievance.longitude,
                    worker.latitude, worker.longitude
                );

                // Priority Dispatcher: Smallest Distance wins (Haversine)
                if (distance < minDistance) {
                    minDistance = distance;
                    bestWorker = worker;
                }
            }

            if (bestWorker && minDistance < 10) { // Limit to 10km radius for realism
                // 3. Automated Assignment
                grievance.status = 'Worker Assigned';
                grievance.assignedWorker = bestWorker._id;
                grievance.assignedAt = new Date();
                await grievance.save();

                decisions.push({
                    taskId: grievance.grievanceId,
                    workerName: bestWorker.name,
                    distance: minDistance.toFixed(2),
                    reason: `Closest qualified agent (${minDistance.toFixed(2)}km) matching P${grievance.priorityScore || 0} urgency.`
                });
            }
        }

        return decisions;
    } catch (error) {
        console.error("AI Superior Error:", error);
        throw error;
    }
};

/**
 * simulated CV check
 */
export const verifyWork = async (photo, lat, lon, targetLat, targetLon) => {
    // 1. Proximity Check
    const distance = calculateDistance(lat, lon, targetLat, targetLon);

    if (distance > 0.2) { // 200 meters
        return { success: false, message: "Geofencing Error: You must be at the physical location to verify work." };
    }

    // 2. Placeholder for CV Logic (Mocked)
    const cvConfidence = Math.random() * 100;
    if (cvConfidence < 70) {
        return { success: false, message: "AI Scan Failure: Work quality metrics do not meet 70% confidence threshold." };
    }

    return { success: true, confidence: cvConfidence.toFixed(2) };
};
