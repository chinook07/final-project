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
    // TBD
    await closeSesame();

    return res.status(200).json({ status: 200, message: `TBD` });
}

const hireEmployee = async (req, res) => {
    
    await openSesame();
    const { _id, username, password, admin } = req.body;
    await db.collection("employees").insertOne({
        _id, username, password, admin
    });
    await closeSesame();

    return res.status(200).json({ status: 200, message: `${username} has been created.` });
}

const fireEmployee = async (req, res) => {

    await openSesame();
    const { user } = req.body;
    await db.collection("employees").deleteOne({ "username": user });
    await closeSesame();

    return res.status(200).json({ status: 200, message: `${user} has been terminated.` });
}

module.exports = {
    logEmployee,
    getEmployees,
    getEmployee,
    hireEmployee,
    fireEmployee
};