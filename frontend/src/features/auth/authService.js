import axios from 'axios'

const API_URL = '/api/users/'
// Register
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  //** axios put res coming from server to an object called data in response(in our case response, can be any name serverData or values etc) and we can access as response.data */
  // console.log(response.data)
  if (response.data) {
    // Set User to Local storage
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}
// Login
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data) {
    localStorage.setItem('user', userData)
  }
  return response.data
}
// Logout
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}
export default authService
