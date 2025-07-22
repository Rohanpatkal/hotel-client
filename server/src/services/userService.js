const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const generateToken = require('../utils/genarateToken')

exports.register = async ({ first_name, last_name, email, password }) => {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser.length > 0) {
        throw new Error('user already exists...');
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    const userArray = { first_name, last_name, email, password: hashedPassword };

    const result = await userModel.createUser(userArray);
    return result;
};

exports.login = async ({ email, password }) => {

    const existingUser = await userModel.findUserByEmail(email);

    if (!existingUser || existingUser.length === 0) {
        throw new Error('user not exist');
    }

    const user = existingUser[0];
    // const existingUser.password
<<<<<<< HEAD
    console.log(`user password form db:${user.password}`)
=======
    // console.log(`user password form db:${user.password}`)
>>>>>>> 44fda61e (vernost client hotel project)
    const isMatch = await bcrypt.compare(password.toString(), user.password);

    if (!isMatch) {
        throw new Error('Invalid credentials not match password');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d', });

    return {
        token,
        user: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }
    };
};