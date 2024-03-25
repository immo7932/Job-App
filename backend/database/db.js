import mongoose from "mongoose";

async function db() {
    try {
        await mongoose.connect('mongodb://localhost:27017/user');
        console.log("db connected...");
    } catch (error) {
        console.log("db coonection failed", error);
    }
}

export default db;
