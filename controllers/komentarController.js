import Komentar from "../models/komentarModel.js";
import User from "../models/userModel.js";
import artikel from "../models/artikelModel.js";

export const komentarController = {
  getKomentar: async (req, res) => {
    try {
      const response = await Komentar.findAll();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Gagal mendapatkan komentar" });
    }
  },
  createKomentar: async (req, res) => {
    const { name, email, komentar } = req.body;
    const article_id = req.query.artikelId;

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
    const artikels = await artikel.findByPk(article_id);
    if (!artikels) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }
    try {
      const newKomentar = await Komentar.create({
        article_id,
        user_id,
        name,
        email,
        komentar,
      });
      res.status(201).json({
        success: true,
        message: "Berhasil menambahkan komentar",
        result: newKomentar,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  updateKomentar: async (req, res) => {
    const { id } = req.params;
    const { komentar } = req.body;

    const user_id = req.user.id;
    const user = await User.findByPk(user_id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Anda harus login terlebih dahulu" });
    }
    try {
      const comment = await Komentar.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: "Komentar tidak ditemukan" });
      }
      console.log("user_id:", user_id);
      console.log(comment.user_id);
      if (comment.user_id !== user_id) {
        return res.status(403).json({
          message: "Unauthorized: Anda tidak dapat melakukan update",
        });
      }
      if (komentar) {
        comment.komentar = komentar;
      }
      await comment.save();
      res.json({
        message: "Berhasil mengubah komentar",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  deleteKomentar: async (req, res) => {
    const { id } = req.params;

    const user_id = req.user.id;
    const user = await User.findByPk(user_id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Anda harus login terlebih dahulu" });
    }
    try {
      const comment = await Komentar.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: "Komentar tidak ditemukan" });
      }
      console.log("user_id:", user_id);
      console.log(comment.user_id);
      if (comment.user_id !== user_id) {
        return res.status(403).json({
          message: "Unauthorized: Anda tidak dapat melakukan update",
        });
      }
      await comment.destroy();
      res.json({ message: "Berhasil menghapus komentar" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
  getKomentarByArtikel: async (req, res) => {
    try {
      const { artikelId } = req.params;
      const komentar = await Komentar.findAll({
        where: { article_id: artikelId },
        // include: { model: User },
      });
      res.status(200).json({
        message: "Berhasil melihat semua komentar",
        result: komentar,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Gagal mendapatkan komentar" });
    }
  },
};

export default komentarController;
