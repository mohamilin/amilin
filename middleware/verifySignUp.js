import User from "../models/userModel.js";

export const verifySignUp = async (req, res, next) => {
  // USERNAME
  try {
    const existingUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (existingUser) {
      res.status(400).json({ message: "Username sudah digunakan" });
      return;
    }
    // EMAIL
    const existingEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (existingEmail) {
      res.status(400).json({ message: "Email sudah digunakan" });
      return;
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default verifySignUp;
