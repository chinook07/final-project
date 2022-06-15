// Import the data into a MongoDB database, running node batchImport in the terminal.

const { employees, assets, vets } = require("./data");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const crypto = require("crypto-js");

const batchImport = async () => {

    // Open up the connection to MongoDB.

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");
    const db = client.db();

    // Create a new array and put in all the employee data with their encrypted passwords.

    let secureEmployees = [];
    employees.forEach(item => {
        let encryptedPass = crypto.AES.encrypt(item.password, process.env.PASS_SEC).toString();
        secureEmployees.push({_id: item._id, username: item.username, password: encryptedPass, admin: item.admin})
    })

    // Import the 3 collections of data. If you only need to import one, make sure to comment out the others.

    await db.collection("employees").insertMany(secureEmployees);
    await db.collection("assets").insertMany(assets);
    await db.collection("vets").insertMany(vets);

    // Disconnect from MongoDB.

    await client.close();
    console.log("disconnected!");
}

batchImport()