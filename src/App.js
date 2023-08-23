import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './main.scss'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateMovieForm from './pages/CreateMovieForm'
import MovieDetails from './pages/MovieDetails'

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <Routes>
                  <Route path='/' element={<Profile/>} />
                  <Route path='/login' element={<Login/>} />
                  <Route path='/register' element={<Register/>} />
                  <Route path='/create-movie' element={<CreateMovieForm/>} />
                  <Route path='/movie/:id' element={<MovieDetails/>} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
