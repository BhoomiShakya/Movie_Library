import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import SearchBox from './SearchBox';
import ShowPlaylist from './Showplaylist';
import '../css/Home.css';
import Carousel_movie from './Carousel_movie';
// import img1 from '../images/image01.jpg';
import img1 from '../images/image03.jpeg'

function HomePage({ setMovies, setUserIsLoggedIn, userIsLoggedIn }) {
  const [playlist, setPlaylist] = useState([]);
//   const [movies, setMoviesData] = useState([
//     {
//       image: img1,
//       title: 'Movie 1',
//       description: 'Description of Movie 1',
//     },
//     {
//       image: 'https://path/to/movie2.jpg',
//       title: 'Movie 2',
//       description: 'Description of Movie 2',
//     },
//     {
//       image: 'https://path/to/movie3.jpg',
//       title: 'Movie 3',
//       description: 'Description of Movie 3',
//     },
//     {
//       image: 'https://path/to/movie4.jpg',
//       title: 'Movie 4',
//       description: 'Description of Movie 4',
//     },
//     {
//       image: 'https://path/to/movie5.jpg',
//       title: 'Movie 5',
//       description: 'Description of Movie 5',
//     },
//   ]);

  useEffect(() => {
    setUserIsLoggedIn(localStorage.getItem('token') !== null);
  }, [setUserIsLoggedIn]);

  const fetchPlaylists = async () => {
    try {
      const res = await fetch('https://movie-library-backend2.onrender.com/playlist/get');
      if (res.ok) {
        const data = await res.json();
        setPlaylist(data.data);
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
      <div className='carousell'>
        <Carousel_movie/>
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
