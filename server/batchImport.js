const { employees, assets, vets } = require("./data");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const batchImport = async () => {

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("connected!");
    const db = client.db();
    // await db.collection("employees").insertMany(employees);
    // await db.collection("assets").insertMany(assets);
    // await db.collection("vets").insertMany(vets);
    await client.close();
    console.log("disconnected!");
}

batchImport()