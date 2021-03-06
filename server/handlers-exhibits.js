// This file contains all server operations pertaining to the list of habitats and their assets.  First, get Mongo variables.

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const db = client.db();

// Use this to connect and disconnect to the database.

const openSesame = async () => {
    await client.connect();
    console.log("connected!");
}

const closeSesame = async () => {
    await client.close();
    console.log("disconnected!");
}

// Here are the actual handlers.

const getExhibits = async (req, res) => {

    await openSesame();
    const assets= await db.collection("assets").find().toArray();
    await closeSesame();

    return res.status(200).json({ status: 200, assets, message: "Here are all your employees." });
}

const birthDino = async (req, res) => {
    
    const { species, currentNum } = req.body;
    
    await openSesame();
    await db.collection("assets").updateOne({species},{$set: {"population" : currentNum + 1}});
    await closeSesame();

    return res.status(200).json({ status: 200, message: `Congratulations. It's a ${species} girl.` });
}

const deathDino = async (req, res) => {

    const { species, currentNum } = req.body;
    
    await openSesame();
    await db.collection("assets").updateOne({species},{$set: {"population" : currentNum - 1}});
    await closeSesame();

    return res.status(200).json({ status: 200, message: `${species} will be missed.` });
}

const toggleVisitor = async (req, res) => {

    const { id } = req.params;
    
    await openSesame();
    const toUpdate = await db.collection("assets").findOne({ _id: parseInt(id) });
    toUpdate.currentlyOpenToVisitors
        ? await db.collection("assets").updateOne(toUpdate, { $set: { "currentlyOpenToVisitors": false } })
        : await db.collection("assets").updateOne(toUpdate, { $set: { "currentlyOpenToVisitors": true } })
    await closeSesame();

    toUpdate.currentlyOpenToVisitors
        ? res.status(200).json({ status: 200, message: `${toUpdate.name} is now shut to visitors.` })
        : res.status(200).json({ status: 200, message: `${toUpdate.name} is now open to visitors.` })
}

const toggleFence = async (req, res) => {

    const { id } = req.params;
    
    await openSesame();
    const toUpdate = await db.collection("assets").findOne({ _id: parseInt(id) });
    toUpdate.fenceActive
        ? await db.collection("assets").updateOne(toUpdate, { $set: { "fenceActive": false } })
        : await db.collection("assets").updateOne(toUpdate, { $set: { "fenceActive": true } })
    await closeSesame();

    toUpdate.fenceActive
        ? res.status(200).json({ status: 200, message: `Habitat ${id}'s fence has been disarmed. Please follow safety protocol LH-562 to avoid casualties.` })
        : res.status(200).json({ status: 200, message: `Habitat ${id}'s fence has been armed.` })
}

const addFeed = async (req, res) => {

    const { id } = req.params;
    const { time } = req.body;
    
    await openSesame();
    const toUpdate = await db.collection("assets").findOne({ _id: parseInt(id) });
    await db.collection("assets").updateOne(
        toUpdate,
        { $push: { lastFeedings: { $each: [{time}], $position: 0 } } }
    )
    await closeSesame();

    return res.status(200).json({ status: 200, id, message: `Fed at ${time}.` });
}

const addVisit = async (req, res) => {

    const { id } = req.params;
    const { time, employee } = req.body;
    
    await openSesame();
    const toUpdate = await db.collection("assets").findOne({ _id: parseInt(id) });
    await db.collection("assets").updateOne(
        toUpdate,
        { $push: { lastVisits: { $each: [{time, employee}], $position: 0 } } }
    )
    await closeSesame();

    return res.status(200).json({ status: 200, id, message: `Visited at ${time} by ${employee}.` });
}

module.exports = {
    getExhibits,
    birthDino,
    deathDino,
    toggleVisitor,
    toggleFence,
    addFeed,
    addVisit
};