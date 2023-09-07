import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {register, reset} from '../features/auth/authSlice'

function Register() {

    const [formData, setFormData] = useState({ name:'', email: '', password:''})
    const {name, email, password} = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isSuccess || user) {
            navigate('/')
            dispatch(reset())
        }
    }, [user, isSuccess, message, navigate, dispatch])

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
        <h1>Register to add your fav movies</h1>
        <form onSubmit={onSubmit}>

            <div className='row mb-3'>
                <label htmlFor='username' className='col-sm-2 col-form-label'>Username</label>
                <div className='col-sm-10'>
                    <input
                        type='text'
                        className={ `form-control ${isError && JSON.parse(message).name ? 'is-invalid' : ''}` }
                        id='name'
                        name='name'
                        value={name}
                        aria-describedby='validationFeedbackName'
                        placeholder='Enter username'
                        onChange={onChange}
                    />
                    {isError && JSON.parse(message).name &&
                    (<div id='validationFeedbackName' className='invalid-feedback'>{JSON.parse(message).name.msg}</div>) }
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor='email' className='col-sm-2 col-form-label'>Email</label>
                <div className='col-sm-10'>
                    <input
                    type='email'
                    className={
                        `form-control ${isError && (JSON.parse(message).email || JSON.parse(message).regfail) ? 'is-invalid' : ''}` 
                    }
                    id='email'
                    name='email'
                    value={email}
                    aria-describedby='validationFeedbackEmail'
                    placeholder='Enter email'
                    onChange={onChange}
                    />
                    { isError && JSON.parse(message).email &&
                    (<div id='validationFeedbackEmail' className='invalid-feedback'>{JSON.parse(message).email.msg}</div>) }
                    {isError && JSON.parse(message).regfail &&
                    (<div id='validationFeedbackEmail' className='invalid-feedback'>{JSON.parse(message).regfail}</div>) }
                </div>
            </div>
            <div className='row mb-3'>
                <label htmlFor='password' className='col-sm-2 col-form-label'>Password</label>
                <div className='col-sm-10'>
                    <input
                    type='password'
                    className={ `form-control ${isError && JSON.parse(message).password ? 'is-invalid' : ''}` }
                    id='password'
                    name='password'
                    aria-describedby='validationFeedbackPassword'
                    value={password}
                    placeholder='Enter a password'
                    onChange={onChange}
                    />
                    {isError && JSON.parse(message).password &&
                    (<div id='validationFeedbackPassword' className='invalid-feedback'>{JSON.parse(message).password.msg}</div>) }
                </div>
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>

        </form>
        </>
    )

}

export default Register
