import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
      }

    return (
        <header>
			<nav className='navbar navbar-expand-lg bg-body-tertiary'>
				<div className='container'>

					<Link to='/' className='navbar-brand'>Fav Movies</Link>
					<button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse'>
						<div className='navbar-nav'>
							{user ? (
								<>
								<button onClick={onLogout}>Logout</button>
								<Link to='/create-movie' className='nav-link'>Create Movie</Link>
								</>
								) : (
								<>
								<Link to='/' className='nav-link'>Home</Link>
								<Link to='/login' className='nav-link'>Login</Link>
								<Link to='/register' className='nav-link'>Register</Link>
								<Link to='/create-movie' className='nav-link'>Create Movie</Link>
								</>
								)}
						</div>
					</div>		
						
				</div>
			</nav>

        </header>
    )

}

export default Header
