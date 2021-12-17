const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
    userName: String,
    userAvatar: String,
    apiId: String,
    name: String,
    image: String,
    fullName: String,
    birthplace: String,
    gender: String,
    race: String,
    height:[{type:String}],
    weight: [{type:String}],
    occupation: String,
    base: String,
    relatives: String,
}, {
    timestamps: true
});

module.exports = mongoose.model("Character", characterSchema);