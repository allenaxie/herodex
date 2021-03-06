const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {type:String, required: true},
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5,
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String,
}, {
    timestamps: true
});

const characterSchema = new Schema({
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
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
    reviews: [reviewSchema],
    reviewId: String,
}, {
    timestamps: true
});



module.exports = mongoose.model("Character", characterSchema);