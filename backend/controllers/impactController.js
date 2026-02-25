import CivicCredits from '../models/CivicCredits.js';
import WardVote from '../models/WardVote.js';
import Grievance from '../models/Grievance.js';
import Poll from '../models/Poll.js';

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
