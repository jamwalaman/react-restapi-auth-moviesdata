import {Link} from 'react-router-dom'

function MovieItem({movie}) {

    return (
        <div className="movie">
            <h2>{movie.title}</h2>
            <p>Directed by {movie.director}</p>
            <p>{movie.synopsis}</p>
            <p>{new Date(movie.createdAt).toLocaleString('en-US')}, {movie.username}</p>
			<Link to={`/movie/${movie._id}`} className='navbar-brand'>read more</Link>
        </div>
    )

}

export default MovieItem
