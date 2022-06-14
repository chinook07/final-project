// This file contains all server operations pertaining to the list of staff. First, get Mongo and Crypto variables.

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);
const db = client.db();

const crypto = require("crypto-js");

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

const logEmployee = async (req, res) => {

    const { user, password } = req.body;
    
    await openSesame();
    const unsecureResult = await db.collection("employees").findOne({ "username": user });

    if (unsecureResult === null) {
        res.status(404).json({ status: 404, message : `${user} does not match with the current records.`})
    } else {
        // Check to see if the password is correct.
        let decrypted = crypto.AES.decrypt(unsecureResult.password, process.env.PASS_SEC).toString(crypto.enc.Utf8);
        let staff = {};
        if (password === decrypted) {
            const logInTime = new Date();
            await db.collection("employees").updateOne(unsecureResult, { $set: { "lastLogIn": logInTime } })
            staff = { _id: unsecureResult._id, username: unsecureResult.username, admin: unsecureResult.admin, lastLogIn: unsecureResult.lastLogIn }
            res.status(200).json({ status: 200, result : staff, message: `${user} is now logged in.` })
        } else {
            res.status(401).json({ status: 401, message : `${user} does not match with the password entered.`})
        }
    }

    await closeSesame();
}

const getEmployees = async (req, res) => {

    await openSesame();
    const unsecureResult = await db.collection("employees").find().toArray();
    let staff = [];
    unsecureResult.forEach(item => {
        staff.push({_id : item._id, username: item.username, admin: item.admin, lastLogIn: item.lastLogIn})
    })
    listOfUnsecurePasswords = [];
    unsecureResult.forEach(item => {
        item.password.length < 9 && 
            listOfUnsecurePasswords.push(item._id)
    })
    staff.forEach(item => {
        listOfUnsecurePasswords.includes(item._id)
            ? item.passSecure = false
            : item.passSecure = true
    })
    await closeSesame();

    return res.status(200).json({ status: 200, listOfUnsecurePasswords, staff, message: "Here are all your employees." });
}

const hireEmployee = async (req, res) => {
    
    const { _id, username, password, admin } = req.body;
    let encryptedPass = crypto.AES.encrypt(password, process.env.PASS_SEC).toString();
    
    await openSesame();
    await db.collection("employees").insertOne({
        _id, username, password: encryptedPass, admin
    });
    await closeSesame();

    return res.status(201).json({ status: 201, encryptedPass, message: `${username} has been created.` });
}

const fireEmployee = async (req, res) => {

    const { id } = req.params;
    
    await openSesame();
    await db.collection("employees").deleteOne({ _id: id });
    await closeSesame();

    return res.status(200).json({ status: 200, message: `Employee ${id} has been terminated.` });
}

module.exports = {
    logEmployee,
    getEmployees,
    hireEmployee,
    fireEmployee
};