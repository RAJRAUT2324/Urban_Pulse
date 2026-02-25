import Grievance from '../models/Grievance.js';
import Asset from '../models/Asset.js';

/**
 * 2️⃣ SILENT CITIZEN MODE (PASSIVE DETECTION)
 * Clusters sensor events and auto-generates complaints.
 */
export const silentDetect = async (req, res) => {
    try {
        const { detectedIssue, location, confidenceScore, sensorData } = req.body;

        // 1. Logical clustering: check if there's already a silent detection nearby in last 24h
        const clusterRadius = 0.002; // Approx 200m for higher sensitivity
        const existing = await Grievance.findOne({
            source: "SILENT_DETECTION",
            category: detectedIssue,
            createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
            latitude: { $gte: location.latitude - clusterRadius, $lte: location.latitude + clusterRadius },
            longitude: { $gte: location.longitude - clusterRadius, $lte: location.longitude + clusterRadius }
        });

        if (existing) {
            return res.json({ message: "Clustered with existing detection", grievance: existing });
        }

        // 2. Locate nearest asset for linkage
        const nearAsset = await Asset.findOne({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [location.longitude, location.latitude] },
                    $maxDistance: 300
                }
            }
        });

        const grievanceId = 'SIL' + Math.floor(100000 + Math.random() * 900000);

        // 3. Create the Passive Anomaly Record
        const grievance = await Grievance.create({
            citizenName: "NEURAL_BRIDGE_SENSOR",
            email: "ai@urbanpulse.pmc.gov",
            phone: "000-000-0000",
            category: detectedIssue,
            location: `Sensor Cluster at ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`,
            latitude: location.latitude,
            longitude: location.longitude,
            description: `Passive anomaly detection: ${detectedIssue}. Confidence: ${confidenceScore}%. Sensor Link: ${sensorData.source}. Attached Asset: ${nearAsset?.assetId || 'N/A'}`,
            grievanceId,
            source: "SILENT_DETECTION",
            status: "AI Classified",
            aiAnalysis: {
                contextEscalation: confidenceScore > 90,
                historicalFrequency: nearAsset?.failureCount18Months || 0,
                structuralHealth: nearAsset?.healthStatus === 'GOOD' ? 90 : nearAsset?.healthStatus === 'DEGRADED' ? 50 : 10
            }
        });

        // 4. If asset found, register complaint in asset history
        if (nearAsset) {
            nearAsset.relatedComplaints.push(grievance._id);
            await nearAsset.save();
        }

        res.status(201).json(grievance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * 3️⃣ AI ROOT-CAUSE EXPLAINER
 */
export const rootCauseExplain = async (req, res) => {
    try {
        const { grievanceId } = req.body;
        const grievance = await Grievance.findOne({ grievanceId });
        if (!grievance) return res.status(404).json({ message: "Grievance not found" });

        // Correlation Logic
        let explanation = "";
        const nearAssets = await Asset.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [grievance.longitude, grievance.latitude] },
                    $maxDistance: 50 // 50 meters
                }
            }
        });

        const hasWaterLeakage = nearAssets.some(a => a.assetType === 'PIPE' && a.healthStatus === 'DEGRADED');
        const isRoadPothole = grievance.category === 'Pothole';

        if (isRoadPothole && hasWaterLeakage) {
            explanation = "This road repeatedly fails due to underground pipe leakage combined with seasonal runoff.";
        } else if (nearAssets.length > 0 && nearAssets[0].failureCount18Months > 5) {
            explanation = "Recurring failure suggests deep structural fatigue rather than surface damage.";
        } else {
            explanation = "Likely caused by high traffic volume and recent heavy rainfall data correlation.";
        }

        grievance.aiAnalysis.rootCause = explanation;
        await grievance.save();

        res.json({ grievanceId, explanation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * 4️⃣ DYNAMIC PRIORITY ENGINE
 */
export const calculatePriority = async (req, res) => {
    try {
        const { category, locationContext, latitude, longitude } = req.body;

        // 1. Base Severity based on Category
        let severity = 5;
        if (category === 'Health Hazard' || category === 'Structural Collapse') severity = 10;
        else if (category === 'Drainage Leak' || category === 'Water Contamination') severity = 8;
        else if (category === 'Pothole' || category === 'Road Blockage') severity = 7;
        else if (category === 'Waste Management') severity = 6;

        // 2. Context Multipliers (Environmental Factors)
        let contextMultiplier = 1.0;
        if (locationContext?.isNearHospital) contextMultiplier *= 2.0;
        if (locationContext?.isNearSchool) contextMultiplier *= 1.8;
        if (locationContext?.isMainRoad) contextMultiplier *= 1.5;
        if (locationContext?.isNightTime) contextMultiplier *= 1.5;

        // 3. Population Impact (Social Score)
        const populationDensity = locationContext?.populationDensity || 5; // 1-10

        // 4. Industrial Factors (Historical & Structural)
        let frequencyImpact = 0;
        let structuralFatigue = 1;

        if (latitude && longitude) {
            const nearAsset = await Asset.findOne({
                location: {
                    $near: {
                        $geometry: { type: "Point", coordinates: [longitude, latitude] },
                        $maxDistance: 100 // Search within 100 meters
                    }
                }
            });

            if (nearAsset) {
                frequencyImpact = nearAsset.failureCount18Months || 0;
                structuralFatigue = nearAsset.healthStatus === 'STRUCTURAL_FATIGUE' ? 10 :
                    nearAsset.healthStatus === 'DEGRADED' ? 5 : 1;
            }
        }

        // 5. Final Formula (Industrial Grade)
        // Priority = (Severity * PopDensity * ContextMultiplier) + (FrequencyImpact * StructuralFatigue)
        const primaryScore = severity * populationDensity * contextMultiplier;
        const secondaryScore = frequencyImpact * structuralFatigue;
        const priorityScore = Math.min(200, Math.round(primaryScore + secondaryScore));

        let priorityLevel = "LOW";
        if (priorityScore > 150) priorityLevel = "CRITICAL";
        else if (priorityScore > 100) priorityLevel = "HIGH";
        else if (priorityScore > 50) priorityLevel = "MEDIUM";

        res.json({
            priorityScore,
            priorityLevel,
            breakdown: {
                primary: primaryScore,
                secondary: secondaryScore,
                factors: { severity, contextMultiplier, populationDensity, frequencyImpact, structuralFatigue }
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * 1️⃣ GET ASSET HEALTH
 */
export const getAssetHealth = async (req, res) => {
    try {
        const asset = await Asset.findOne({ assetId: req.params.assetId });
        if (!asset) return res.status(404).json({ message: "Asset not found" });
        res.json(asset);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
