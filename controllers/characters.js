const Character = require("../models/character");
const fetch = require('node-fetch');
const token = process.env.SUPERHERO_API_KEY
const rootURL = `https://superheroapi.com/api/${token}`

module.exports = {
    index,
    show,
    addTeam,
}

function index (req,res) {
    // Show my team
    // Find all characters in my team
   Character.find({}, function (err, characters) {
    //    const charIdArr = [];
    //     // for each character in array
    //     characters.forEach(function (char) {
    //         charIdArr.push(char.apiId);
    //     })
    //    // if there are characters in my team
    //    if (characters.length) {
    //         // search API and match id number
    //         fetch(`${rootURL}/search/${char.apiId}`)
    //            // convert to JSON format
    //            .then(res => res.json())
    //            // display data
    //            .then(data => {
    //                if(err) {
    //                    console.log(err);
    //                }
    //                res.render("characters/index",{title: "My team", characters, characterData: data.results});
    //            })
    //        }
       
        const characterName = req.query.characterName; // character searched 
        // if no data in search input, render page
        if (!characterName) return res.render('characters/index', {title: "My team", characterData: null, characters})
        // search character in API database
        fetch(`${rootURL}/search/${characterName}`)
            // convert to JSON format
            .then(res => res.json())
            // display data
            .then(data => {
                console.log(characters);
                if (err) {
                    console.log(err);
                }
                res.render("characters/index",{title: "My team", characters, characterData: data.results});
            })
        })
};

function show (req,res) {
    Character.findById(req.params.id, function (err, characters) {
        console.log(req.params.id);
        fetch(`${rootURL}/${req.params.id}`)
        // convert to JSON format
        .then(res => res.json())
        .then(data => {
            res.render("characters/show", {title: "Hero details", characterData: data, characters})
        })
    });
};

function addTeam (req,res) {
    // Add user to character's req.body
    req.body.user = req.user.id
    // Create an in-memory object (not saved in database yet)
    const character = new Character(req.body);
    // Fetch character information
    fetch(`${rootURL}/${req.params.id}`)
    // convert to JSON format
    .then(res => res.json())
    .then(data => {
        // for (let k in data) {
        //     console.log(`k: ${k}`)
        //     console.log(`data: ${data[k]}`)
        //     character.k = data[k];
        // }
        // console.log(`character: ${character.name}`);
        character.apiId = req.params.id;
    // save parent document
    character.save(function (err) {
        // handle errors
        if (err) console.log(err);
        console.log(character);
        // redirect to characters/index page
        res.redirect('/characters');
    })
    })
};