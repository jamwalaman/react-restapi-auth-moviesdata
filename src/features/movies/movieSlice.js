import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import movieService from './movieService'

const initialState = {
  movies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  movieModified: false,
  movieID: false,
  alertMsg: false,
  message: ''
}

export const getMovies = createAsyncThunk('movies/getAll', async (_, thunkAPI) => {
  try {
    return await movieService.getMovies()
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getOneMovie = createAsyncThunk('movies/detail', async (id, thunkAPI) => {
  try {
    return await movieService.getOneMovie(id)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

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

export const updateMovie = createAsyncThunk('movies/update', async ({id, movieData}, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await movieService.updateMovie(id, movieData, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

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
      state.movies = []
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.movieModified = false
      state.message = ''
    },
    resetAlert: (state) => {
      state.alertMsg = false
      state.movieID = false
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getMovies.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getMovies.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.movies = action.payload
    })
    .addCase(getMovies.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(getOneMovie.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getOneMovie.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.movies = [action.payload]
    })
    .addCase(getOneMovie.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(createMovie.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createMovie.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.movieModified = true
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
      state.movieModified = true
      state.movies = state.movies.filter((movie) => movie._id !== action.payload.id)
      state.alertMsg = 'Movie deleted'
    })
    .addCase(deleteMovie.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(updateMovie.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateMovie.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.movieModified = true
      state.movies = action.payload
      state.alertMsg = 'Movie updated'
    })
    .addCase(updateMovie.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    })
  },

})

export const {reset, resetAlert} = movieSlice.actions
export default movieSlice.reducer
