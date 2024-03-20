const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 const User = require('../models/userModule');

// @desc Register user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler( async (req, res) =>{
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error('Please add all required fields');
    }
    const userAvaliable = await User.findOne({ email });
    if (userAvaliable){
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    if (user){
        res.status(201).json({_id: user.id, email: user.email});
    }
    else {
        res.status(400);
        throw new Error('User data is not valid ');
    }
    res.json({message: "Register the user"})
});


// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler( async (req, res) =>{
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('All fields are required');
    }
    const user = await User.findOne({ email });
    //Compere password with hashed password
    if (user && (await bcrypt.compare(password, user.password))){
        const accsesToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCSSES_TOKEN_SECRET,
        {expiresIn: "15m"}
        );
        res.status(200).json({accsesToken});
    } else {
        res.status(401)
        throw new Error('email or password is not valid')
    }
});


// @desc Corrent user info
// @route POST /api/users/corrent
// @access Privet
const correntUser = asyncHandler( async (req, res) =>{
    res.json(req.user)
});

module.exports = { registerUser, loginUser, correntUser } 