const mongoose = require("mongoose");
const PerformanceSchema = new mongoose.Schema({
    timing: String,
    start_time: Number,
    end_time: Number,
    total_time: Number,
    identifier: String,
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("PerformanceSchema", PerformanceSchema);