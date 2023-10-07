import axios from 'axios'
import { apiUrl } from '../../global'

const createMovie = async (movieData, token) => {
    const config = {
        headers: {Authorization: `Bearer ${token}`,},
    }
    const response = await axios.post(`${apiUrl}/api/movies`, movieData, config)
    return response.data
}

const getOneMovie = async (movieId) => {
    const response = await axios.get(`${apiUrl}/api/movies/${movieId}`)
    return response.data
}

const getMovies = async () => {
    const response = await axios.get(`${apiUrl}/api/movies`)
    return response.data
}

const updateMovie = async (movieId, movieData, token) => {
    const config = {
        headers: {Authorization: `Bearer ${token}`,},
    }
    const response = await axios.put(`${apiUrl}/api/movies/${movieId}`, movieData, config)
    return response.data
}

const deleteMovie = async (movieId, token) => {
    const config = {
        headers: {Authorization: `Bearer ${token}`,},
    }
    const response = await axios.delete(`${apiUrl}/api/movies/${movieId}`, config)
    return response.data
}

const movieService = {createMovie, getOneMovie, getMovies, updateMovie, deleteMovie}
export default movieService
