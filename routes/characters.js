const express = require('express');
const router = express.Router();
const charactersCtrl = require('../controllers/characters');
const isLoggedIn = require('../config/auth');

// All paths in this router have "/movies" prefixed to them

// GET "/movies" - Index Route
router.get('/', charactersCtrl.index);



module.exports = router;
