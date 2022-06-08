const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, WEATHER_KEY } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const db = client.db();

const openSesame = async () => {
    await client.connect();
    console.log("connected!");
}

const closeSesame = async () => {
    await client.close();
    console.log("disconnected!");
}

const getVets = async (req, res) => {

    await openSesame();
    const result = await db.collection("vets").find().toArray();
    await closeSesame();

    return res.status(200).json({ status: 200, result, message: "Here are all your vets." });
}

const getSigns = async (req, res) => {

    await openSesame();
    const result = await db.collection("vitalSigns").find().toArray();
    await closeSesame();

    return res.status(200).json({ status: 200, result, message: "Here are all your vital signs." });
}

const changeSign = async (req, res) => {

    await openSesame();
    const { id } = req.params;
    const toUpdate = await db.collection("vitalSigns").findOne({ _id: parseInt(id) });
    console.log(toUpdate);
    toUpdate.status
        ? await db.collection("vitalSigns").updateOne(toUpdate, { $set: { status: false } })
        : await db.collection("vitalSigns").updateOne(toUpdate, { $set: { status: true } })
    await closeSesame();
    return res.status(200).json({ status: 200, toUpdate, message: "Toggled." });
}

const getKey = async (req, res) => {
    return res.status(200).json({ status: 200, key: WEATHER_KEY, message: "Here's the key."})
}

module.exports = { getVets, getSigns, changeSign, getKey };