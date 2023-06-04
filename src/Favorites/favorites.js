import "./favorites.css";

function MovieCard({id, title, year, poster, handleClick}){
    return (
    <div className="movieCard" onClick={ () => {handleClick(id);}}>
        <h1>{title}</h1>
        <h2>{year}</h2>
        <img src={poster} alt={title}/>
    </div>);
}

function FavoriteMoviesList( {movies, handleClick} ) {
    return (
    <div className="moviesList">
        {
            movies?.map((movie, id) => { 
                return <MovieCard handleClick={handleClick} key={id} id={id} title={movie.Title} year={movie.Year} poster={movie.Poster} />;
            })
        }
    </div>);
}

function FavoritesPage({favorites, rmFavorite}){

    function handleClick(id){
        rmFavorite(id);
    }

    return (
    <div className="fav">
        <FavoriteMoviesList movies={favorites} handleClick={handleClick}/>
    </div>
    );
}

export default FavoritesPage;