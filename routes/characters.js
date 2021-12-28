const express = require('express');
const router = express.Router();
const charactersCtrl = require('../controllers/characters');
const isLoggedIn = require('../config/auth');


// All paths in this router have "/characters" prefixed to them

// GET "/characters" - Index Route
router.get('/', isLoggedIn, charactersCtrl.index);

// GET "/characters/all" - All characters route
router.get('/all', charactersCtrl.allCharacters);

// GET "/characters/:id" - Show route
router.get('/:id', charactersCtrl.show);

// POST "/characters/:id" - Add character to team
router.post('/:id', isLoggedIn, charactersCtrl.addTeam);

// DELETE "/characters/:id" - Remove character from team
router.delete('/:id', isLoggedIn, charactersCtrl.delete);



module.exports = router;
