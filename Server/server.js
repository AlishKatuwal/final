const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/authRoutes'); 
const productRouter = require('./routes/admin/productRoutes'); 

mongoose.connect('mongodb+srv://ssasori609:AlishK2000@cluster0.ioom1.mongodb.net/')
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma', 'Expires'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Set up routes
app.use('/api/auth', authRouter);
app.use('/api/admin/product', productRouter); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
