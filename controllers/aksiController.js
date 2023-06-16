import Aksi from "../models/aksiModel.js";
import path from "path";
import fs from "fs";
import uploadImage from "../middleware/cloudinary.js";

export const aksiController = {
  getAksi: async (req, res) => {
    try {
      const response = await Aksi.findAll();
      let result = [];
      for (const item of response) {
        let container = {};
        container.id = item.id;
        container.title = item.title;
        container.numberofsupport = item.numberofsupport;
        container.target = item.target;
        container.hashtag = JSON.parse(
          JSON.parse(JSON.stringify(item.hashtag))
        );
        container.date = item.date;
        container.image = item.image;
        container.url = item.url;
        container.desc = item.desc;
        container.desc1 = item.desc1;
        container.desc2 = item.desc2;
        container.teks = item.teks;
        result.push(container);
      }
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Gagal mendapatkan Aksi" });
    }
  },
  getIAksiById: async (req, res) => {
    try {
      const response = await Aksi.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (response) {
        response.hashtag = JSON.parse(
          JSON.parse(JSON.stringify(response.hashtag))
        );
        res.json({ result: response });
      } else {
        console.log(error);
        res.status(404).json({ message: "Aksi tidak ditemukan" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Gagal menemukan Aksi" });
    }
  },

  createAksi: async (req, res) => {
    if (req.files === null)
      return res.status(400).json({ message: "Masukkan file gambar" });
    const file = req.files.image;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/aksi/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];
    const title = req.body.title;
    const desc = req.body.desc;
    const desc1 = req.body.desc1;
    const desc2 = req.body.desc2;
    const teks = req.body.teks;
    const numberofsupport = req.body.numberofsupport;
    const target = req.body.target;
    let hashtag = req.body.hashtag;
    hashtag = JSON.parse(hashtag);

    if (!allowedType.includes(ext.toLowerCase()))
      return res
        .status(422)
        .json({ message: "Harap masukkan file berupa jpeg|jpg|png|" });
    if (fileSize > 5000000)
      return res.status(422).json({ message: "Ukuran gambar masksimal 5 MB" });

    file.mv(`./tmp/images/${fileName}`, async (error) => {
      const urlImage = await uploadImage(`./tmp/images/${fileName}`, "environ");
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      try {
        const newAksi = await Aksi.create({
          image: fileName,
          url: urlImage,
          title: title,
          hashtag: JSON.stringify(hashtag),
          desc: desc,
          desc1: desc1,
          desc2: desc2,
          teks: teks,
          numberofsupport: numberofsupport,
          target: target,
        });
        res.status(201).json({
          success: true,
          message: "Berhasil membuat aksi",
          result: newAksi,
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    });
  },
  updateAksi: async (req, res) => {
    const aksi = await Aksi.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!aksi) return res.status(404).json({ message: "Data tidak ditemukan" });

    let fileName = "";
    if (req.file === null) {
      fileName = Aksi.gambar;
    } else {
      const file = req.files.image;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase()))
        return res
          .status(422)
          .json({ message: "Harap masukkan file berupa jpeg|jpg|png" });
      if (fileSize > 5000000)
        return res.status(422).json({ message: "Ukuran gambar maksimal 5 MB" });

      const filepath = `./tmp/images/${fileName}`;
      fs.unlinkSync(filepath);

      file.mv(`./tmp/images/${fileName}`, (error) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
      });
    }
    const {
      numberofsupport,
      target,
      title,
      hashtag,
      desc,
      desc1,
      desc2,
      teks,
    } = req.body;
    const url = `${req.protocol}://${req.get("host")}/aksi/${fileName}`;
    const urlImage = await uploadImage(`./tmp/images/${fileName}`, "environ");
    try {
      await Aksi.update(
        {
          image: fileName,
          url: urlImage,
          title: title,
          hashtag: hashtag,
          desc: desc,
          desc1: desc1,
          desc2: desc2,
          teks: teks,
          numberofsupport: numberofsupport,
          target: target,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({
        message: "Berhasil melakukan update aksi",
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteAksi: async (req, res) => {
    const aksi = await Aksi.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!aksi) return res.status(404).json({ message: "Data tidak ditemukan" });
    try {
      const filepath = `./public/aksi/${fileName}`;
      fs.unlinkSync(filepath);
      await Aksi.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: "Berhasil menghapus Aksi" });
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default aksiController;
