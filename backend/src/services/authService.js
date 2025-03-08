const User = require('../models/user.model');
const {hashPassword, comparePassword} = require('../utils/hashPassword');
const generateToken = require('../utils/jwtUtils');


const signupUser = async (name, email, password) => {

    const user = await User.findOne({ email });

    if (user) {
        throw new Error("User Already Eist");
    }

    const encrptedPassword = await hashPassword(password);

    const newUser = new User({ name, email, password: encrptedPassword });
    await newUser.save();

    return generateToken(newUser);
}

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid Credentials");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid Credentials");
    }

    return generateToken(user);
}

module.exports = { signupUser, loginUser };