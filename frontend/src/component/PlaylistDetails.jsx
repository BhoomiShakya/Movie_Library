import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PlaylistDetails = () => {
    const { id } = useParams(); // Get playlist ID from URL
    const [playlist, setPlaylist] = useState(null);
    const [movieDetails, setMovieDetails] = useState({});

    useEffect(() => {
        const fetchPlaylistDetails = async () => {
            try {
                const response = await fetch(`https://movie-library-backend2.onrender.com/playlist/${id}`);
                const data = await response.json();
                setPlaylist(data);

                const details = await Promise.all(
                    data.movies.map(async (imdbID) => {
                        const movieResponse = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${process.env.REACT_APP_API_KEY}`);
                        const movieData = await movieResponse.json();
                        return { imdbID, ...movieData };
                    })
                );

                const newMovieDetails = details.reduce((acc, detail) => {
                    acc[detail.imdbID] = detail;
                    return acc;
                }, {});

                setMovieDetails(newMovieDetails);

            } catch (error) {
                console.error('Error fetching playlist details:', error);
            }
        };

        fetchPlaylistDetails();
    }, [id]);

    if (!playlist) return <p>Loading...</p>;

    return (
        <div>
            <h1>{playlist.title}</h1>
            <div>
                {playlist.movies.length === 0 ? (
                    <p>This playlist is empty</p>
                ) : (
                    playlist.movies.map((imdbID, index) => (
                        <div key={index}>
                            {movieDetails[imdbID] ? (
                                <div>
                                    <img src={movieDetails[imdbID].Poster} alt={movieDetails[imdbID].Title} />
                                    <p>{movieDetails[imdbID].Title}</p>
                                    <p>{movieDetails[imdbID].Year}</p>
                                </div>
                            ) : (
                                <p>Loading movie details...</p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PlaylistDetails;
