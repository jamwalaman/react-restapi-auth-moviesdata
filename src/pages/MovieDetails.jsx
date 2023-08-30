import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {deleteMovie, reset} from '../features/movies/movieSlice'

const apiurl = 'https://nodejs-restapi.up.railway.app/api/movies/'

function MovieDetails() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isSuccess} = useSelector((state) => state.movies)
    const [movie, setMovie] = useState({})
    const {id} = useParams()

    useEffect(() => {
        axios
        .get(`${apiurl}${id}`)
        .then((res) => {setMovie(res.data)})
        .catch((err) => {console.log('Error from MovieDeatils')})
    }, [id])

    useEffect(() => {
        if(isSuccess) {navigate('/')}
        dispatch(reset())
    }, [isSuccess, navigate, dispatch] )

    const onDeleteClick = () =>{
        dispatch(deleteMovie(movie._id))
    }

    return (
        <>
        <section>
        <h3>{movie.title}</h3>
        <p>Directed by {movie.director}</p>
        <p>{movie.synopsis}</p>
        <button onClick={() => onDeleteClick()} >Delete</button>
        </section>
        </>
    )

}

export default MovieDetails
