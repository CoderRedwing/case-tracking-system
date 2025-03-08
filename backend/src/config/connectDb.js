const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "");
        console.log("Database Connected Successfully");
    } catch (error) {
       console.log("Database connection is failed", error)
       process.exit(1); 
    }
}

module.exports = connectDb;