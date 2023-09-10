import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {login, reset} from '../features/auth/authSlice'
import {Container, Row, Col, Form} from 'react-bootstrap'

function Login() {

    const [formData, setFormData] = useState({ emailLogin: '', passwordLogin:''})
    const {emailLogin, passwordLogin} = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isSuccess || user) {
            dispatch(reset())
            navigate('/')
        }
    }, [user, isSuccess, message, navigate, dispatch])
   
    const onChange = (e) =>{
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const onSubmit = (e) =>{
        e.preventDefault()
        const userData = {emailLogin, passwordLogin}
        dispatch(login(userData))
    }

    return (
        <>

        <Container>
            <Row>
                <Col md={6} className='m-auto'>
                <h1>Login</h1>
                <Form onSubmit={onSubmit}>
                    <Form.Group className='mb-3' controlId='emailLogin'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            className={ `${isError && JSON.parse(message).emailLogin ? 'is-invalid' : ''}` }
                            aria-describedby='validationEmail'
                            type='email'
                            name='emailLogin'
                            value={emailLogin}
                            placeholder='Your email'
                            onChange={onChange}
                        />
                        {isError && JSON.parse(message).emailLogin &&
                        <Form.Control.Feedback id='validationEmail' type='invalid'>{JSON.parse(message).emailLogin.msg}</Form.Control.Feedback>}
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='passwordLogin'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            className={ `${isError && JSON.parse(message).passwordLogin ? 'is-invalid' : ''}` }
                            aria-describedby='validationPass'
                            type='password'
                            name='passwordLogin'
                            value={passwordLogin}
                            placeholder='Your password'
                            onChange={onChange}
                        />
                        {isError && JSON.parse(message).passwordLogin &&
                        <Form.Control.Feedback id='validationPass' type='invalid'>{JSON.parse(message).passwordLogin.msg}</Form.Control.Feedback>}
                    </Form.Group>
                    {isError && JSON.parse(message).authfail &&
                    <p type='invalid'>{JSON.parse(message).authfail}</p>}
                    <button type='submit' className='button'>Login</button>
                </Form>
                </Col>
            </Row>
        </Container>

        </>
    )

}

export default Login
