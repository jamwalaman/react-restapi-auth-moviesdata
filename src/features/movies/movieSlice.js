import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import movieService from './movieService'

const initialState = {
  movies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  movieID: '',
  alertMsg: ''
}

export const createMovie = createAsyncThunk('movies/create', async (movieData, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token
      return await movieService.createMovie(movieData, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const deleteMovie = createAsyncThunk('movies/delete', async (id, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token
      return await movieService.deleteMovie(id, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const movieSlice = createSlice({

  name: 'movie',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createMovie.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createMovie.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.movies.push(action.payload)
      state.movieID = action.payload._id
      state.alertMsg = 'Movie created'
    })
    .addCase(createMovie.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(deleteMovie.pending, (state) => {
      state.isLoading = true
    })
    .addCase(deleteMovie.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.movies = state.movies.filter((movie) => movie._id !== action.payload.id)
      state.alertMsg = 'Movie deleted'
    })
    .addCase(deleteMovie.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
  },

})

export const { reset } = movieSlice.actions
export default movieSlice.reducer
