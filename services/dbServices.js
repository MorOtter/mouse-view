const { Pool } = require('pg');

// local development (comment out for Heroku)
// const pool = new Pool({ ... });

// Heroku (uncomment for Heroku)
const pool = new Pool({
    connectionString: process.env.SUPABASE_DB_URL,
    ssl: {
        rejectUnauthorized: false
    },
    connect_timeout: 5000, // Adjust as needed
    idleTimeoutMillis: 30000
});

pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error("Connection error", err.stack));

const getLastTrialId = async () => {
    const client = await pool.connect();
    try {
        const result = await client.query("SELECT MAX(trial_id) AS max_id FROM trials;");
        return result.rows[0].max_id || 1;
    } finally {
        client.release();
    }
};

const insertParticipant = async (condition, groupName, censorshipGroup, experimentStartTime, gender, age) => { // Corrected parameter names
    const client = await pool.connect();
    try {
        const result = await client.query(
            'INSERT INTO participants (condition, group_name, censorship_group, experiment_start_time, gender, age) VALUES ($1, $2, $3, $4, $5, $6) RETURNING participant_id;',
            [condition, groupName, censorshipGroup, new Date().toISOString(), gender, age]
        );
        return result.rows[0].participant_id; // Assuming you might need the ID
    } finally {
        client.release();
    }
};

const getNextId = async () => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT MAX(participant_id) AS max_id FROM participants;');
        const maxId = result.rows[0].max_id;
        return maxId !== null ? Number(maxId) + 1 : 1;
    } finally {
        client.release();
    }
};

const insertTrial = async (participantId, trialType, trialNumber, startTime, endTime) => { // Consistency in param names
    const client = await pool.connect();
    try {
        const result = await client.query(
            'INSERT INTO trials (participant_id, trial_type, trial_number, start_time, end_time) VALUES ($1, $2, $3, $4, $5) RETURNING trial_id;',
            [participantId, trialType, trialNumber, startTime, endTime]
        );
        return result.rows[0].trial_id;
    } finally {
        client.release();
    }
};

const insertPacket = async (trialId, userInput, advisorRecommendation, accepted, classifiedTime) => { // Consistency
    const client = await pool.connect();
    try {
        await client.query(
            'INSERT INTO packets (trial_id, user_input, advisor_recommendation, accepted, classified_time) VALUES ($1, $2, $3, $4, $5);',
            [trialId, userInput, advisorRecommendation, accepted, classifiedTime]
        );
    } catch (err) {
        console.error("Couldn't add packet input", err.stack);
    } finally {
        client.release();
    }
};

const insertScale = async (participantId, scaleType, scalePhase) => { // Consistency
    const client = await pool.connect();
    try {
        const result = await client.query(
            'INSERT INTO scales (participant_id, scale_type, scale_phase) VALUES ($1, $2, $3) RETURNING scale_id;',
            [participantId, scaleType, scalePhase]
        );
        return result.rows[0].scale_id;
    } finally {
        client.release();
    }
};

const insertItem = async (itemId, scaleId, itemValue) => { // Consistency
    const client = await pool.connect();
    try {
        await client.query(
            'INSERT INTO items (item_id, scale_id, item_value) VALUES ($1, $2, $3);',
            [itemId, scaleId, itemValue]
        );
    } finally {
        client.release();
    }
};

const insertFeedback = async (participantId, feedbackText) => { // Consistency
    const client = await pool.connect();
    try {
        await client.query(
            'UPDATE participants SET feedback = $2 WHERE participant_id = $1;',
            [participantId, feedbackText]
        );
    } finally {
        client.release();
    }
};

const insertCursorData = async (cursorData, trialId) => { // More descriptive name
    const client = await pool.connect();
    try {
        const { x, y, time, event } = cursorData;
        await client.query(
            'INSERT INTO cursor_data (x, y, time, event, trial_id) VALUES ($1, $2, $3, $4, $5);',
            [x, y, time, event, trialId]
        );
    } catch (err) {
        console.error("Error inserting cursor data", err.stack);
    } finally {
        client.release();
    }
};

const getParticipantById = async (participantId) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM participants WHERE participant_id = $1;',
            [participantId]
        );
        return result.rows[0];
    } finally {
        client.release();
    }
};

const dbServices = {
    insertFeedback,
    insertItem,
    insertScale,
    insertPacket,
    insertTrial,
    insertParticipant,
    getNextId,
    getLastTrialId,
    insertCursorData,
    getParticipantById // Correct placement of the function
};

module.exports = dbServices;