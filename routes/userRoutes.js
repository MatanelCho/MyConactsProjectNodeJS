const express = require('express');
const { registerUser, loginUser, correntUser } = require('../controllers/userControler');
const validateToken = require('../middleware/valitadteTokenHandler');

const router = express.Router();

router.post ("/register", registerUser
)

router.post ("/login", loginUser
)

router.get ("/current", validateToken, correntUser
)

module.exports = router