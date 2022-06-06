require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const staticsRouter = require("./routes/statics");
const performancesRouter = require("./routes/performances");
const activitiesRouter = require("./routes/activities");
const noscriptRouter = require("./routes/noscript");

app.use("/noscript", noscriptRouter);
app.use("/statics", staticsRouter);
app.use("/performances", performancesRouter);
app.use("/activities", activitiesRouter);

app.listen(3000, () => console.log("Server Started on Port 3000"));
