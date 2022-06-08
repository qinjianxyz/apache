const express = require("express");
const router = express.Router();
const Activity = require("../models/activity");

// Getting all
router.get("/", async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Getting One
router.get("/:id", getActivity, (req, res) => {
    res.json(res.activity);
});

// Creating one
router.post("/", async (req, res) => {
    const activity = new Activity({
        mouse: {
            cursor_positions: req.body.cursor_positions,
            clicks: req.body.clicks,
            scrolling: req.body.scrolling
        },
        keyboard: {
            keyboard_activity: req.body.keyboard_activity
        },
        idle: {
            break_end_at: req.body.break_end_at,
            break_length: req.body.break_length
        },
        enter_site_time: req.body.enter_site_time,
        leave_site_time: req.body.leave_site_time,
        page_info: req.body.page_info,
        identifier: req.body.identifier
    });
    
    try {
        const newActivity = await activity.save();
        res.status(201).json(newActivity);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// Updating One
router.patch("/:id", getActivity, async (req, res) => {
    if (req.body.cursor_positions != null) {
        res.activity.cursor_positions = req.body.cursor_positions;
    }
    if (req.body.clicks != null) {
        res.activity.clicks = req.body.clicks;
    }
    if (req.body.scrolling != null) {
        res.activity.scrolling = req.body.scrolling;
    }
    if (req.body.keyboard_activity != null) {
        res.activity.keyboard_activity = req.body.keyboard_activity;
    }
    if (req.body.break_end_at != null) {
        res.activity.break_end_at = req.body.break_end_at;
    }
    if (req.body.break_length != null) {
        res.activity.break_length = req.body.break_length;
    }
    if (req.body.enter_site_time != null) {
        res.activity.enter_site_time = req.body.enter_site_time;
    }
    if (req.body.leave_site_time != null) {
        res.activity.leave_site_time = req.body.leave_site_time;
    }
    if (req.body.page_info != null) {
        res.activity.page_info = req.body.page_info;
    }
    try {
        const updatedActivity = await res.activity.save();
        res.json(updatedActivity);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// Deleting One
router.delete("/:id", getActivity, async (req, res) => {
    try {
        await res.activity.remove();
        res.json({
            message: "Deleted Activity"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

async function getActivity(req, res, next) {
    let activity;
    try {
        activity = await Activity.findById(req.params.id);
        if (activity == null) {
            return res.status(404).json({
                message: "Cannot find Activity"
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }

    res.activity = activity;
    next();
}

module.exports = router;