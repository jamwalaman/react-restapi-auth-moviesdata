import axios from 'axios'

const API_URL = 'https://nodejs-restapi.up.railway.app/api/movies/'

const createMovie = async (movieData, token) => {
    const config = {
        headers: {Authorization: `Bearer ${token}`,},
    }
    const response = await axios.post(API_URL, movieData, config)
    return response.data
}

const getMovies = async () => {
    const response = await axios.get(API_URL)
    return response.data
}

const deleteMovie = async (movieId, token) => {
    const config = {
        headers: {Authorization: `Bearer ${token}`,},
    }
    const response = await axios.delete(API_URL + movieId, config)
    return response.data
}

const movieService = {createMovie, getMovies, deleteMovie}
export default movieService
