const Character = require('../models/character');

module.exports = {
    create,
}

function create (req,res) {
    // First, find the character we are adding a review to
    Character.findOne({apiId: req.params.id}, function (err, character) {
        // add the user properties to the review(req.body) being created 
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        // add the review to the character.reviews array
        character.reviews.push(req.body);
        // save the parent document
        character.save(function(err) {
            // handle errors first
            if (err) console.log(err);
            // console.log(character) to check review was created
            console.log(character);
            // then, respond with a redirect
            res.redirect(`/characters/${character.apiId}`);
        })
    })
}