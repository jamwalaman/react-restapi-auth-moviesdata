import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "@fontsource/open-sans"
import './main.scss'
import Header from './components/Header'
import AlertMsgUser from './components/AlertMsgUser'
import AlertMsgMovie from './components/AlertMsgMovie'
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
          <AlertMsgUser />
          <AlertMsgMovie />
            <Routes>
              <Route path='/' element={<Profile/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/create-movie' element={<CreateMovieForm/>} />
              <Route path='/movie/:id' element={<MovieDetails/>} />
            </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
