import React, { useState, useRef, useEffect } from 'react'
import login from './services/login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggle from './components/Toggle'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')

  const blogFromRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const removeBlog = async (blog) => {
    if (window.confirm(`Do you want to remove blog "${blog.title}" by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setStatus('success')
        setStatusMessage(`removed blog titled: "${blog.title}" `)
        setTimeout(() => {
          setStatus(null)
          setStatusMessage(null)
        }, 5000)
      } catch (error) {
        setStatus('error')
        setStatusMessage(`error: ${error.response.data.error}`)
      }
    }
  }

  const addBlog = async (blogObject) => {
    try {
      const returned = await blogService.create(blogObject)
      setBlogs(blogs.concat(returned))
      blogFromRef.current.toggleVisibility()
      setStatus('success')
      setStatusMessage(`created new blog titled: "${returned.title}" `)
      setTimeout(() => {
        setStatus(null)
        setStatusMessage(null)
      }, 5000)
    } catch (error) {
      setStatus('error')
      setStatusMessage(`error: ${error.response.data.error}`)
      setTimeout(() => {
        setStatus(null)
        setStatusMessage(null)
      }, 5000)
    }
  }

  const addLike = async (blog) => {
    const updatedBlog = { ...blog, likes: ++blog.likes }
    await blogService.update(blog.id, updatedBlog)
    const updatedBlogs = blogs.map(b => b.id !== blog.id ? b : updatedBlog)
    setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setStatus('success')
      setStatusMessage(`logged in as ${user.name}`)
      setTimeout(() => {
        setStatus(null)
        setStatusMessage(null)
      }, 5000)
    } catch (error) {
      setStatus('error')
      setStatusMessage('wrong credentials')
      setTimeout(() => {
        setStatus(null)
        setStatusMessage(null)
      }, 5000)
    }
    // console.log('logging in with', username, password)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
    setStatus('success')
    setStatusMessage('Logged out')
    setTimeout(() => {
      setStatus(null)
      setStatusMessage(null)
    }, 5000)
  }

  // const blogForm = () => (
  //   <form onSubmit={addBlog}>
  //     <div>
  //     <h2>create new blog</h2>
  //     <div>title:<input type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)}></input></div>
  //     <div>author:<input type="text" name="author" value={author} onChange={({ target }) => setAuthor(target.value)}></input></div>
  //     <div>url:<input type="text" name="url" value={url} onChange={({ target }) => setUrl(target.value)}></input></div>
  //     <button type="submit">create</button>
  //     </div>
  //   </form>
  // )


  return (
    <div>
      <Notification message={statusMessage} status={status} />
      { user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />  :
        <div>
          <h2>blogs</h2>
          <p>Logged in as {user.name} <button id='button-logout' onClick={handleLogout}>Logout</button></p>
          <Toggle buttonLabel1='new blog' ref={blogFromRef}>
            <BlogForm createBlog={addBlog} />
          </Toggle>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} addLike={addLike} removeBlog={removeBlog} />
          )}
        </div>
      }

    </div>
  )
}

export default App