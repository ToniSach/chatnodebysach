const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/', chatController.inicio);
router.post('/login', chatController.chat);

module.exports = router; 