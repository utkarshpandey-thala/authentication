
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const Joi = require('joi');
require('dotenv').config();

const app = express();

// Import the User model
const userModel = require('./models/user'); // Adjust path as needed

// Middleware setup
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

// Validation schema
const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    age: Joi.number().integer().min(0).max(120).required()
});

// Routes
app.get('/', (req, res) => {
    res.render("index");
});

app.post('/create', async (req, res) => {
    const { error } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: 'Invalid input', details: error.details });
    }

    let { username, email, password, age } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let createdUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            age
        });

        res.cookie('user_id', createdUser._id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(201).json({
            message: "User created successfully!",
            user: {
                username: createdUser.username,
                email: createdUser.email,
                age: createdUser.age
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user', details: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

app.get("/login",function(req,res){
    res.render('login');

});

// app.post("/login",async function(req,res){
//     let user=await userModel.findOne({email:req.body.email});
//     console.log(user);
// })
app.post("/login", async function(req, res) {
    let user = await userModel.findOne({ email: req.body.email });

    if (user) {
        const match = await bcrypt.compare(req.body.password, user.password);

        if (match) {
            res.cookie('user_id', user._id.toString(), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            res.status(200).json({
                message: "Login successful!",
                user: {
                    username: user.username,
                    email: user.email,
                    age: user.age
                }
            });
        } else {
            res.status(401).json({ error: "Invalid password" });
        }
    } else {
        res.status(404).json({ error: "User not found" });
    }
});


app.get("/logout",function(req,res){
res.cookie("token","");
res.redirect("/");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
