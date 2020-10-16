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
            id="username"
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
        password:
          <input
            type="password"
            value={props.password}
            name="Password"
            id="password"
            onChange={props.handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm