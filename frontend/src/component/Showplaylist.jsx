import React, { useState } from 'react';
import { FaTrash, FaShareAlt } from 'react-icons/fa'; // Import the share icon
import '../css/Showlist.css';

const ShowPlaylist = ({ playlists, setPlaylist }) => {
    const [visiblePlaylistId, setVisiblePlaylistId] = useState(null);
    const [movieDetails, setMovieDetails] = useState({});

    const apikeyy = process.env.REACT_APP_API_KEY;

    // Fetching movies from API
    const fetchMovieDetails = async (imdbID) => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apikeyy}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching movie details:', error);
            return null;
        }
    };

    // Delete the Playlist using delete icon
    const deletePlaylist = async (playlistId) => {
        try {
            const response = await fetch(`https://movie-library-backend2.onrender.com/playlist/${playlistId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPlaylist(playlists.filter((playlist) => playlist._id !== playlistId));
            } else {
                console.error('Failed to delete playlist');
            }
        } catch (error) {
            console.error('Error deleting playlist:', error);
        }
    };

    // Delete the specific movie from the playlist
    const deleteMovie = async (playlistId, imdbID) => {
        try {
            const response = await fetch(`https://movie-library-backend2.onrender.com/playlist/${playlistId}/movies/${imdbID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPlaylist(playlists.map(playlist => {
                    if (playlist._id === playlistId) {
                        return { ...playlist, movies: playlist.movies.filter(movieId => movieId !== imdbID) };
                    }
                    return playlist;
                }));
            } else {
                console.error('Failed to delete movie');
            }
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    // Implementing show and hide playlist feature
    const togglePlaylistVisibility = async (playlistId) => {
        if (visiblePlaylistId === playlistId) {
            setVisiblePlaylistId(null);
        } else {
            setVisiblePlaylistId(playlistId);

            const playlist = playlists.find((p) => p._id === playlistId);
            if (playlist) {
                const details = await Promise.all(
                    playlist.movies.map(async (imdbID) => {
                        if (!movieDetails[imdbID]) {
                            const movieDetail = await fetchMovieDetails(imdbID);
                            return { imdbID, ...movieDetail };
                        }
                        return movieDetails[imdbID];
                    })
                );

                const newMovieDetails = details.reduce((acc, detail) => {
                    acc[detail.imdbID] = detail;
                    return acc;
                }, {});

                setMovieDetails((prevDetails) => ({
                    ...prevDetails,
                    ...newMovieDetails,
                }));
            }
        }
    };

    // Handle Share Playlist Click
    const handleShareClick = (playlistId) => {
        const playlistUrl = `${window.location.origin}/playlist/${playlistId}`;
        navigator.clipboard.writeText(playlistUrl).then(() => {
            alert('Playlist link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy link:', err);
        });
    };

    

    return (
        <div className="playlist-container">
            <p className='headdshow'>TRENDING PLAYLISTS</p>
            {playlists.map((playlist) => (
                <div key={playlist._id} className="playlist">
                    <div className="playlist-header">
                        <h3 className='head033'>{playlist.title}</h3>
                        <div className="icon-group">
                            <FaTrash className="trash-icon" onClick={() => deletePlaylist(playlist._id)} />
                            <FaShareAlt className="share-icon" onClick={() => handleShareClick(playlist._id)} />
                        </div>
                    </div>
                    
                    <button onClick={() => togglePlaylistVisibility(playlist._id)} className='togglebtn'>
                        {visiblePlaylistId === playlist._id ? 'Hide Playlist' : 'Show Playlist'}
                    </button>
                    <hr/>
                    {visiblePlaylistId === playlist._id && (
                        <div className="movie-list">
                            {playlist.movies.length === 0 ? (
                                <p>This playlist is empty</p>
                            ) : (
                                playlist.movies.map((imdbID, index) => (
                                    <div key={index} className="movie wrapper">
                                        {movieDetails[imdbID] ? (
                                            <div className="movie-card box">
                                                <img src={movieDetails[imdbID].Poster} alt={movieDetails[imdbID].Title} />
                                                <p>{movieDetails[imdbID].Title}</p>
                                                <p>{movieDetails[imdbID].Year}</p>
                                                <button className="dell" onClick={() => deleteMovie(playlist._id, imdbID)}>Delete</button>
                                            </div>
                                        ) : (
                                            <p style={{color:'purple'}}>Loading....</p>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ShowPlaylist;
