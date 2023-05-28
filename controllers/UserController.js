const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');

exports.register = async (req, res) => {
    // Add validation
    const {email, password} = req.body
    const user = new User(email, password);
    await user.save();
    res.send({ user: user._id });
};

exports.login = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Email ou senha inválidos');

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Email ou senha inválidos');

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
};
