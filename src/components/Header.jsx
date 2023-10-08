import {useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {Container, Nav, Navbar} from 'react-bootstrap'
import NavLinksList from './NavLinksList'

function Header() {

	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	// Close the dropdown when the route changes on mobile
	useEffect(() => {setIsOpen(false)}, [location])
	const toggleDropdown = () => {setIsOpen(!isOpen)}

    return (
		<>
		{/* Dektop nav */}
		<Navbar expand='lg' className='navHeader mb-4'>
			<Container>

				<Link to='/' className='navbar-brand'>Fav Movies</Link>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<NavLinksList/>
					</Nav>
				</Navbar.Collapse>

			</Container>
		</Navbar>
		{/* Mobile nav */}
		<div className='mobile-nav-bg mb-4'>
			<div className='mobile-nav p-4'>
				<Link to='/' className='navbar-brand'>Fav Movies</Link>
				<button className='drop-toggle' onClick={toggleDropdown}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
						<path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
					</svg>
				</button>
				{isOpen && (
					<div className='drop-menu'>
					<Nav className='me-auto navbar-nav'>
						<NavLinksList/>
					</Nav>
					</div>
				)}
			</div>
		</div>
		</>	
    )
	
}

export default Header
