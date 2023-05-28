const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');

exports.register = async (req, res) => {
    // Add validation
    const user = new User(req.body);
    await user.save();
    res.send({ user: user._id });
};

exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is wrong');

    const validPass = await user.isValidPassword(req.body.password);
    if (!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
};

exports.addSubject = async (req, res) => {
    const user = await User.findById(req.user._id);
    user.subjects.push(req.body);
    await user.save();
    res.send(user);
};

exports.deleteSubject = async (req, res) => {
    const user = await User.findById(req.user._id);
    user.subjects = user.subjects.filter(s => s._id.toString() !== req.params.subjectId);
    await user.save();
    res.send(user);
};

exports.updateSubject = async (req, res) => {
    const user = await User.findById(req.user._id);
    const subject = user.subjects.id(req.params.subjectId);
    subject.set(req.body);
    await user.save();
    res.send(user);
};

exports.updateAvailableTime = async (req, res) => {
    const user = await User.findById(req.user._id);
    user.availableTime = req.body.availableTime;
    await user.save();
    res.send(user);
};
