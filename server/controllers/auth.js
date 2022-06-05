import User from "../models/user";
import { comparePassword, hashPassword } from "../utils/auth";
import jwt from "jsonwebtoken";

// Register user controller
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validation
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and should ne minimum 6 characters long");
    }
    // checking email exist or not
    const userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is already taken.");
    // hash password
    const hashedPassword = await hashPassword(password);
    // save the user
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();
    return res.json({ success: true });
  } catch (err) {
    return res.status(400).send("Error. Try again.");
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("No user found.");
    // check password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Password is not correct.");
    // create signed jwt token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    // return user and token to client, exclude hashed password
    user.password = undefined;
    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // only works on https
    });
    // send user as json response
    res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(400).send("Error. Try again.");
  }
};

// Logout user controller
export const logout = async (_, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Sign-out success" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error. Try again.");
  }
};

// Get current logged-in user details controller
export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id).select("-password").exec();
    return res.json(user);
  } catch (err) {
    return res.status(500).send("Error. Try again.");
  }
};
