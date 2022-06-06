const express = require("express");
const router = express.Router();
const Performance = require("../models/performance");

// Getting all
router.get("/", async (req, res) => {
    try {
        const performances = await Performance.find();
        res.json(performances);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Getting One
router.get("/:id", getPerformance, (req, res) => {
    res.json(res.performance);
});

// Creating one
router.post("/", async (req, res) => {
    const performance = new Performance({
        timing: req.body.timing,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        total_time: req.body.total_time,
        identifier: req.body.identifier
    });
    try {
        const newPerformance = await performance.save();
        res.status(201).json(newPerformance);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// Updating One
router.patch("/:id", getPerformance, async (req, res) => {
    
    if (req.body.timing != null) {
        res.performance.timing = req.body.timing;
    }
    if (req.body.start_time != null) {
        res.performance.start_time = req.body.start_time;
    }
    if (req.body.end_time != null) {
        res.performance.end_time = req.body.end_time;
    }
    if (req.body.total_time != null) {
        res.performance.total_time = req.body.total_time;
    }
    try {
        const updatedPerformance = await res.performance.save();
        res.json(updatedPerformance);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// Deleting One
router.delete("/:id", getPerformance, async (req, res) => {
    try {
        await res.performance.remove();
        res.json({
            message: "Deleted Performance"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

async function getPerformance(req, res, next) {
    let performance;
    try {
        performance = await Performance.findById(req.params.id);
        if (performance == null) {
            return res.status(404).json({
                message: "Cannot find Performance"
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }

    res.performance = performance;
    next();
}

module.exports = router;