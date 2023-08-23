import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createMovie, reset} from '../features/movies/movieSlice'

function CreateMovieForm() {

    const [formData, setFormData] = useState({ title:'', director: '', synopsis:''})
    const {title, director, synopsis} = formData
    const dispatch = useDispatch()
    const {isError, message} = useSelector((state) => state.movies)

    useEffect(() => {
        if (isError) {console.log(message)}
        return () => {dispatch(reset())}
    }, [isError, message, dispatch])

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
