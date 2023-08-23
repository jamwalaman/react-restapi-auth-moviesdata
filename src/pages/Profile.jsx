import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import MovieItem from '../components/MovieItem'
import {getMovies, reset} from '../features/movies/movieSlice'

function Profile() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const {movies, isError, message} = useSelector((state) => state.movies)

    useEffect(() => {
        if (isError) {console.log(message)}
        dispatch(getMovies())
        return () => {dispatch(reset())}
    }, [user, navigate, isError, message, dispatch])

    return (
        <>
        
        <section>
            {movies.length > 0 ? (
            <div>
                {movies.map( (movie) => (
                <MovieItem key={movie._id} movie={movie} />
                ))}
            </div>
            ) : (
            <p>No movies entered</p>
            )}
        </section>
        </>
    )

}

export default Profile
