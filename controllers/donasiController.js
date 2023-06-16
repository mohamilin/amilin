import { or } from "sequelize";
import Donasi from "../models/donasiModel.js";
import User from "../models/userModel.js";

export const donasiController = {
  getDonasi: async (req, res) => {
    try {
      const response = await Donasi.findAll();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Gagal mendapatkan donasi" });
    }
  },
  createDonasi: async (req, res) => {
    try {
      const { nama, nomor_hp, email, nomor_rekening, original_value } =
        req.body;

      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      const formated_value = formatter.format(original_value);
      const user_id = req.user.id;

      const user = await User.findByPk(user_id);
      if (!user) {
        return res
          .status(404)
          .json({ message: "Anda harus login terlebih dahulu" });
      }
      if (user.email !== email) {
        return res.status(400).json({
          message:
            "Pastikan email anda sama dengan email yang digunakan saat login!",
        });
      }
      const donasi = await Donasi.create({
        nama,
        nomor_hp,
        email,
        nomor_rekening,
        original_value,
        formated_value,
        user_id,
      });
      res.status(201).json({ message: "Berhasil melakukan donasi", donasi });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Gagal melakukan donasi" });
    }
  },

  getDonasiById: async (req, res) => {
    try {
      const response = await Donasi.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (response) {
        res.json({ result: response });
      } else {
        res.status(404).json({ message: "Donasi tidak ditemukan" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Gagal mendapatkan donasi" });
    }
  },
  deleteDonasi: async (req, res) => {
    const { id } = req.params;
    try {
      const donasi = await Donasi.findByPk(id);
      if (!donasi) {
        return res.status(404).json({ message: "Donasi tidak ditemukan" });
      }
      await donasi.destroy();
      res.json({ message: "Berhasil menghapus donasi" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
};

export default donasiController;
