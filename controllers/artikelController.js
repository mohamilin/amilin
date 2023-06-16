import Artikels from "../models/artikelModel.js";
import path from "path";
import fs from "fs";
import uploadImage from "../middleware/cloudinary.js";
// import { JSON } from "sequelize";
// import { json } from "body-parser";

export const ArtikelsController = {
  getArtikels: async (req, res) => {
    try {
      let response = await Artikels.findAll();
      let result = [];
      for (const item of response) {
        let container = {};
        container.id = item.id;
        container.titleArticle = item.titleArticle;
        container.descArticle = item.descArticle;
        container.category = item.category;
        container.hashtag = JSON.parse(
          JSON.parse(JSON.stringify(item.hashtag))
        );
        container.author = item.author;
        container.date = item.date;
        container.image = item.image;
        container.url = item.url;
        container.desc1 = item.desc1;
        container.desc2 = item.desc2;
        container.desc3 = item.desc3;
        container.desc4 = item.desc4;
        container.desc5 = item.desc5;
        container.desc6 = item.desc6;
        container.desc7 = item.desc7;
        container.desc8 = item.desc8;
        container.desc9 = item.desc9;
        container.desc10 = item.desc10;

        result.push(container);
      }
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Gagal mendapatkan Artikel" });
    }
  },

  getArtikelsById: async (req, res) => {
    try {
      const response = await Artikels.findOne({
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
        res.status(404).json({ message: "Artikel tidak ditemukan" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Gagal mendapatkan Aksi" });
    }
  },

  createArtikels: async (req, res) => {
    console.log("ini req body", req.body);
    if (req.files === null)
      return res.status(400).json({ message: "Masukkan file gambar" });
    const titleArticle = req.body.titleArticle;
    const descArticle = req.body.descArticle;
    const category = req.body.category;
    let hashtag = req.body.hashtag;
    hashtag = JSON.parse(hashtag);
    const author = req.body.author;
    const date = req.body.date;
    const file = req.files.image;
    // console.log(req.files);
    const fileSize = file.data.length;
    // console.log("ini", fileSize);
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    console.log(req.url);
    const allowedType = [".png", ".jpg", ".jpeg"];
    const desc1 = req.body.desc1;
    const desc2 = req.body.desc2;
    const desc3 = req.body.desc3;
    const desc4 = req.body.desc4;
    const desc5 = req.body.desc5;
    const desc6 = req.body.desc6;
    const desc7 = req.body.desc7;
    const desc8 = req.body.desc8;
    const desc9 = req.body.desc9;
    const desc10 = req.body.desc10;

    if (!allowedType.includes(ext.toLowerCase()))
      return res
        .status(422)
        .json({ message: "Harap masukkan file berupa jpeg|jpg|png" });
    if (fileSize > 5000000)
      return res.status(422).json({ message: "Ukuran gambar maksimal 5 MB" });

    file.mv(`./tmp/images/${fileName}`, async (error) => {
      const urlImage = await uploadImage(`./tmp/images/${fileName}`, "environ");
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      try {
        const newArtikels = await Artikels.create({
          titleArticle: titleArticle,
          descArticle: descArticle,
          category: category,
          hashtag: JSON.stringify(hashtag),
          author: author,
          date: date,
          image: fileName,
          url: urlImage,
          desc1: desc1,
          desc2: desc2,
          desc3: desc3,
          desc4: desc4,
          desc5: desc5,
          desc6: desc6,
          desc7: desc7,
          desc8: desc8,
          desc9: desc9,
          desc10: desc10,
        });
        res.status(201).json({
          success: true,
          message: "Berhasil membuat artikel",
          result: newArtikels,
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    });
  },

  updateArtikels: async (req, res) => {
    const artikel = await Artikels.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!artikel)
      return res.status(404).json({ message: "Data Tidak Ditemukan" });

    let fileName = "";
    if (req.file === null) {
      fileName = Artikels.gambar;
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
    const titleArticle = req.body.titleArticle;
    const descArticle = req.body.descArticle;
    const category = req.body.category;
    const hashtag = req.body.hashtag;
    const author = req.body.author;
    const date = req.body.date;
    const desc1 = req.body.desc1;
    const desc2 = req.body.desc2;
    const desc3 = req.body.desc3;
    const desc4 = req.body.desc4;
    const desc5 = req.body.desc5;
    const desc6 = req.body.desc6;
    const desc7 = req.body.desc7;
    const desc8 = req.body.desc8;
    const desc9 = req.body.desc9;
    const desc10 = req.body.desc10;
    const urlImage = await uploadImage(`./tmp/images/${fileName}`, "environ");
    try {
      await Artikels.update(
        {
          titleArticle: titleArticle,
          descArticle: descArticle,
          category: category,
          hashtag: hashtag,
          author: author,
          date: date,
          image: fileName,
          url: urlImage,
          desc1: desc1,
          desc2: desc2,
          desc3: desc3,
          desc4: desc4,
          desc5: desc5,
          desc6: desc6,
          desc7: desc7,
          desc8: desc8,
          desc9: desc9,
          desc10: desc10,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({
        message: "Berhasil melakukan update Artikel",
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteArtikels: async (req, res) => {
    try {
      const artikel = await Artikels.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!artikel) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }

      const filepath = `./tmp/images/${artikel.image}`;
      console.log(artikel.image);
      fs.unlinkSync(filepath);

      await artikel.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.status(200).json({ message: "Berhasil menghapus Artikel" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default ArtikelsController;
