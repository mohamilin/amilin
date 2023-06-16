import Kontribusi from "../models/kontribusiModel.js";
import Aksi from "../models/aksiModel.js";
import User from "../models/userModel.js";

export const kontribusiController = {
  getKontribusi: async (req, res) => {
    try {
      const response = await Kontribusi.findAll();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to fetch Kontribusi" });
    }
  },
  getKontribusiById: async (req, res) => {
    try {
      const response = await Kontribusi.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (response) {
        res.json({ result: response });
      } else {
        res.status(404).json({ message: "Kontribusi not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to fetch Kontribusi" });
    }
  },

  createKontribusi: async (req, res) => {
    const { name, email, telepon, kota } = req.body;
    const aksi_id = req.query.aksiId;

    const user_id = req.user.id;
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "Login terlebih dahulu" });
    }
    if (user.email !== email) {
      return res.status(400).json({
        message:
          "Pastikan email anda sama dengan email yang digunakan saat login!",
      });
    }
    if (user.telepon !== telepon) {
      return res.status(400).json({
        message:
          "Pastikan nomor telepon sama dengan nomor telepon yang anda isikan saat registrasi!",
      });
    }
    if (user.kota !== kota) {
      return res.status(400).json({
        message:
          "Pastikan kota sama dengan kota yang anda isikan saat registrasi!",
      });
    }
    const aksi = await Aksi.findByPk(aksi_id);
    if (!aksi) {
      return res.status(404).json({ message: "Aksi tidak ditemukan" });
    }

    const existingKontribusi = await Kontribusi.findOne({
      where: {
        user_id: user_id,
        aksi_id: aksi_id,
      },
    });
    if (existingKontribusi) {
      return res
        .status(400)
        .json({ message: "Anda sudah pernah menandatangani petisi ini" });
    }

    try {
      const petisi = await Kontribusi.create({
        user_id,
        aksi_id,
        telepon,
        name,
        email,
        kota,
      });

      aksi.numberofsupport += 1;
      await aksi.save();

      res.status(201).json({
        success: true,
        message: "Terimakasih Anda sudah berkontribusi dalam aksi ini!",
        result: petisi,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
};

export default kontribusiController;
