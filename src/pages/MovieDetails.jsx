import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {getOneMovie, deleteMovie} from '../features/movies/movieSlice'
import {Container, Row, Col, Button, Modal} from 'react-bootstrap'
import SpinnerLoading from '../components/SpinnerLoading'
const {DateTime} = require('luxon')

function MovieDetails() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const {isError, message, movies, movieModified, isLoading} = useSelector((state) => state.movies)
    const {user} = useSelector((state) => state.auth)
    const {id} = useParams()

    useEffect(() => {
        dispatch(getOneMovie(id))
    }, [dispatch, id])

    useEffect(() => {
        // Redirect user to home page, when movie is deleted successfully.
        if(movieModified) {navigate('/')}
    }, [movieModified, navigate] )

    if (isLoading) {return <SpinnerLoading />}

    return (
        <>
        {movies && movies.length > 0 &&
        <Container>
        <Row>
            <Col md={8} className='m-auto'>
            <h3>
                {movies[0].title} {movies[0].release_date &&
                    <span>({DateTime.fromISO(movies[0].release_date).toFormat('yyyy')})</span>
                }
            </h3>
            <p>Directed by {movies[0].director}</p>
            <p>{movies[0].synopsis}</p>
            
            {user && movies[0].user === user.userID && (
                <>
                <div className='d-flex'>
                    <Link to={`/update-movie/${movies[0]._id}`} className='button primary me-4'>Update</Link>
                    <Button className='button danger' onClick={handleShow}>Delete</Button>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton><Modal.Title>Delete movie</Modal.Title></Modal.Header>
                    <Modal.Body>Please confirm you want to delete the movie: {movies[0].title}</Modal.Body>
                    <Modal.Footer>
                        <Button className='button primary' onClick={handleClose}>Close</Button>
                        <Button className='button danger' onClick={() => dispatch(deleteMovie(movies[0]._id))}>Delete</Button>
                    </Modal.Footer>
                </Modal>
                </>
            )}
            {isError && <p>{message}</p>}
            </Col>
        </Row>
        </Container>
        }
        </>
    )

}

export default MovieDetails
