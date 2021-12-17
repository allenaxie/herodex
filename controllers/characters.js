const Character = require("../models/character");
const fetch = require('node-fetch');
const token = process.env.SUPERHERO_API_KEY
const rootURL = `https://superheroapi.com/api/${token}`

module.exports = {
    index,
    show,
    addTeam,
}

async function index (req,res) {
    // show all characters
    // search through API database
        // render search results

        const characterName = req.query.characterName; // character searched
        // if no data in search input, render page
        if (!characterName) return res.render('characters/index', {title: "My team", characterData: null})
        // let characterData
        fetch(`${rootURL}/search/${characterName}`)
            // convert to JSON format
            .then(res => res.json())
            // display data
            .then(data => {
                res.render("characters/index",{title: "My team", characterData: data.results});
            })
   
};

function show (req,res) {
    fetch(`${rootURL}/${req.params.id}`)
    // convert to JSON format
    .then(res => res.json())
    .then(data => {
        res.render("characters/show", {title: "Hero details", characterData: data})
    })
};

function addTeam (req,res) {
    // Add user to character
    req.body.user = req.user.id
    // Create an in-memory object (not saved in database yet)
    const character = new Character(req.body);
    // save parent document
    character.save(function (err) {
        // handle errors
        if (err) console.log(err);
        // redirect to characters/index page
        res.redirect('/characters');
    })
};