import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Container, Row} from 'react-bootstrap'
import {getMovies, reset} from '../features/movies/movieSlice'
import MovieItem from '../components/MovieCard'
import SpinnerLoading from '../components/SpinnerLoading'

function Profile() {

    const dispatch = useDispatch()
    const {movies, isLoading} = useSelector((state) => state.movies)

    useEffect(() => {
        dispatch(getMovies())
        return () => {dispatch(reset())}
      }, [dispatch])

    if (isLoading) {return <SpinnerLoading />}

    return (
        <>
        <Container className='movieslist'>
            <Row xs={1} md={3} className='g-4'>
                {movies.length > 0 ? (
                    <>
                    { movies.map((movie) => (<MovieItem key={movie._id} movie={movie} />)) }
                    </>
                    ) : (<p>No movies entered</p>)}
            </Row>
        </Container>
        </>
    )

}

export default Profile
