import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signin } from '../services/user.service'

const SigninPage = (props) => {
  // state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const onSignin = async () => {
    if (username.length === 0) {
      alert('set username')
    } else if (password.length === 0) {
      alert('set password')
    } else {
      const result = await signin(username, password)
      if (result) {
        const { token } = result

        // localStorage
        // sessionStorage
        sessionStorage['token'] = token
        sessionStorage['username'] = username

        // redirect to task list
        navigate('/task-list')
      } else {
        alert('invalid username or password')
      }
    }
  }

  return (
    <div>
      <h1 className="header">Signin</h1>
      <div className="form">
        <div class="mb-3">
          <label class="form-label">Username</label>
          <input
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            type="text"
            class="form-control"
          />{' '}
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="password"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <div>
            Don't have an account ? Signup <Link to="/signup">here</Link>
          </div>
          <button onClick={onSignin} className="btn btn-success">
            Signin
          </button>
        </div>
      </div>
    </div>
  )
}

export default SigninPage
