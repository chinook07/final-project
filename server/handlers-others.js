// This file contains all other server operations needed.  First, get Mongo variables.

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, WEATHER_KEY } = process.env;

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

const getVets = async (req, res) => {

    await openSesame();
    const result = await db.collection("vets").find().toArray();
    await closeSesame();

    return res.status(200).json({ status: 200, result, message: "Here are all your vets." });
}

const getKey = async (req, res) => {
    return res.status(200).json({ status: 200, key: WEATHER_KEY, message: "Here's the key."})
}

module.exports = { getVets, getKey };