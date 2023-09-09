import {Link} from 'react-router-dom'
import {Col, Card} from 'react-bootstrap'
const { DateTime } = require('luxon')

function MovieCard({movie}) {

    return (
        <>
        <Col>
            <Card className='h-100'>
                <Card.Body>
                    <Card.Title><Link to={`/movie/${movie._id}`}>{movie.title}</Link></Card.Title>
                    <Card.Text>Directed by {movie.director}</Card.Text>
                    <Card.Text>{movie.synopsis}</Card.Text>
                    <Card.Text>Added by {movie.username} | {DateTime.fromISO(movie.createdAt).toFormat('dd MMM yyyy, T')}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
        </>
    )

}

export default MovieCard
