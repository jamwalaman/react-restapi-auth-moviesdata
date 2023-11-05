import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {register} from '../features/auth/authSlice'
import {Container, Row, Col, Form} from 'react-bootstrap'

function Register() {

    const [formData, setFormData] = useState({ name:'', email: '', password:''})
    const {name, email, password} = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isSuccess || user) {navigate('/')}
    }, [user, isSuccess, navigate])

    const onChange = (e) =>{
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const onSubmit = (e) =>{
        e.preventDefault()
        const userData = {name, email, password}
        dispatch(register(userData))
    }

    return (
        <>

        <Container>
            <Row>
                <Col md={6} className='m-auto'>
                <h1>Register to add your fav movies</h1>

                    <Form onSubmit={onSubmit} noValidate>
                        <Form.Group className='mb-3' controlId='username'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='text'
                                className={`${isError && JSON.parse(message).name ? 'is-invalid' : ''}`}
                                name='name'
                                value={name}
                                aria-describedby='validationName'
                                placeholder='Enter username'
                                onChange={onChange}
                            />
                            {isError && JSON.parse(message).name &&
                            <Form.Control.Feedback id='validationName' type='invalid'>{JSON.parse(message).name.msg}</Form.Control.Feedback>}
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='email'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                className={ `${isError && (JSON.parse(message).email || JSON.parse(message).regfail) ? 'is-invalid' : ''}` }
                                aria-describedby='validationEmail'
                                type='email'
                                name='email'
                                value={email}
                                placeholder='Enter email'
                                onChange={onChange}
                            />
                            {isError && JSON.parse(message).email &&
                            <Form.Control.Feedback id='validationEmail' type='invalid'>{JSON.parse(message).email.msg}</Form.Control.Feedback>}
                            {isError && JSON.parse(message).regfail &&
                            <Form.Control.Feedback id='validationEmail' type='invalid'>{JSON.parse(message).regfail}</Form.Control.Feedback>}
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                className={ `${isError && JSON.parse(message).password ? 'is-invalid' : ''}` }
                                aria-describedby='validationPass'
                                type='password'
                                name='password'
                                value={password}
                                placeholder='Enter password'
                                onChange={onChange}
                            />
                            {isError && JSON.parse(message).password &&
                            <Form.Control.Feedback id='validationPass' type='invalid'>{JSON.parse(message).password.msg}</Form.Control.Feedback>}
                        </Form.Group>
                        <button type='submit' className='button primary'>Register</button>
                    </Form>

                </Col>
            </Row>
        </Container>

        </>
    )

}

export default Register
