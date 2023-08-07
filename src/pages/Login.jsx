import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'

function Login() {

    const [formData, setFormData] = useState({ email: '', password:''})
    const {email, password} = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {toast.error(message)}
        if(isSuccess || user) {navigate('/')}
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])
    
    const onChange = (e) =>{
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const onSubmit = (e) =>{
        e.preventDefault()
        const userData = {email, password}
        dispatch(login(userData))
    }

    return (
        <>
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
            <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={email}
                placeholder='Enter email'
                onChange={onChange}
            />
            <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={password}
                placeholder='Enter a password'
                onChange={onChange}
            />
            <button className="submit">Submit</button>
        </form>
        </>
    )

}

export default Login
