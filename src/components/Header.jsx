import {Link} from 'react-router-dom'

function Header() {
    return (
        <header>
            <Link to='/'>Fav Movies</Link>
            <ul>
                <li><Link to='/login'></Link>Login</li>
                <li><Link to='/register'></Link>Register</li>
            </ul>
        </header>
    )
}

export default Header
