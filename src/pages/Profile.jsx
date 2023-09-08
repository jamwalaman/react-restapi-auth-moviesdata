import {useEffect, useState} from 'react'
import MovieItem from '../components/MovieItem'
import axios from 'axios'

function Profile() {

    const apiurl = 'https://nodejs-restapi.up.railway.app/api/movies/'
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios
        .get(apiurl)
        .then((res) => {setMovies(res.data)})
        .catch((err) => {console.log('Error in showing movies list')})
    }, [])

    return (
        <>
        
        <div className='continer'>
            <div className='row'>
                <div className='col-md-8 m-auto'>
                    {movies.length > 0 ? (
                        <div>
                            {movies.map( (movie) => (
                            <MovieItem key={movie._id} movie={movie} />
                            ))}
                        </div>
                        ) : (<p>No movies entered</p>)}
                </div>
            </div>
        </div>
        </>
    )

}

export default Profile
