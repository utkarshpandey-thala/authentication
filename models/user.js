const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/authtestapp')
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Database connection error:', err));

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 6 
    },
    age: { 
        type: Number, 
        min: 0 
    }
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
