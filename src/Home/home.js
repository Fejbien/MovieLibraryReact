import { useEffect, useState, useRef } from "react";
import "./home.css";
import { apiKey } from "../config.js";

function MovieCard({id, title, year, poster, handleClick}){
    return (
    <div className="movieCard" onClick={ () => {handleClick(id);}}>
        <h1>{title}</h1>
        <h2>{year}</h2>
        <img src={poster} alt={title}/>
    </div>);
}

function MoviesSearched( {movies, handleClick} ) {
    return (
    <div className="moviesList">
        {
            movies?.map((movie, id) => { 
                return <MovieCard handleClick={handleClick} key={id} id={id} title={movie.Title} year={movie.Year} poster={movie.Poster} />;
            })
        }
    </div>);
}

function SearchMovie({ OnSubmit, Ref }) {
    return (
        <form className="searchForm" onSubmit={OnSubmit}>
            <input
                ref={Ref}
                className="searchBar"
                type="text"
                placeholder="Search movie..."
            />
            <input className="searchButton" type="submit" value="Search" />
        </form>);
}

function HomePage({addFavorite}) {
    const [moviesList, setMoviesList] = useState([]);
    const [search, setSearch] = useState("");
    const inputRef = useRef('');
    

    const OnMovieSearch = (e) => {
        e.preventDefault();

        let searchedTitle = String(inputRef.current.value);
        if(searchedTitle.length > 0)
            setSearch(searchedTitle);
    }

    useEffect(() => {
        function fetchMovies() {
            fetch(`https://www.omdbapi.com/?s=${search}&apikey=${apiKey}`)
                .then(r => r.json())
                .then(json => setMoviesList(json['Search']));
        }

        fetchMovies();
    }, [search]);

    function handleCardClick(id){
        addFavorite(moviesList[id]);
    }


    return (
        <div className="home">
            <SearchMovie OnSubmit={OnMovieSearch} Ref={inputRef} />
            <MoviesSearched movies={moviesList} handleClick={handleCardClick}/>
        </div>);
}

export default HomePage;