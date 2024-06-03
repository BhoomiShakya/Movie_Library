const mongoose = require('mongoose');

//Playlist Schema
const PlaylistSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true,
    },
    movies: [{
        type : String,
        required: true,
    }]
});

// Create the Playlist model
const Playlist = mongoose.model('Playlist', PlaylistSchema);
module.exports = Playlist;
