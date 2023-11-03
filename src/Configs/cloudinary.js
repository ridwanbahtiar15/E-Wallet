const cloudinary = require("cloudinary").v2;

const { cloudName, cloudKey, cloudSecret } = require("./environtment");

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudKey,
  api_secret: cloudSecret,
  secure: true,
});

module.exports = cloudinary;