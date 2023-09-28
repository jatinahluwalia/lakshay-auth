import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

userSchema.statics.login = async function (email: string, password: string) {
  if (!validator.isEmail(email)) {
    throw new Error("Not a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User does not exist.");
  }

  const isPassOK = await bcrypt.compare(user.password, password);

  if (isPassOK) {
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || "lakshayauth"
    );
    return { token, email, name: user.name };
  }
  throw new Error("Password not correct");
};

userSchema.statics.signup = async function (
  name: string,
  email: string,
  password: string
) {
  if (!name) {
    throw new Error("Please enter a name.");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email.");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password.");
  }

  const emailExists = await this.find({ email });

  if (emailExists) {
    throw new Error("User already exists. Please login");
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, hashedPassword });

  const token = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET || "lakshayauth"
  );

  return { name, email, token };
};

const User = mongoose.model("User", userSchema);

export default User;
