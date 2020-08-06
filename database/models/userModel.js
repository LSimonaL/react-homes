const mongoose = require("mongoose");

// creating Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// creating Model
module.exports = mongoose.model("User", userSchema);