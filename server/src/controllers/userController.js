const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const userModel = require('../model/user.model');
const userService = require('../services/userService');

exports.register = async (req, res) => {
    try {
        const result = await userService.register(req.body);
        res.status(201).json({ message: 'User registered successfully' })
    } catch (err) {
        console.error('Register error:', err.message);
        const status = err.message === 'User already exists' ? 400 : 500;
        res.status(status).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        console.log("credentials: ", req.body);

        const result = await userService.login(req.body);
        res.status(200).json({
            message: 'Login successfull', 
            token: result.token,
            user: result.user
        });
    } catch (err) {
        console.error("login error", err.message);
        const status = err.message === 'Invalid credentials controller' ? 401 : 500;
        res.status(status).json({ message: err.message });
    }
}

// const { email, password } = req.body;

// userModel.findUserByEmail(email, async (err, result) => {
//     if (result.length === 0) return res.status(401).json({ message: 'invalid credentials' });

//     const user = result[0];
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) return res.status(401).json('Invalid credentials');
//     const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
//         expiresIn: '1d'
//     });

//     res.status(200).json({ message: 'Login successful', token });
// });