import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "@fontsource/open-sans"
import './main.scss'
import Header from './components/Header'
import AlertMsgUser from './components/AlertMsgUser'
import AlertMsgMovie from './components/AlertMsgMovie'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import MovieDetails from './pages/MovieDetails'
import CreateMovieForm from './pages/CreateMovieForm'
import UpdateMovieForm from './pages/UpdateMovieForm'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Router>
        <div className="App content">
          <Header />
          <AlertMsgUser />
          <AlertMsgMovie />
            <Routes>
              <Route path='/' element={<Profile/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/movie/:id' element={<MovieDetails/>} />
              <Route path='/create-movie' element={<CreateMovieForm/>} />
              <Route path='/update-movie/:id' element={<UpdateMovieForm/>} />
            </Routes>
            <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
