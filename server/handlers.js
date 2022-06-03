const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const logEmployee = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db();
    console.log("connected!");

    const { user } = req.body;

    const staff = await db.collection("employees").find().toArray();
    const result = staff.find((item) => item.username == user) || null
    console.log(JSON.stringify(result));
    
    await client.close();
    console.log("disconnected!");

    result
        ? res.status(200).json({ status: 200, result : result, message: `${user} is now logged in.` })
        : res.status(404).json({ status: 404, result : null, message : `${user} is not a valid username.`})

}

const getEmployees = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db();
    console.log("connected!");

    const staff = await db.collection("employees").find().toArray();
    
    await client.close();
    console.log("disconnected!");

    return res.status(200).json({ status: 200, staff, message: "Here are all your employees." });
}

const getEmployee = async (req, res) => {
    console.log("something");
}

const hireEmployee = async (req, res) => {
    console.log("something");
}

const fireEmployee = async (req, res) => {
    console.log("something");
}

const getExhibit = async (req, res) => {
    console.log("something");
}

const getExhibits = async (req, res) => {
    console.log("something");
}

const birthDino = async (req, res) => {
    console.log("something");
}

const deathDino = async (req, res) => {
    console.log("something");
}

const toggleFence = async (req, res) => {
    console.log("something");
}

module.exports = {
    logEmployee,
    getEmployees,
    getEmployee,
    hireEmployee,
    fireEmployee,
    getExhibit,
    getExhibits,
    birthDino,
    deathDino,
    toggleFence
};