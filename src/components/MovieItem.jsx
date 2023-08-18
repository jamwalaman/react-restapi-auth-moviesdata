import {useDispatch} from 'react-redux'
import {deleteMovie} from '../features/movies/movieSlice'

function MovieItem({movie}) {
    const dispatch = useDispatch()

    return (
        <div className="movie">
            <h2>{movie.title}</h2>
            <p>Directed by {movie.director}</p>
            <p>{movie.synopsis}</p>
            <p>{new Date(movie.createdAt).toLocaleString('en-US')}, {movie.username}</p>
            <button onClick={() => dispatch(deleteMovie(movie._id))} >Delete</button>
        </div>
    )

}

export default MovieItem
