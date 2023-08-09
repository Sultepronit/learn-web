const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');

//console.log(refreshTokenController);
router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;