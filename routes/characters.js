const express = require('express');
const router = express.Router();
const charactersCtrl = require('../controllers/characters');
const isLoggedIn = require('../config/auth');


// All paths in this router have "/characters" prefixed to them

// GET "/characters" - Index Route
router.get('/', charactersCtrl.index);

// GET "/characters/:id" - Show route
router.get('/:id', charactersCtrl.show);



// GET "/characters/all" - all characters route


module.exports = router;
