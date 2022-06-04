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
    console.log(user);

    const staff = await db.collection("employees").find().toArray();
    const result = staff.find((item) => item.username == user) || null
    console.log(result);
    
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
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db();
    console.log("connected!");

    const assets= await db.collection("assets").find().toArray();
    
    await client.close();
    console.log("disconnected!");

    return res.status(200).json({ status: 200, assets, message: "Here are all your employees." });
}

const birthDino = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db();
    console.log("connected!");

    const { dinoName, currentNum } = req.body;

    await db.collection("assets").updateOne({species: dinoName},{$set: {"population" : currentNum + 1}});

    await client.close();
    console.log("disconnected!");

    return res.status(200).json({ status: 200, message: `Congratulations. You now have a new ${dinoName}.` });
}

const deathDino = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db();
    console.log("connected!");

    const { dinoName, currentNum } = req.body;

    await db.collection("assets").updateOne({species: dinoName},{$set: {"population" : currentNum - 1}});

    await client.close();
    console.log("disconnected!");

    return res.status(200).json({ status: 200, message: `${dinoName} will be missed.` });
}

const toggleVisitor = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db();
    console.log("connected!");

    const { id } = req.params;

    const toUpdate = await db.collection("assets").findOne({ _id: parseInt(id) });

    toUpdate.currentlyOpenToVisitors == true
        ? await db.collection("assets").updateOne(toUpdate, { $set: { "currentlyOpenToVisitors": false } })
        : await db.collection("assets").updateOne(toUpdate, { $set: { "currentlyOpenToVisitors": true } })

    await client.close();
    console.log("disconnected!");

    return res.status(200).json({ status: 200, message: `${toUpdate.name} has been turned to ${toUpdate.currentlyOpenToVisitors}` });
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
    toggleVisitor,
    toggleFence
};