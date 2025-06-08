import User from "../models/userModel.js";
import httpStatus from "http-status";
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";
import validator from "validator"

const registerUser = async (req, res) => {

    const { name, email, password } = req.body;
    try {
        //if user already exist
        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }
        //validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please provide a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }
        //hashing password
        const salt = await bcrypt.genSalt(10);// 10-->enter a number between 5 to 15, higher the number more stronger
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: hashPassword,
        })
        await newUser.save();

        let token = crypto.randomBytes(20).toString("hex");
        newUser.token = token;
        await newUser.save();
        res.status(httpStatus.CREATED).json({ success: true, message: "User registered.", token: token });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        let token = crypto.randomBytes(20).toString("hex");
        user.token = token;
        await user.save();
        return res.status(httpStatus.OK).json({success:true, message: " User signed in", token: token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
};


export { loginUser, registerUser };