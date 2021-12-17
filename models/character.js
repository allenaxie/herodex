const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    apiId: String,
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    userName: String,
    userAvatar: String,

}, {
    timestamps: true
});

module.exports = mongoose.model("Character", characterSchema);