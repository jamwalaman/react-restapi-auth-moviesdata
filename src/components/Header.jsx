import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

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

		<Navbar expand='lg' className='bg-body-tertiary'>
			<Container>

				<Navbar.Brand href='#home'>Fav Movies</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Link to='/' className='nav-link'>Home</Link>
						{user ? (
							<>
							<Link to='/create-movie' className='nav-link'>Create Movie</Link>
							<Navbar.Text>Hi {user && user.name}</Navbar.Text>
							<button onClick={onLogout}>Logout</button>
							</>
						) : (
							<>
							<Link to='/login' className='nav-link'>Login</Link>
							<Link to='/register' className='nav-link'>Register</Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>

			</Container>
		</Navbar>

    )
}

export default Header
