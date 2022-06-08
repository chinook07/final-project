"use strict";

const express = require("express");
const morgan = require("morgan");

const {
    logEmployee,
    getEmployees,
    getEmployee,
    hireEmployee,
    fireEmployee
} = require("./handlers-employees");

const {
    getVets,
    getSigns,
    changeSign
} = require("./handlers-others")

const {
    getExhibits,
    birthDino,
    deathDino,
    toggleVisitor,
    toggleFence,
    addFeed,
    addVisit
} = require("./handlers-exhibits");

express()
    .use(morgan("tiny"))
    .use(express.json())

    .use(express.static("public"))

    .post("/api/log-employee", logEmployee) //BE √ FE √
    .get("/api/get-employees", getEmployees) //BE √
    .get("/api/get-employee/:id", getEmployee) //BE √
    .post("/api/hire-employee", hireEmployee) //BE √
    .delete("/api/fire-employee", fireEmployee) //BE √

    .get("/api/get-vets", getVets) //BE √ FE √

    .get("/api/get-exhibits", getExhibits) //BE √ FE √
    .patch("/api/birth-dino", birthDino) //BE √ FE √
    .patch("/api/death-dino", deathDino) //BE √ FE √
    .patch("/api/toggle-visitor/:id", toggleVisitor) //BE √ FE √
    .patch("/api/toggle-fence/:id", toggleFence) //BE √
    .patch("/api/feed/:id", addFeed) //BE √ FE √
    .patch("/api/visit/:id", addVisit) //BE √ FE √

    .get("/api/vital-signs", getSigns) //BE √ FE √
    .patch("/api/vital-sign/:id", changeSign) //BE √

    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "Sorry, you got eaten by a dinosaur!🦖",
        });
    })

    .listen(8000, () => console.log(`Listening on port 8000`));