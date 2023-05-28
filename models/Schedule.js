const mongoose = require("../db/conn");

const ScheduleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    day: { type: Date, default: Date.now },
    subjects: [String],
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
