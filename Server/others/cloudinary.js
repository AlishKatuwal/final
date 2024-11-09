const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: 'ddihuqtgh',
  api_key: 881551647748615,
  api_secret: '57lShwD1sbD174vFExbBe3d7FMM',
});

const storage = new multer.memoryStorage(); 

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto", 
  });
  return result;
}
const upload = multer({ storage });  

module.exports = { imageUploadUtil, upload };
