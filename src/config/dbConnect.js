import mongoose from "mongoose";

mongoose.connect("mongodb+srv://mark:123@cluster0.dl3sedm.mongodb.net/back-end-users");

let db = mongoose.connection;

export default db;