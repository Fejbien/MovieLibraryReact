import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useState, useEffect } from 'react';

import HomePage from "./Home/home";
import FavoritesPage from "./Favorites/favorites";

function Menu() {
  return (
    <div className='menu'>
      <ul>
        <li><Link to='/'>Home page</Link></li>
        <li><Link to='/favorites'>Favorites</Link></li>
      </ul>
    </div>);
}

function App() {
  const [favoritesMovies, setFavoritesMovies] = useState([]);

  useEffect(() => {
    function setMovies(){
      let val = localStorage.getItem('movies');
      if(val != null)
        setFavoritesMovies(JSON.parse(val));
    }

    setMovies();
  }, []);

  useEffect(()=>{
    function save(){
      if(favoritesMovies.length > 0)
        localStorage.setItem('movies', JSON.stringify(favoritesMovies))
      console.log(localStorage.getItem('movies'));
    }

    save();
  },[favoritesMovies]);

  function addFavorite(movie){
    console.log(movie['Title']);
    setFavoritesMovies( (prevMovies) => [...prevMovies, movie]);
  }

  function removeFavorite(movieId){
    setFavoritesMovies(favoritesMovies.filter((item, id)=>id !== movieId))
  }


  return (
    <div className='background'>
      <Router>
        <Menu />
        <div className='main'>
          <Routes>
            <Route path='/' element={<HomePage addFavorite={addFavorite} />} />
            <Route path='/favorites' element={<FavoritesPage favorites={favoritesMovies} rmFavorite={removeFavorite} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
