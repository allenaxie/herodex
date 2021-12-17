const Character = require('../models/character');

module.exports = {
    create,
    delete: deleteReview,
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
            // then, respond with a redirect
            res.redirect(`/characters/${character.apiId}`);
        })
    })
}

function deleteReview (req,res,next) {
   // Note the cool "dot" syntax to query on the property of a subdoc
   Character.findOne({'reviews._id' : req.params.id})
   .then(function(character) {
       // find the review subdoc using the id method on Mongoose arrays
       const review = character.reviews.id(req.params.id);
       // Ensure that the review was created by the logged in user
       if (!review.user.equals(req.user._id)) return res.direct(`/characters/${character.apiId}`);
       // Remove the review using the remove method of the subdoc
       review.remove();
       // Save the updated character
       character.save().then(function() {
           // Redirect back to the character's show view
           res.redirect(`/characters/${character.apiId}`);
       }).catch(function(err) {
           return next(err);
       })
   })
}