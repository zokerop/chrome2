// /models/Profile.js
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    about: { type: String },
    bio: { type: String },
    location: { type: String },
    followerCount: { type: Number },
    connectionCount: { type: Number }
});

module.exports = mongoose.model('Profile', ProfileSchema);
