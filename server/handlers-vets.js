const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

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

module.exports = { getVets };