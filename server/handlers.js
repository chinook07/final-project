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

const logEmployee = async (req, res) => {

    await openSesame();
    const { user, password } = req.body;
    const staff = await db.collection("employees").findOne(
        { "username": user, "password": password }
    );
    console.log(staff);
    await closeSesame();

    staff
        ? res.status(200).json({ status: 200, result : staff, message: `${user} is now logged in.` })
        : res.status(404).json({ status: 404, result : null, message : `${user} does not match with the password entered.`})

}

const getEmployees = async (req, res) => {

    await openSesame();
    const staff = await db.collection("employees").find().toArray();
    await closeSesame();

    return res.status(200).json({ status: 200, staff, message: "Here are all your employees." });
}

const getEmployee = async (req, res) => {
    
    await openSesame();
    await closeSesame();

    return res.status(200).json({ status: 200, message: `TBD` });
}

const hireEmployee = async (req, res) => {
    
    await openSesame();
    await closeSesame();

    return res.status(200).json({ status: 200, message: `TBD` });
}

const fireEmployee = async (req, res) => {

    await openSesame();
    await closeSesame();

    return res.status(200).json({ status: 200, message: `TBD` });
}

const getExhibit = async (req, res) => {
    
    await openSesame();
    await closeSesame();

    return res.status(200).json({ status: 200, message: `TBD` });
}

const getExhibits = async (req, res) => {

    await openSesame();
    const assets= await db.collection("assets").find().toArray();
    await closeSesame();

    return res.status(200).json({ status: 200, assets, message: "Here are all your employees." });
}

const birthDino = async (req, res) => {
    
    await openSesame();
    const { dinoName, currentNum } = req.body;
    await db.collection("assets").updateOne({species: dinoName},{$set: {"population" : currentNum + 1}});
    await closeSesame();

    return res.status(200).json({ status: 200, message: `Congratulations. You now have a new ${dinoName}.` });
}

const deathDino = async (req, res) => {

    await openSesame();
    const { dinoName, currentNum } = req.body;
    await db.collection("assets").updateOne({species: dinoName},{$set: {"population" : currentNum - 1}});
    await closeSesame();

    return res.status(200).json({ status: 200, message: `${dinoName} will be missed.` });
}

const toggleVisitor = async (req, res) => {

    await openSesame();
    const { id } = req.params;
    const toUpdate = await db.collection("assets").findOne({ _id: parseInt(id) });
    toUpdate.currentlyOpenToVisitors == true
        ? await db.collection("assets").updateOne(toUpdate, { $set: { "currentlyOpenToVisitors": false } })
        : await db.collection("assets").updateOne(toUpdate, { $set: { "currentlyOpenToVisitors": true } })
    await closeSesame();

    return res.status(200).json({ status: 200, message: `${toUpdate.name} has been turned to ${toUpdate.currentlyOpenToVisitors}` });
}

const toggleFence = async (req, res) => {
    await openSesame();
    await closeSesame();

    return res.status(200).json({ status: 200, message: `TBD` });
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