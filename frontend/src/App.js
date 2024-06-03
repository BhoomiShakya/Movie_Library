import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';
import Movies from './component/Movies';
import { useState } from 'react';

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
