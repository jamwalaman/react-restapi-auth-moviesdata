import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

function NavLinksList() {

	const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
      }

    return (
        <>
        <Link to='/' className='nav-link'>Home</Link>
		{user ? (
			<>
			<Link to='/create-movie' className='nav-link'>Create Movie</Link>
			<Button variant='link' onClick={onLogout}>{`Logout (${user && user.name})`}</Button>
			</>
		) : (
			<>
			<Link to='/login' className='nav-link'>Login</Link>
			<Link to='/register' className='nav-link'>Register</Link>
			</>
			)}
        </>
    )

}

export default NavLinksList
