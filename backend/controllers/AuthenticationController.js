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

        // Assign JWT Token, if all details are okay
        const token = jwt.sign({email: existingUser.email}, process.env.SECRET_KEY, {
            expiresIn: '1800s',
        });

        return res.status(200).json({ message: "Authentication successful", token });

    } catch (error) {
        console.log("Authentication Error: ", error);
        return res.status(400).json({ message: "Authentication Failed"})
    }
}

module.exports = { authentication };