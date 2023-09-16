import {useEffect, useState} from 'react'
import MovieItem from '../components/MovieCard'
import axios from 'axios'
import {Container, Row} from 'react-bootstrap'
import { apiUrl } from '../global'

function Profile() {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios
        .get(`${apiUrl}/api/movies`)
        .then((res) => {setMovies(res.data)})
        .catch((err) => {console.log('Error in showing movies list')})
    }, [])

    return (
        <>

        <Container className='movieslist'>
            <Row xs={1} md={3} className='g-4'>
                {movies.length > 0 ? (
                    <>
                    { movies.map((movie) => (<MovieItem key={movie._id} movie={movie} />)) }
                    </>
                    ) : (<p>No movies entered</p>)}
            </Row>
        </Container>

        </>
    )

}

export default Profile
