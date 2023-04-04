import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*register user*/
export const register = async (req, res) => {  /*it has to be async because we are going to be calling mogoDB and when make a call to mongoDB, thats going to be async like an API call from front end to back end and back end to database*/
    try{
        const {
            firstName,
            lastName, 
            email,
            password, 
            picturePath, 
            friends,
            location,
            occupation
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
        firstName,
        lastName, 
        email,
        password: passwordHash, 
        picturePath, 
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 10000), /*will generate a random number of people viewing their profile*/
        impressions: Math.floor(Math.random() * 10000), /*will generate a random number*/
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    }catch (err) {
        res.status(500).json({ error: err.message}); /*this sends the front end a status code of 500 with an error message of whatever the mongoDB has returned*/
    }
};

/*logging in*/
