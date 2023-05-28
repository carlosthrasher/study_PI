const mongoose = require("../db/conn");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, max: 255, min: 6 },
    password: { type: String, required: true, max: 255, min: 6 },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

module.exports = mongoose.model("User", UserSchema);
