const Character = require('../models/character');


module.exports = {
    create,
    delete: deleteReview,
    edit,
    update,
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
    console.log(req.params.id, 'paramssss')
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

function edit (req,res) {
    console.log('req params iddddd',req.params.id)
    // Find the character linked to the review we are editing
    Character.findOne({'reviews._id': req.params.id})
    .then(characters => {
        // Save the review id we are editing
        characters.reviewId = req.params.id
        // Need to access properties of characters.reviews to access _.id in edit page
        res.render('characters/edit', {title:"Edit review", characters});
    })
}

function update (req,res) {
    // find character linked to the review we are updating
    Character.findOne({'reviews._id': req.params.id}, function (err, character) {
        // Access the review we are changing
        const reviewSubdoc = character.reviews.id(req.params.id)
        // if no user or userId doesn't match, redirect to character screen
        if ((!req.user) || !reviewSubdoc.user.equals(req.user._id)) return res.redirect(`/characters/${character.apiId}`);
        // save the new comment and rating
        reviewSubdoc.content = req.body.content;
        reviewSubdoc.rating= req.body.optradio;
        character.save(function(err) {
            res.redirect(`/characters/${character.apiId}`);
        })
    })
}