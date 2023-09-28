import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {deleteMovie} from '../features/movies/movieSlice'
import {Container, Row, Col, Button, Modal} from 'react-bootstrap'
import { apiUrl } from '../global'

function MovieDetails() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const {isError, message, movieDeleted} = useSelector((state) => state.movies)
    const [movie, setMovie] = useState({})
    const {user} = useSelector((state) => state.auth)
    const {id} = useParams()

    useEffect(() => {
        axios
        .get(`${apiUrl}/api/movies/${id}`)
        .then((res) => {setMovie(res.data)})
        .catch((err) => {console.log('Error from MovieDeatils')})
    }, [id])

    // Redirect user to home page, when movie is deleted successfully.
    useEffect(() => {
        if(movieDeleted) {navigate('/')}
    }, [movieDeleted, navigate] )

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
                
                {user && movie.user === user.userID && (
                    <>
                    <Button className='button danger' onClick={handleShow}>Delete</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton><Modal.Title>Delete movie</Modal.Title></Modal.Header>
                        <Modal.Body>Please confirm you want to delete the movie: {movie.title}</Modal.Body>
                        <Modal.Footer>
                            <Button className='button primary' onClick={handleClose}>Close</Button>
                            <Button className='button danger' onClick={() => onDeleteClick()}>Delete</Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                )}
                {isError && <p>{message}</p>}
                </Col>
            </Row>
        </Container>
        </>
    )

}

export default MovieDetails
