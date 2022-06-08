const express = require("express");
const router = express.Router();
const Static = require("../models/static");

// Getting all
router.get("/", async (req, res) => {
    let headers = {}
    let raw_headers = req["rawHeaders"]
    for (i = 0; i < raw_headers.length; i = i + 2) {
        headers[raw_headers[i]] = raw_headers[i+1];
    }
    const static = new Static({
        user_agent_string: headers["User-Agent"],
        language: headers["Accept-Language"],
        allow_js: false,
        allow_imgs: true,
        allow_css: true,
        connection_type: headers["Connection"],
        identifier: headers["Cookie"]
    });
    try {
        const newStatic = await static.save();
        res.status(201).json(newStatic);
    } catch (err) {
        res.status(204);
    }
});

module.exports = router;