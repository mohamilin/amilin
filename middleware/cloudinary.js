import dotenv from "dotenv";
dotenv.config();

import cloudinary from "cloudinary";

cloudinary.v2;

if (process.env.NODE_ENV !== "production") {
  cloudinary.config({
    cloud_name: "da6ubexbe",
    api_key: "865754111252757",
    api_secret: "STvrp4tv3gNIneej_RqkZZWIW-A",
    secure: true,
  });
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

const uploadImage = async (image, subFolder) => {
  const dataUpload = await cloudinary.uploader
    .upload(`${image}`, { folder: subFolder }, function (error, result) {
      if (error) throw new InvariantError("Gagal Upload");
    })
    .then(async (res) => {
      return res.secure_url;
    })
    .catch((error) => {
      console.log(error, "uploadImage");
    });

  return dataUpload;
};

// module.exports = uploadImage;
export default uploadImage;
