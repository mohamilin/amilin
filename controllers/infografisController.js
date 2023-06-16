import Infografis from "../models/infografisModel.js";
import path from "path";
import fs from "fs";
import uploadImage from "../middleware/cloudinary.js";

export const infografisController = {
  getInfografis: async (req, res) => {
    try {
      const response = await Infografis.findAll();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Gagal mendapatkan infografis" });
    }
  },
  getInfografisById: async (req, res) => {
    try {
      const response = await Infografis.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (response) {
        res.json({ result: response });
      } else {
        res.status(404).json({ message: "Infografis tidak ditemukan" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Gagal mendapatkan infografis" });
    }
  },
  createInfografis: async (req, res) => {
    if (req.files === null)
      return res.status(400).json({ message: "Masukkan file gambar" });
    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.lenght;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res
        .status(422)
        .json({ message: "Harap masukkan file berupa jpeg|jpg|png" });
    if (fileSize > 5000000)
      return res.status(422).json({ message: "Ukuran gambar maksimal 5 MB" });

      console.log({
        name,
file,
fileSize,
ext,
fileName
      });
    file.mv(`tmp/images/${fileName}`, async (error) => {
      const urlImage = await uploadImage(`tmp/images/${fileName}`, "environ");
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      try {
        const newInfografis = await Infografis.create({
          judul: name,
          gambar: fileName,
          url: urlImage,
        });
        res.status(201).json({
          success: true,
          message: "Berhasil membuat infografis",
          result: newInfografis,
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    });
  },
  updateInfografis: async (req, res) => {
    const infografis = await Infografis.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!infografis)
      return res.status(404).json({ message: "Data Tidak Ditemukan" });

    let fileName = "";
    if (req.file === null) {
      fileName = Infografis.gambar;
    } else {
      const file = req.files.file;
      const fileSize = file.data.lenght;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase()))
        return res
          .status(422)
          .json({ message: "Harap masukkan file berupa jpeg|jpg|png" });
      if (fileSize > 5000000)
        return res.status(422).json({ message: "Ukuran gambar maksimal 5 MB" });

      const filepath = `./tmp/images/${infografis.gambar}`;
      fs.unlinkSync(filepath);

      file.mv(`./tmp/images/${fileName}`, (error) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
      });
    }
    const name = req.body.title;
    const urlImage = await uploadImage(`./tmp/images/${fileName}`, "environ");
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
      await Infografis.update(
        { judul: name, gambar: fileName, url: urlImage },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({
        message: "Berhasil melakukan update infografis",
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteInfografis: async (req, res) => {
    const infografis = await Infografis.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!infografis)
      return res.status(404).json({ message: "Data Tidak Ditemukan" });
    try {
      const filepath = `./assets/images/${infografis.gambar}`;
      fs.unlinkSync(filepath);
      await Infografis.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: "Berhasil Menghapus Donasi" });
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default infografisController;
