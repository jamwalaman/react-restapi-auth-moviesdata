import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {deleteMovie, reset} from '../features/movies/movieSlice'
import {Container, Row, Col} from 'react-bootstrap'
import { apiUrl } from '../global'

function MovieDetails() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isSuccess, isError, message} = useSelector((state) => state.movies)
    const [movie, setMovie] = useState({})
    const {id} = useParams()

    useEffect(() => {
        axios
        .get(`${apiUrl}/api/movies/${id}`)
        .then((res) => {setMovie(res.data)})
        .catch((err) => {console.log('Error from MovieDeatils')})
    }, [id])

    useEffect(() => {
        if(isSuccess) {navigate('/')}
        dispatch(reset())
    }, [isSuccess, navigate, dispatch] )

    const onDeleteClick = () =>{
        dispatch(deleteMovie(movie._id))
    }

    return (
        <>
        <Container>
            <Row>
                <Col md={8} className='m-auto'>
                <h3>{movie.title}</h3>
                <p>Directed by {movie.director}</p>
                <p>{movie.synopsis}</p>
                <button onClick={() => onDeleteClick()} className='button danger' >Delete</button>
                {isError && <p>{message}</p>}
                </Col>
            </Row>
        </Container>
        </>
    )

}

export default MovieDetails
