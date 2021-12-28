const Character = require("../models/character");
const fetch = require('node-fetch');
const token = process.env.SUPERHERO_API_KEY
const rootURL = `https://superheroapi.com/api/${token}`

module.exports = {
    index,
    show,
    addTeam,
    delete: removeChar,
    allCharacters,
}

function index (req,res) {
    // Show my team
    // Find all characters that has current user in users property
   Character.find({users:req.user._id}, function (err, characters) {
        const characterName = req.query.characterName; // character searched 
        // if no data in search input, render page
        if (!characterName) return res.render('characters/index', {title: "My team", characterData: null, characters})
        // search function - find character in API database
        fetch(`${rootURL}/search/${characterName}`)
            // convert to JSON format
            .then(res => res.json())
            // display data
            .then(data => {
                if (err) {
                    console.log(err);
                }
                res.render("characters/index",{title: "My team", characters, characterData: data.results});
            })
        })
};

function show (req,res) {
    Character.findOne({apiId: req.params.id}, function (err, characters) {
        fetch(`${rootURL}/${req.params.id}`)
        // convert to JSON format
        .then(res => res.json())
        .then(data => {
            res.render("characters/show", {title: "Hero details", characterData: data, characters})
        })
    });
};

function addTeam (req,res) {
    // Find character
    Character.findOne({apiId: req.params.id}, function (err, character) {
        // if character exists in database
        if (character) {
            // add current user into user property of character
            character.users.push(req.user._id);
            // save model
            character.save(function (err) {
            // handle errors
            if (err) console.log(err);
            // redirect to characters/index page
            res.redirect('/characters');
            });
        } 
        // else, create new Character model
        else {
            // Create an in-memory object (not saved in database yet)
            const character = new Character();
            character.users.push(req.user._id);
            // Fetch character information by id
            fetch(`${rootURL}/${req.params.id}`)
            // convert to JSON format
            .then(res => res.json())
            .then(data => {
                character.apiId = req.params.id;
                character.name = data.name;
                character.image = data.image.url;
                character.fullName = data.biography.fullName;
                character.birthplace = data.biography.placeOfBirth;
                character.gender = data.appearance.gender;
                character.race = data.appearance.race;
                character.height = data.appearance.height;
                character.weight = data.appearance.weight;
                character.occupation = data.work.occupation;
                character.base = data.work.base;
                character.relatives = data.connections.relatives;
            // save parent document
            character.save(function (err) {
                // handle errors
                if (err) console.log(err);
                // redirect to characters/index page
                res.redirect('/characters');
            })
            })
        }
    })
};

function removeChar (req,res) {
    // Look for character in 'my team'
    Character.findOneAndDelete(
        {apiId : req.params.id, user: req.user.id}, function (err) {
            res.redirect('/characters');
        }
    );
};

function allCharacters (req,res) {
    function getRandomNum (min,max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random()* (max - min + 1) + min);
    }
    // array of random numbers
    numArray = [];
    // Generate 5 unique random numbers and add to numArray
    for (let i = 0; numArray.length < 5; i++) {
        let number = getRandomNum(1,731);
        // if number has not been chosen yet
        if (!numArray.includes(number)) {
            // add to array of numbers
            numArray.push(number);
        }
    }
    console.log('length of numArray', numArray.length)
    // array of characters
    charArray = [];
    // for each number in num array, fetch its char ID
    numArray.forEach(function (num,i) {
        // fetch character by id
        fetch(`${rootURL}/${num}`)
        // convert to JSON format
        .then(res => res.json())
        .then(data => {
            console.log(i,data)
            // add character data to array
            charArray.push(data);
            console.log('lengthhhhhh',charArray.length)
            // if character array has 5 characters, render page
            return charArray.length === 5 ? res.render('characters/all', {title:"All Characters", charArray}) : false
        })
    })
}