import React from 'react'

const LoginForm = (props) => {
  return(
    <div>
      <h2>Login to application</h2>
      <form onSubmit={props.handleSubmit}>
        <div>
        username:
          <input
            type="text"
            value={props.username}
            name="Username"
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
        password:
          <input
            type="password"
            value={props.password}
            name="Password"
            onChange={props.handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm