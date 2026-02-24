import crypto from 'crypto';

/**
 * Generates a SHA-256 hash for a blockchain block.
 * @param {Object} data - The data to hash (TicketID, Timestamp, PreviousHash, Action)
 * @returns {string} - The hex string of the hash
 */
export const calculateHash = (data) => {
    const dataString = JSON.stringify(data);
    return crypto.createHash('sha256').update(dataString).digest('hex');
};

/**
 * Creates a new block in the audit trail.
 * @param {string} ticketId - DB ID of the grievance
 * @param {string} action - Action performed (e.g., 'Status Changed: Pending -> Resolved')
 * @param {string} previousHash - The hash of the previous block
 * @returns {Object} - The hash for the current block and the data used
 */
export const createBlockData = (ticketId, action, previousHash = '0') => {
    const timestamp = new Date().toISOString();
    const dataToHash = {
        ticketId,
        timestamp,
        action,
        previousHash
    };
    const currentHash = calculateHash(dataToHash);
    return {
        ...dataToHash,
        currentHash
    };
};
