import React, { useState } from 'react';
import '../css/Movies.css';
import Navbar from './Navbar';
import Dialog from './Dialog'; 

//shoowing movies fetched from API
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
            <div className='heroo_section'>
                <div className="movie_result_list">
                    {movies.map((movie) => (
                        <div key={movie.imdbID} className="details_list">
                            <h2>{movie.Title}</h2>
                            <p><strong>Year:</strong> {movie.Year}</p>
                            <p><strong>Type:</strong> {movie.Type}</p>
                            <div className='poster_container'>
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
