const express = require("express");
const router = express.Router();
const Static = require("../models/static");

// Getting all
router.get("/", async (req, res) => {
    try {
        const statics = await Static.find();
        res.json(statics);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Getting One
router.get("/:id", getStatic, (req, res) => {
    res.json(res.static);
});

// Creating one
router.post("/", async (req, res) => {
    const static = new Static({
        user_agent_string: req.body.user_agent_string,
        language: req.body.language,
        accept_cookies: req.body.accept_cookies,
        allow_js: req.body.allow_js,
        allow_imgs: req.body.allow_imgs,
        allow_css: req.body.allow_css,
        screen_dimensions: req.body.screen_dimensions,
        window_dimensions: req.body.window_dimensions,
        connection_type: req.body.connection_type,
        identifier: req.body.identifier
    });
    try {
        const newStatic = await static.save();
        res.status(201).json(newStatic);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// Updating One
router.patch("/:id", getStatic, async (req, res) => {
    if (req.body.user_agent_string != null) {
        res.static.user_agent_string = req.body.user_agent_string;
    }
    if (req.body.language != null) {
        res.static.language = req.body.language;
    }
    if (req.body.accept_cookies != null) {
        res.static.accept_cookies = req.body.accept_cookies;
    }
    if (req.body.allow_js != null) {
        res.static.allow_js = req.body.allow_js;
    }
    if (req.body.allow_imgs != null) {
        res.static.allow_imgs = req.body.allow_imgs;
    }
    if (req.body.allow_css != null) {
        res.static.allow_css = req.body.allow_css;
    }
    if (req.body.screen_dimensions != null) {
        res.static.screen_dimensions = req.body.screen_dimensions;
    }
    if (req.body.window_dimensions != null) {
        res.static.window_dimensions = req.body.window_dimensions;
    }
    if (req.body.connection_type != null) {
        res.static.connection_type = req.body.connection_type;
    }

    try {
        const updatedStatic = await res.static.save();
        res.json(updatedStatic);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// Deleting One
router.delete("/:id", getStatic, async (req, res) => {
    try {
        await res.static.remove();
        res.json({
            message: "Deleted Static"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

async function getStatic(req, res, next) {
    let static;
    try {
        static = await Static.findById(req.params.id);
        if (static == null) {
            return res.status(404).json({
                message: "Cannot find Static"
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }

    res.static = static;
    next();
}

module.exports = router;