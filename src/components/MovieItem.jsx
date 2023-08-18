function MovieItem({movie}) {

    return (
        <div className="movie">
            <h2>{movie.title}</h2>
            <p>Directed by {movie.director}</p>
            <p>{movie.synopsis}</p>
            <p>{new Date(movie.createdAt).toLocaleString('en-US')}, {movie.username}</p>
        </div>
    )

}

export default MovieItem
