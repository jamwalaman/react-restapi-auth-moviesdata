import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {createMovie, reset} from '../features/movies/movieSlice'
import {Container, Row, Col, Form} from 'react-bootstrap'

function CreateMovieForm() {

    const [formData, setFormData] = useState({ title:'', director: '', synopsis:''})
    const {title, director, synopsis} = formData
    const {isSuccess, isError, message, movieID} = useSelector((state) => state.movies)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(isSuccess) {
            navigate(`/movie/${movieID}`)
            dispatch(reset())
        }
    }, [isSuccess, movieID, navigate, dispatch] )
    
    const onChange = (e) =>{
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const onSubmit = e => {
        e.preventDefault()
        dispatch(createMovie({title, director, synopsis}))
    }

    return (
        <>
        <Container>
            <Row>
                <Col md={6} className='m-auto'>
                    <h1>Create your fav movie</h1>

                    <Form onSubmit={onSubmit}>
                        <Form.Group className='mb-3' controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                            className= { `${isError && JSON.parse(message).title ? 'is-invalid' : ''}` }
                            type='text'
                            name='title'
                            value={title}
                            aria-describedby='validationTitle'
                            placeholder='Enter movie title'
                            onChange={onChange}
                            />
                            {isError && JSON.parse(message).title &&
                            <Form.Control.Feedback id='validationTitle' type='invalid'>{JSON.parse(message).title.msg}</Form.Control.Feedback>}
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='director'>
                            <Form.Label>Director</Form.Label>
                            <Form.Control
                            className= { `${isError && JSON.parse(message).director ? 'is-invalid' : ''}` }
                            type='text'
                            name='director'
                            value={director}
                            aria-describedby='validationTitle'
                            placeholder='Enter movie director'
                            onChange={onChange}
                            />
                            {isError && JSON.parse(message).director &&
                            <Form.Control.Feedback id='validationTitle' type='invalid'>{JSON.parse(message).director.msg}</Form.Control.Feedback>}
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='synopsis'>
                            <Form.Label>Plot synopsis</Form.Label>
                            <Form.Control
                            className= { `${isError && JSON.parse(message).synopsis ? 'is-invalid' : ''}` }
                            as="textarea"
                            name='synopsis'
                            value={synopsis}
                            aria-describedby='validationTitle'
                            placeholder='Enter plot synopsis'
                            rows={3}
                            onChange={onChange}
                            />
                            {isError && JSON.parse(message).synopsis &&
                            <Form.Control.Feedback id='validationTitle' type='invalid'>{JSON.parse(message).synopsis.msg}</Form.Control.Feedback>}
                        </Form.Group>
                        <button type='submit' className='button primary'>Add</button>
                    </Form>

                </Col>
            </Row>
        </Container>
        </>
    )

}

export default CreateMovieForm
