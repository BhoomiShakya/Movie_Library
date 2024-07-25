import React, { useState } from 'react';
import '../css/Movies.css';
import Navbar from './Navbar';
// import { Link } from 'react-router-dom';
import Dialog from './Dialog'; // Create this component

function Movies({ movies , setUserIsLoggedIn}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleAddClick = (movie) => {
        setSelectedMovie(movie);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedMovie(null);
    };

    return (
        <div>
            <Navbar setUserIsLoggedIn={setUserIsLoggedIn}/>
            <div className='heroo'>
                <div className="movie-list">
                    {movies.map((movie) => (
                        <div key={movie.imdbID} className="movie-details">
                            <h2>{movie.Title}</h2>
                            <p><strong>Year:</strong> {movie.Year}</p>
                            <p><strong>Type:</strong> {movie.Type}</p>
                            <div className='posterdiv'>
                                {movie.Poster !== "N/A" && <img src={movie.Poster} alt={movie.Title} />}
                            </div>
                            <button className="add-button" onClick={() => handleAddClick(movie)}>+</button>
                        </div>
                    ))}
                </div>
            </div>
            {isDialogOpen && <Dialog movie={selectedMovie} onClose={handleCloseDialog} />}
        </div>
    );
}

export default Movies;
