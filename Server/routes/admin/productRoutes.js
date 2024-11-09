const express = require('express');

const { handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct } = require('../../controllers/admin/productController');


const { upload } = require('../../others/cloudinary');
const router = express.Router();

router.post('/upload_image', upload.single('my_file'), handleImageUpload);
router.post('/add', addProduct);
router.get('/get', fetchAllProducts);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);
module.exports = router;