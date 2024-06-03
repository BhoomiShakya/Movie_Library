import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import SearchBox from './SearchBox';
import ShowPlaylist from './Showplaylist';
import '../css/Home.css'

function HomePage({ setMovies , setUserIsLoggedIn, userIsLoggedIn}) {
    const [playlist, setPlaylist] = useState([]);
    useEffect(() => {
        setUserIsLoggedIn(localStorage.getItem('token') !== null);
    }, []);

    const fetchPlaylists = async () => {
        try {
            const res = await fetch('https://movie-library-backend2.onrender.com/playlist/get');
            if (res.ok) {
                const data = await res.json();
                setPlaylist(data.data); 
                // Update existingPlaylists state with fetched data
            } else {
                throw new Error('Failed to fetch playlists');
            }
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    };

    useEffect(() => {
        fetchPlaylists(); 
    }, []);

    return (
        <>   
            <Navbar setUserIsLoggedIn={setUserIsLoggedIn} />
            <div className='hero'>
                <SearchBox setMovies={setMovies} />
            </div>
            <div>
                <div className='lowbg'>
                    {userIsLoggedIn && <ShowPlaylist playlists={playlist} setPlaylist={setPlaylist} />}
                </div>
            </div>        
        </>
    );
}

export default HomePage;
