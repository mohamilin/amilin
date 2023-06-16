import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password, telepon, kota, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);
    const userRole = role || "user";

    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      telepon: telepon,
      kota: kota,
      role: userRole,
    });
    res.status(201).json({
      message: "Anda berhasil melakukan registrasi!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal melakukan registrasi!" });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const isPasswordValid = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Password yang anda masukkan tidak sesuai" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 1 hari
    });

    res.status(200).json({
      message: "Anda berhasil login!",
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      telepon: user.telepon,
      kota: user.kota,
      accessToken: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal login" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findAll();

    res.status(200).json({
      message: "Data User",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role, telepon, kota, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (role) {
      user.role = role;
    }
    if (telepon) {
      user.telepon = telepon;
    }
    if (kota) {
      user.kota = kota;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 8);
      user.password = hashedPassword;
    }
    await user.save();
    res.json({ message: "Berhasil melakukan update data user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    await user.destroy();
    res.json({ message: "Berhasil menghapus data user" });
  } catch (err) {
    console.log(error);
    res.status(500).json({ message: err.message });
  }
};

const userController = {
  signup: signup,
  signin: signin,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
export default userController;
