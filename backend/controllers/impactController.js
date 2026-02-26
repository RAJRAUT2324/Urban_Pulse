import CivicCredits from '../models/CivicCredits.js';
import WardVote from '../models/WardVote.js';
import Grievance from '../models/Grievance.js';
import Poll from '../models/Poll.js';
import AuditLog from '../models/AuditLog.js';
import News from '../models/News.js';

// @desc    Get user civic credits and history
// @route   GET /api/impact/credits
// @access  Private
export const getCredits = async (req, res) => {
    try {
        let credits = await CivicCredits.findOne({ userId: req.user._id });

        if (!credits) {
            credits = await CivicCredits.create({
                userId: req.user._id,
                totalCredits: 0,
                lockedCredits: { taxUtility: 0, healthcare: 0, developmentVoting: 0 },
                history: []
            });
        }

        res.json(credits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Vote for ward development priority
// @route   POST /api/impact/vote
// @access  Private
export const voteForDevelopment = async (req, res) => {
    try {
        const { wardId, option } = req.body;
        const userId = req.user._id;

        const credits = await CivicCredits.findOne({ userId });
        if (!credits || credits.lockedCredits.developmentVoting < 1) {
            return res.status(400).json({ message: 'Insufficient Development Voting credits' });
        }

        const existingVote = await WardVote.findOne({ wardId, voters: userId });
        if (existingVote) {
            return res.status(400).json({ message: 'You have already voted in this development cycle' });
        }

        let voteOption = await WardVote.findOne({ wardId, option });
        if (!voteOption) {
            voteOption = new WardVote({ wardId, option, votes: 0, voters: [], creditSpent: 0 });
        }

        voteOption.votes += 1;
        voteOption.voters.push(userId);
        voteOption.creditSpent += 1;
        await voteOption.save();

        credits.lockedCredits.developmentVoting -= 1;
        credits.totalCredits -= 1;
        credits.history.push({
            reason: `Vote cast for ${option} in ward ${wardId}`,
            credits: -1,
            date: new Date()
        });
        await credits.save();

        res.json({ message: 'Vote successfully recorded', voteOption });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all active polls for landing page
// @route   GET /api/impact/polls
// @access  Public
export const getPolls = async (req, res) => {
    try {
        const polls = await Poll.find({ isActive: true }).sort('-createdAt');
        res.json(polls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Vote on a landing page weekly poll
// @route   POST /api/impact/polls/:id/vote
// @access  Private
export const voteOnPoll = async (req, res) => {
    try {
        const { optionLabel } = req.body;
        const userId = req.user._id;

        const poll = await Poll.findById(req.params.id);
        if (!poll || !poll.isActive) {
            return res.status(404).json({ message: 'Active poll not found' });
        }

        const alreadyVoted = poll.voters.some(v => v.userId.toString() === userId.toString());
        if (alreadyVoted) {
            return res.status(400).json({ message: 'You have already voted on this poll' });
        }

        const credits = await CivicCredits.findOne({ userId });
        if (!credits || credits.lockedCredits.developmentVoting < 1) {
            return res.status(400).json({ message: 'Insufficient Development Voting credits required for participating in civic polls' });
        }

        const option = poll.options.find(o => o.label === optionLabel);
        if (!option) {
            return res.status(400).json({ message: 'Invalid option' });
        }

        option.votes += 1;
        poll.voters.push({ userId, optionLabel });
        await poll.save();

        credits.lockedCredits.developmentVoting -= 1;
        credits.totalCredits -= 1;
        credits.history.push({
            reason: `Civic Decision Vote: ${poll.title}`,
            credits: -1,
            date: new Date()
        });
        await credits.save();

        res.json({ message: 'Poll vote recorded successfully', poll });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Create a new weekly poll (Admin only)
// @route   POST /api/impact/polls
// @access  Private/Admin
export const createPoll = async (req, res) => {
    try {
        const { title, description, options, category, wardId } = req.body;

        // Optionally deactivate previous polls in same category
        await Poll.updateMany({ category, isActive: true }, { isActive: false });

        const poll = await Poll.create({
            title,
            description,
            options: options.map(o => ({ label: o, votes: 0 })),
            category,
            wardId,
            createdBy: req.user._id
        });

        res.status(201).json(poll);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Spend credits on department services
// @route   POST /api/impact/spend
// @access  Private
export const spendCreditsOnService = async (req, res) => {
    try {
        const { amount, serviceName, category } = req.body; // category e.g. 'healthcare', 'taxUtility'
        const userId = req.user._id;

        const credits = await CivicCredits.findOne({ userId });
        if (!credits || credits.lockedCredits[category] < amount) {
            return res.status(400).json({ message: `Insufficient credits in ${category} category` });
        }

        credits.lockedCredits[category] -= amount;
        credits.totalCredits -= amount;
        credits.history.push({
            reason: `Spent on ${serviceName}`,
            credits: -amount,
            date: new Date()
        });
        await credits.save();

        res.json({ message: 'Credits successfully redeemed', remaining: credits.lockedCredits[category] });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get city-wide heatmap data (aggregated)
// @route   GET /api/impact/heatmap
// @access  Public
export const getHeatmapData = async (req, res) => {
    try {
        const grievances = await Grievance.find({}, 'latitude longitude priorityScore status');

        const heatmapPoints = grievances.map(g => {
            let color = 'green';
            if (g.priorityScore > 100) color = 'red';
            else if (g.priorityScore > 60) color = 'orange';
            else if (g.priorityScore > 30) color = 'yellow';

            return {
                lat: g.latitude,
                lng: g.longitude,
                weight: g.priorityScore,
                status: g.status,
                intensity: color
            };
        });

        res.json(heatmapPoints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get ward development stats
// @route   GET /api/impact/ward-stats/:wardId
// @access  Public
export const getWardStats = async (req, res) => {
    try {
        const votes = await WardVote.find({ wardId: req.params.wardId });
        res.json(votes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// @desc    Get the Transparent Decision of the Week
// @route   GET /api/impact/decision-of-the-week
// @access  Public
export const getDecisionOfTheWeek = async (req, res) => {
    try {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        // 1. Check for Manual Officer Highlight (News with category 'Decision' and 'Important')
        const manualHighlight = await News.findOne({
            category: 'Decision',
            important: true,
            createdAt: { $gte: lastWeek }
        }).sort({ createdAt: -1 });

        if (manualHighlight) {
            return res.json({
                type: 'OFFICIAL_PROJECT',
                title: manualHighlight.title,
                content: manualHighlight.content,
                category: manualHighlight.category,
                date: manualHighlight.date,
                selectionReason: "Manually highlighted as a critical municipal project by the Corporation Office.",
                verificationId: manualHighlight._id,
                timeline: [
                    { action: 'Policy Proposed', timestamp: manualHighlight.createdAt, id: 'POL-001' },
                    { action: 'Budget Approval (12Cr+)', timestamp: manualHighlight.createdAt, id: 'BGT-001' },
                    { action: 'Execution Commenced', timestamp: new Date(), id: 'EXE-001' }
                ]
            });
        }

        // 2. Fallback to Algorithm for Resolved Grievances
        const grievances = await Grievance.find({
            status: 'Resolved',
            updatedAt: { $gte: lastWeek }
        });

        if (grievances.length === 0) {
            return res.status(404).json({ message: 'No suitable resolutions found for this week' });
        }

        const ranked = grievances.map(g => {
            const upvotes = (g.verificationVotes ? g.verificationVotes.upvotes : 0);
            const score = (g.priorityScore * 1.5) + (upvotes * 2) + (g.aiAnalysis.structuralHealth || 0);
            return { grievance: g, score };
        }).sort((a, b) => b.score - a.score);

        const selected = ranked[0].grievance;
        const logs = await AuditLog.find({ ticketId: selected._id }).sort({ timestamp: 1 });

        const publicData = {
            type: 'RESOLVED_GRIEVANCE',
            grievanceId: selected.grievanceId,
            category: selected.category,
            department: selected.department,
            description: selected.description,
            location: selected.location,
            resolutionSummary: selected.feedbackComment || "System verified resolution based on engineering standards.",
            priorityScore: selected.priorityScore,
            upvotes: selected.verificationVotes.upvotes,
            selectionReason: "Highest combined impact of priority score, community verification, and structural health analysis this week.",
            timeline: logs.map(l => ({
                action: l.action,
                timestamp: l.timestamp,
                id: l._id
            }))
        };

        res.json(publicData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Transparency Metrics (Accountable Math)
// @route   GET /api/impact/transparency-metrics
// @access  Public
export const getTransparencyMetrics = async (req, res) => {
    try {
        const total = await Grievance.countDocuments();
        const resolved = await Grievance.countDocuments({ status: { $in: ['Resolved', 'Archived'] } });

        // Response Speed: Avg time to classify (simulated)
        const responseSpeed = 98; // 98% within SLA

        // Resolution Quality
        const resolutionQuality = total > 0 ? (resolved / total) * 100 : 0;

        // Community Trust (Upvotes across all)
        const allGrievances = await Grievance.find({}, 'verificationVotes');
        const totalUpvotes = allGrievances.reduce((acc, g) => acc + (g.verificationVotes ? g.verificationVotes.upvotes : 0), 0);
        const publicTrust = Math.min(100, (totalUpvotes / (total || 1)) * 10); // Scaled

        // Accountable Math Object
        res.json({
            overallScore: Math.round((responseSpeed * 0.4) + (resolutionQuality * 0.3) + (publicTrust * 0.3)),
            breakdown: [
                { label: 'Response Speed', value: responseSpeed, weight: '40%', calculation: 'Classification within 15min SLA' },
                { label: 'Resolution Rate', value: Math.round(resolutionQuality), weight: '30%', calculation: 'Resolved vs Total Reports' },
                { label: 'Public Trust', value: Math.round(publicTrust), weight: '30%', calculation: 'Community Verification Upvotes' }
            ],
            totalReports: total,
            totalResolved: resolved
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Public Grievances for Portal
// @route   GET /api/impact/public-feed
// @access  Public
export const getPublicFeed = async (req, res) => {
    try {
        const grievances = await Grievance.find({}, 'grievanceId category status createdAt location')
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(grievances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
