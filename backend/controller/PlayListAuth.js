const Playlist = require('../models/PlayList');
const Get = async (req, res) => {
    try {
        const playlist = await Playlist.find({});
        res.status(201).json({
            data: playlist,
        });
    } catch (error) {
        console.error("Error during fetching playlists:", error);
    }
};

const Update = async (req, res) => {
    const playlistId = req.params.id;
    const newMovie = req.body; 
    // New playlist data with updated movies array
    console.log("PlayList Id: ", playlistId);
    console.log("New Movie: ", newMovie);
    console.log("IMDb ID: ", newMovie.imdbID);

    try {
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        if (playlist.movies.includes(newMovie.imdbID)) {
            console.log("Movie already exists in the playlist");
            return res.status(400).json({ message: 'Movie already exists in the playlist' });
        }
        // Update the playlist's movies array with the new data
        playlist.movies.push(newMovie.imdbID);
        // Save the updated playlist to the database
        const updatedPlaylist = await playlist.save();

        res.json(updatedPlaylist); // Return the updated playlist as the response
    } catch (error) {
        console.error('Error updating playlist:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
// Add
const Create = async (req, res) => {
    try {
        let playlist = req.body;
        console.log(playlist);
        if (!playlist.title) {
            console.log("Title is missing");
        }
        const existing = await Playlist.findOne({ title: playlist.title });
        if (existing) {
            console.log("Error: Playlist with the same name already exists");
            return res.status(400).json({ message: "Playlist with the same name already exists" });
        }

        const newPlaylist = new Playlist({
            title: playlist.title,
        });
        await newPlaylist.save();

        res.status(201).json({ message: "Playlist created Successfully" });

    } catch (error) {
        console.error("Error during adding a new playlist:", error);
    }
};

// Remove
const Delete = async (req, res) => {
    const playlistId = req.params.id;
    try {
        const playlist = await Playlist.findByIdAndDelete(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        res.status(200).json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        console.error("Error during deleting the playlist:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const GetById = async (req, res) => {
    try {
        const {id}=req.params;
        console.log(id);
        const playlist = await Playlist.find({});
        // console.log(playlist);
        res.status(201).json({
            data: playlist,
        });
    } catch (error) {
        console.error("Error during fetching playlists:", error);
    }
};

const DeleteMovieById = async (req, res) => {
    const { playlistId, imdbID } = req.params;
    try {
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        // Remove the movie with the given imdbID from the playlist
        playlist.movies = playlist.movies.filter(movieId => movieId !== imdbID);

        // Save the updated playlist
        const updatedPlaylist = await playlist.save();

        res.status(200).json(updatedPlaylist);
    } catch (error) {
        console.error('Error deleting movie from playlist:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { Create, Delete, Get, Update ,GetById, DeleteMovieById};
