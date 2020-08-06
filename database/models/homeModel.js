const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeSchema = new Schema({
    name: { type: String, required: true },
    rent: { type: Number, required: true },
    images: [{ id: String, imageLink: String }], //TODO: make it array for many images
    address: { type: String, required: true },

    owner_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Home", homeSchema);
