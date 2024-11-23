const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: "3d"});
}
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "Email already exists" });
    }
    if(!name || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }
    if(!validator.isEmail(email))
        return res.status(400).json({message: "Email is not valid"});
    if(!validator.isStrongPassword(password))
        return res.status(400).json({message: "Password is not strong"});

    const salt = await bcrypt.genSalt(10);
    user = new userModel({name, email, password});
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const token = createToken(user._id);
    res.status(201).json({_id: user._id, name, email, token});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        let user = await userModel.findOne({ email });
        if(!user) return res.status(400).json({message: "Invalid email or password"});
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) return res.status(400).json({message: "Invalid email or password"});
        const token = createToken(user._id);
        res.status(200).json({_id: user._id, name: user.name, email, token});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const findUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await userModel.findById({_id: userId});
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
module.exports = { registerUser, loginUser, findUser, getUsers };
