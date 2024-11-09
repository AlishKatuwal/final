const express = require('express');
const { registerUser, loginUser, logoutUser, authMiddleware } = require('../../controllers/auth/authController');
const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser); 

// logout
router.post("/logout", logoutUser);

// auth middleware
router.get("/checkAuth", authMiddleware, (req, res) =>{
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "User Authenticated successfully",
        user,
    });
})

module.exports = router;
