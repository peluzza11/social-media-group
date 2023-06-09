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

    const salt = await bcrypt.genSalt();/* create a salt provided by bcrypt, encryption, and use the salt to encrypt our password*/   /*https://www.tabnine.com/code/javascript/functions/bcrypt/hash*/
    const passwordHash = await bcrypt.hash(password, salt); /* to encrypt our password so that the password is not exposed we can create a salt, pass it in and has it together*/

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
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); /* status code 201 means something has created*/       /*https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201*/
    }catch (err) {
        res.status(500).json({ error: err.message}); /*this sends the front end a status code of 500 with an error message of whatever the mongoDB has returned*/
    }
};

/*logging in*/

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email}); /* use mongoose here to try to find the one that has specified email and the user information*/
        if (!user) return res.status(400).json({ msg: "User does not exist."});
                                                                                /*this is how we validate wether the user is writing the correct user and password*/
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials."});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password; /* delete the password so it doesnt get back to the frontend*/
        res.status(200).json({ token, user});
    } catch (error) {
        res.status(500).json({ error: err.message});
    }
};
