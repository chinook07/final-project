"use strict";

const express = require("express");
const morgan = require("morgan");

const {
    logEmployee,
    getEmployees,
    hireEmployee,
    fireEmployee
} = require("./handlers-employees");

const {
    getExhibits,
    birthDino,
    deathDino,
    toggleVisitor,
    toggleFence,
    addFeed,
    addVisit
} = require("./handlers-exhibits");

const {
    getVets,
    getSigns,
    changeSign,
    getKey
} = require("./handlers-others")

express()
    .use(morgan("tiny"))
    .use(express.json())

    .use(express.static("public"))

    .post("/api/log-employee", logEmployee) //BE √ FE √
    .get("/api/get-employees", getEmployees) //BE √ FE √
    .post("/api/hire-employee", hireEmployee) //BE √ FE √
    .delete("/api/fire-employee/:id", fireEmployee) //BE √ FE √

    .get("/api/get-exhibits", getExhibits) //BE √ FE √
    .patch("/api/birth-dino", birthDino) //BE √ FE √
    .patch("/api/death-dino", deathDino) //BE √ FE √
    .patch("/api/toggle-visitor/:id", toggleVisitor) //BE √ FE √
    .patch("/api/toggle-fence/:id", toggleFence) //BE √
    .patch("/api/feed/:id", addFeed) //BE √ FE √
    .patch("/api/visit/:id", addVisit) //BE √ FE √

    .get("/api/get-vets", getVets) //BE √ FE √
    .get("/api/vital-signs", getSigns) //BE √ FE √
    .patch("/api/vital-sign/:id", changeSign) //BE √ FE √
    .get("/api/get-key", getKey) //BE √ FE √ → get weather API key

    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "Sorry, you got eaten by a dinosaur!🦖",
        });
    })

    .listen(8000, () => console.log(`Listening on port 8000`));