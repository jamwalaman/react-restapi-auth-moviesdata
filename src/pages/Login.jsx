import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {login, reset} from '../features/auth/authSlice'

function Login() {

    const [formData, setFormData] = useState({ email: '', password:''})
    const {email, password} = formData
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
        const userData = {email, password}
        dispatch(login(userData))
    }

    return (
        <>
        <h1>Login</h1>
        <form onSubmit={onSubmit}>

            <div className='row mb-3'>
                <label htmlFor='email' className='col-sm-2 col-form-label'>Email</label>
                <div className='col-sm-10'>
                    <input
                    type='email'
                    className={ `form-control ${isError && JSON.parse(message).email ? 'is-invalid' : ''}` }
                    id='email'
                    aria-describedby='validationFeedbackEmail'
                    name='email'
                    value={email}
                    placeholder='Enter email'
                    onChange={onChange}
                    />
                    { isError && JSON.parse(message).email && (<div id='validationFeedbackEmail' className='invalid-feedback'>{JSON.parse(message).email.msg}</div>) }
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
                    value={password}
                    placeholder='Enter password'
                    onChange={onChange}
                    />
                    { isError && JSON.parse(message).password && (<div id='validationFeedbackEmail' className='invalid-feedback'>{JSON.parse(message).password.msg}</div>) }
                </div>
            </div>
            { isError && JSON.parse(message).authfail && (<p>{JSON.parse(message).authfail}</p>) }
            <button type='submit' className='btn btn-primary'>Submit</button>

        </form>
        </>
    )

}

export default Login
