
// const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const colors = require("colors");


const dbConnection = async () => {
    try {
        const connect = await new mongoose.connect(process.env.MONGODB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log(`MongoDB Connected: ${connect.connection.host}`.yellow.underline)

    } catch (error) {
        console.log(`Error: ${error.message}`.red.bold);
        process.exit();
    }
};

module.exports = dbConnection;

