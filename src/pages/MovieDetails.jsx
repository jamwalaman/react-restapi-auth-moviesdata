import axios from 'axios'
import {useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {deleteMovie} from '../features/movies/movieSlice'

function MovieDetails() {

    const dispatch = useDispatch()

    const [movie, setMovie] = useState({})
    const {id} = useParams()

    useEffect(() => {
        axios
        .get(`https://nodejs-restapi.up.railway.app/api/movies/${id}`)
        .then((res) => {
            setMovie(res.data)
        })
        .catch((err) => {
            console.log('Error from MovieDeatils')
        })
    }, [id])

    return (
        <>
        <section>
        <h3>{movie.title}</h3>
        <p>Directed by {movie.director}</p>
        <p>{movie.synopsis}</p>
        <button onClick={() => dispatch(deleteMovie(movie._id))} >Delete</button>
        </section>
        </>
    )

}

export default MovieDetails
