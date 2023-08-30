import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {createMovie, reset} from '../features/movies/movieSlice'

function CreateMovieForm() {

    const [formData, setFormData] = useState({ title:'', director: '', synopsis:''})
    const {title, director, synopsis} = formData
    const {isSuccess, isError, message} = useSelector((state) => state.movies)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(isError) {console.log(message)}
        if(isSuccess) {navigate('/')}
        dispatch(reset())
    }, [isError, message, isSuccess, navigate, dispatch] )
    
    const onChange = (e) =>{
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    const onSubmit = e => {
        e.preventDefault()
        dispatch(createMovie({title, director, synopsis}))
    }

    return (
        <form onSubmit={onSubmit}>
            <input type='text' name='title' id='title' value={title} placeholder='Title' onChange={onChange} />
            <input type='text' name='director' id='director' value={director} placeholder='Director' onChange={onChange} />
            <input type='text' name='synopsis' id='synopsis' value={synopsis} placeholder='Synopsis' onChange={onChange} />
            <button type='submit'>Add Movie</button>
        </form>
    )

}

export default CreateMovieForm
