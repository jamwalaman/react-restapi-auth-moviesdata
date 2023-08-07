import {userState} from 'react'

function Login() {

    const [formData, setFormData] = userState({ email: '', password:''})
    const {email, password} = formData
    
    const onChange = (e) =>{
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const onSubmit = (e) =>{e.preventDefault()}

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
