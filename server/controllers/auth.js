import User from "../models/user";
import { comparePassword, hashPassword } from "../utils/auth";

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
