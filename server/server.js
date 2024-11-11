const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import user model
const User = require('./User');

const app = express();

app.use(express.json());
app.use(cors());

// Explicitly specify the path
require('dotenv').config({ path: './.env' });

// Get the connection string from the environment variables
const mongoConnectionString = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoConnectionString)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log("Faild to connect to MongoDB ", err);
});

// API routes for create user
app.post('/api/users', async(req, res) => {
    try {
        const newUser = new User(req.body);
        const result = await newUser.save();
        res.status(201).json({message: "User saved successfully", data: result});
    } catch (error) {
        res.status(400).json({ error: "Internal Server Error" + error });
    }
});

// API routes for get all users
app.get('/api/users', async(req, res) => {
    try {
        const users = await User.find();
        res.json({message: "Users fetched successfully", data: users});
    } catch (error) {
        res.status(400).json({ error: "Internal Server Error" + error });
    }
});

// Listen to port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

