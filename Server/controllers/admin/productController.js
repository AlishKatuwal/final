const { imageUploadUtil } = require("../../others/cloudinary");
const Product = require("../../models/productModel");

// Handle image upload
const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);
    res.json({
      success: true,
      message: "Image uploaded successfully",
      url: result.url, 
    });
  } catch (e) {
    console.error("Error occurred while uploading image:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred while uploading image",
      error: e.message,
    });
  }
};

// Adding Product
const addProduct = async (req, res) => {
  try {

    if (!title || !description || !price || !size || !color || !Brand) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const newProduct = new Product({
      title,
      description,
      price,
      size,
      color,
      brand,
      image,
    });
    await newProduct.save();
    res.status(200).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });

    // ... rest of your code ...
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while adding product",
    });
  }
};

// Fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      message: 'Products Fetched Successfully',
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Error Occurred',
    });
  }
};

// Edit Product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title, description, price, size, color, Brand } = req.body;
    const findProduct = await Product.findById(id);

    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product Not Found',
      });
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.price = price || findProduct.price;
    findProduct.size = size || findProduct.size;
    findProduct.color = color || findProduct.color;
    findProduct.brand = Brand || findProduct.brand;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      message: 'Product Updated Successfully',
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Error Occurred',
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product Not Found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product Deleted Successfully',
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Error Occurred',
    });
  }
};

module.exports = { handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct };
