const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const isLoggedIn = require('../config/auth');

// Routes are not prefixed with any path

// POST "/characters/:id/reviews" - Create review route
router.post('/characters/:id/reviews', isLoggedIn, reviewsCtrl.create);

// DELETE "/characters/:id" - Delete review route
router.delete('/reviews/:id', reviewsCtrl.delete);

// GET "/reviews/:id/edit" - Edit review route
router.get('/reviews/:id/edit', reviewsCtrl.edit);

// PUT "/reviews/:id" - Update review route
router.put('/reviews/:id', reviewsCtrl.update);

module.exports = router;