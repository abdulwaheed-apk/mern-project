import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
// import {}

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  )
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, dispatch, navigate])

  // Handle Change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(formData)
    dispatch(login(formData))
  }
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div>
        <section className='heading'>
          <h1>
            <FaSignInAlt /> Login
          </h1>
          <p>Please login to manage exercises. </p>
        </section>
        <section className='form'>
          <form action='' onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='email'
                name='email'
                id='email'
                value={email}
                className='form-control'
                onChange={handleChange}
                placeholder='Enter Email'
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                name='password'
                id='password'
                value={password}
                className='form-control'
                onChange={handleChange}
                placeholder='Enter Password'
              />
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-block'>
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}

export default Login
