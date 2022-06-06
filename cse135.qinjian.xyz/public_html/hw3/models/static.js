const mongoose = require("mongoose");
const StaticSchema = new mongoose.Schema({
    user_agent_string: String,
    language: String,
    accept_cookies: Boolean,
    allow_js: Boolean,
    allow_imgs: Boolean,
    allow_css: Boolean,
    screen_dimensions: {
        width: Number,
        height: Number,
    },
    window_dimensions: {
        width: Number,
        height: Number,
    },
    connection_type: String,
    identifier: String,
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("StaticSchema", StaticSchema);