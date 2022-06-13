const { employees, assets, vets, vitalSigns } = require("./data");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const crypto = require("crypto-js");

const batchImport = async () => {

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");
    const db = client.db();
    let secureEmployees = [];
    employees.forEach(item => {
        let encryptedPass = crypto.AES.encrypt(item.password, process.env.PASS_SEC).toString();
        secureEmployees.push({_id: item._id, username: item.username, password: encryptedPass, admin: item.admin})
    })
    await db.collection("employees").insertMany(secureEmployees);
    // await db.collection("assets").insertMany(assets);
    // await db.collection("vets").insertMany(vets);
    // await db.collection("vitalSigns").insertMany(vitalSigns)
    await client.close();
    console.log("disconnected!");
}

batchImport()