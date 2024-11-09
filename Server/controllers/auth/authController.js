const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// Register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// login\
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
      return res.json({ 
        success: false,
        message: "Invalid Password",
      });
    }

    // JWT payload includes both id and role
    const token = jwt.sign({ 
      id: checkUser._id, 
      role: checkUser.role  // Add the role here
    }, "CLIENT_SECRET_KEY", {
      expiresIn: "1d",  // Token expiration
    });

    // Set token in cookies for client-side access
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),  // 1 day expiry
    });

    res.status(200).json({  
      success: true,
      message: "User logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,  // Send the role back in the response
        id: checkUser._id,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false, 
      message: "Internal Server Error",
    });
  }
};

// logout
const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({
    success: true,
    message: "User logged out successfully",
  });
};


// authMiddleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware
};
