const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Profile = require('./models/Profile');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/linkedinProfiles', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.post('/api/profiles', async (req, res) => {
    try {
        const profiles = await Profile.insertMany(req.body);
        res.status(201).json(profiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/profiles', async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
