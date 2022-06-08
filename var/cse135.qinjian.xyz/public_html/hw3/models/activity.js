const mongoose = require("mongoose");
const ActivitySchema = new mongoose.Schema({
    mouse: {
        cursor_positions: String,
        clicks: Boolean,
        scrolling: Boolean,
    },
    keyboard: {
        keyboard_activity: String
    },
    idle: {
        break_end_at: Number,
        break_length: Number
    },
    enter_site_time: Number,
    leave_site_time: Number,
    page_info: String,
    identifier: String,
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("ActivitySchema", ActivitySchema);