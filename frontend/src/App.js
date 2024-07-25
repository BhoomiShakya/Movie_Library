import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';
import Movies from './component/Movies';
import { useState } from 'react';
import Carousel_movie from './component/Carousel_movie';

function App() {
  const [movies, setMovies]= useState([])
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(localStorage.getItem('token')!==null);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home setMovies={setMovies} setUserIsLoggedIn={setUserIsLoggedIn} userIsLoggedIn={userIsLoggedIn}/>}></Route>
          <Route path='/login' exact element={<Login />}></Route>
          <Route path='/Signup' exact element={<Signup/>}></Route>
          <Route path="/movies" exact element={<Movies movies={movies} setUserIsLoggedIn={setUserIsLoggedIn}/>} ></Route>
          <Route path='/slider' exact element={<Carousel_movie/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
