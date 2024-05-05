const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
            trim: true
        },
        email: {
            type: String,
           required: [true, 'Please enter your email'],
            trim: true
        },
        age: {
            type: Number,
          required: [true, 'Please enter your age'],
            trim: true
        },
    
    },
    {
        timestamps: true,
    }
    

);

const User = mongoose.model('users', userSchema);

module.exports = User;
