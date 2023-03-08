import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const { name, email, password, password2 } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
  }, [user, isError, isSuccess, message, navigate, dispatch])

  // Handle OnChange
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle onSubmit
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(formData)
    if (password !== password2) {
      toast.error('Password does not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
    }
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <div>
        <section className='heading'>
          <h1>
            <FaUser /> Register
          </h1>
          <p>Please create an account. </p>
        </section>
        <section className='form'>
          <form action='' onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='text'
                name='name'
                id='name'
                value={name}
                className='form-control'
                onChange={handleChange}
                placeholder='Enter Name'
              />
            </div>
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
                placeholder='Create Password'
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                name='password2'
                id='password2'
                value={password2}
                className='form-control'
                onChange={handleChange}
                placeholder='Confirm Password'
              />
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-block'>
                Register
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}

export default Register
