import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {getOneMovie, updateMovie, reset} from '../features/movies/movieSlice'
import {Container, Row, Col, Form} from 'react-bootstrap'

function UpdateMovieForm() {

    const {movieModified, movies} = useSelector((state) => state.movies)
    const [formData, setFormData] = useState({ title:'', director: '', synopsis:'' })
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOneMovie(id))
    }, [dispatch, id])

    useEffect(() => {
        if (movies && movies.length > 0) {
            setFormData({title: movies[0].title, director: movies[0].director, synopsis: movies[0].synopsis})
        }
        if(movieModified) {
            navigate(`/movie/${id}`)
            dispatch(reset())
        }
    }, [movieModified, id, navigate, dispatch, movies] )
    
    const onChange = e => { setFormData({ ...formData, [e.target.name]: e.target.value }) }

    const onSubmit = e => {
        e.preventDefault()
        dispatch(updateMovie({id, movieData: formData}))
    }

    return (
        <>
        <Container>
            <Row>
                <Col md={6} className='m-auto'>
                    <h1>Update movie</h1>

                    <Form onSubmit={onSubmit}>
                        <Form.Group className='mb-3' controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                            type='text'
                            name='title'
                            value={formData.title}
                            aria-describedby='validationTitle'
                            placeholder='Enter movie title'
                            onChange={onChange}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='director'>
                            <Form.Label>Director</Form.Label>
                            <Form.Control
                            type='text'
                            name='director'
                            value={formData.director}
                            aria-describedby='validationTitle'
                            placeholder='Enter movie director'
                            onChange={onChange}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='synopsis'>
                            <Form.Label>Plot synopsis</Form.Label>
                            <Form.Control
                            as="textarea"
                            name='synopsis'
                            value={formData.synopsis}
                            aria-describedby='validationTitle'
                            placeholder='Enter plot synopsis'
                            rows={5}
                            onChange={onChange}
                            />
                        </Form.Group>
                        <div className='d-flex'>
                            <button type='submit' className='button primary me-4'>Update</button>
                            <Link to={`/movie/${id}`} className='button secondary'>Go back</Link>
                        </div>
                    </Form>

                </Col>
            </Row>
        </Container>
        </>
    )

}

export default UpdateMovieForm
