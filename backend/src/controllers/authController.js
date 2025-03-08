const { signupUser, loginUser } = require("../services/authService");


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const token = await signupUser(name, email, password);
        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        res.status(201).json({ message: "Login Successful", token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { signup, login };