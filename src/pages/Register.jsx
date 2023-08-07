import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'

function Register() {

    const [formData, setFormData] = useState({ name:'', email: '', password:'', confirm_pass:''})
    const {name, email, password, confirm_pass} = formData
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
        if(password !== confirm_pass) {
            toast.error('Passwords do not match')
        } else {
            const userData = {name, email, password}
            dispatch(register(userData))
        }
    }

    return (
        <>
        <h1>Register to add your fav movies</h1>
        <form onSubmit={onSubmit}>
            <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={name}
                placeholder='Enter username'
                onChange={onChange}
            />
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
            <input
                type='password'
                className='form-control'
                id='confirm_pass'
                name='confirm_pass'
                value={confirm_pass}
                placeholder='Confirm password'
                onChange={onChange}
            />
            <button className="submit">Submit</button>
        </form>
        </>
    )

}

export default Register
