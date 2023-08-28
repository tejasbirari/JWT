const Schema = require('../database/models/Users');
const bcrypt = require('bcryptjs');

const registration = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the provided email is already an existing user
        const existingUser = await Schema.findOne({ email });

        // If an existing user with the email is found, send a 409 Conflict response
        if(existingUser){
            return res.status(409).json({ message:"Email already in use" });
        }

        // If email is not in use, proceed with user registration
        // Convert Password in Hashed Password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // Store all details in database
        const createUser = new Schema({
            username: username,
            email: email,
            password: hash
        })

        // Check if query is successful or not
        const success = await createUser.save();

        // On successful registration send 201 Created response
        if(success) {
            return res.status(201).json({ message: "User created successfully"});
        }

    } catch (error) {
        console.log("Registration Failed: ", error);
        return res.status(400).json({ message: "Registration Failed"});
    }
}

module.exports = { registration };