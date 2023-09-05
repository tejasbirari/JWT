require('dotenv').config();
const Schema = require('../database/models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authentication = async(req, res) => {
    try {
        const { email, password} = req.body;

        // Check if user exists or not 
        const existingUser = await Schema.findOne({ email });

        if(!existingUser){
            return res.status(404).json({ message:"Invalid email" });
        }

        // Compare password with stored hash password
        const passwordMatch = bcrypt.compareSync(password, existingUser.password);

        if(!passwordMatch){
            return res.status(401).json({ message:"Invalid password" });
        }

        // Assign Access Token, if all details are okay
        const accessToken = jwt.sign({email: existingUser.email}, process.env.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: '1000s',
        });

        //Assign Refresh Token
        const refreshToken = jwt.sign({email: existingUser.email}, process.env.REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: '7000s',
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            path: '/',
            maxAge: 3600000000,
        })

        return res.status(200) .json({ message: "Authentication successful", accessToken });

    } catch (error) {
        console.log("Authentication Error: ", error);
        return res.status(400).json({ message: "Authentication Failed"})
    }
}

module.exports = { authentication };