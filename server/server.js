"use strict";

const express = require("express");
const morgan = require("morgan");

const {
    logEmployee,
    getEmployees,
    getEmployee,
    hireEmployee,
    fireEmployee,
    getExhibit,
    getExhibits,
    birthDino,
    deathDino,
    toggleVisitor,
    toggleFence
} = require("./handlers");

express()
    .use(morgan("tiny"))
    .use(express.json())

    .use(express.static("public"))

    .post("/api/log-employee", logEmployee)

    .get("/api/get-employees", getEmployees)
    .get("/api/get-employee/:id", getEmployee)
    .post("/api/hire-employee", hireEmployee)
    .delete("/api/fire-employee/:id", fireEmployee)

    .get("/api/get-exhibit/:id", getExhibit)
    .get("/api/get-exhibits", getExhibits)

    .patch("/api/birth-dino", birthDino)
    .patch("/api/death-dino", deathDino)
    
    .patch("/api/toggle-visitor/:id", toggleVisitor)
    .patch("/api/toggle-fence", toggleFence)

    //...

    // .get("/api/get-flights", getFlights)
    // .get("/api/get-flight/:id", getFlight)
    // .post("/api/add-reservation", addReservation)
    // .patch("/api/update-flight/:id", updateFlight)
    // .get("/api/get-reservations", getReservations)
    // .get("/api/get-reservation/:id", getSingleReservation)
    // .patch("/api/update-reservation/:id", updateReservation)
    // .delete("/api/delete-reservation/:id", deleteReservation)

    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "Sorry, you got eaten by a dinosaur!🦖",
        });
    })

    .listen(8000, () => console.log(`Listening on port 8000`));