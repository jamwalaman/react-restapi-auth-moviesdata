import axios from 'axios'
import { apiUrl } from '../../global'

const register = async (userData) => {
  const response = await axios.post(`${apiUrl}/api/users`, userData)
  if (response.data) { localStorage.setItem('user', JSON.stringify(response.data)) }
  return response.data
}

const login = async (userData) => {
  const response = await axios.post(`${apiUrl}/api/users/login`, userData)
  if (response.data) {localStorage.setItem('user', JSON.stringify(response.data))}

  return response.data
}

const logout = () => {localStorage.removeItem('user')}

const authService = {register, logout, login}

export default authService
