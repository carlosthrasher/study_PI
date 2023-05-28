const mongoose = require("../db/conn");
const bcrypt = require('bcrypt');

const SubjectSchema = new mongoose.Schema({
    name: String,
    level: { type: String, enum: ['easy', 'medium', 'difficult'] }
});

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    availableTime: { type: Number, required: true },
    subjects: [SubjectSchema]
});

UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);

