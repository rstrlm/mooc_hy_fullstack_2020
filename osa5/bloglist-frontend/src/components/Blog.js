import React, { useState } from 'react'

const Blog = ({ blog, user, removeBlog, addLike }) => {
  const [visible, setVisible] = useState(true)
  const hideShow = { display: visible ? 'none' : '' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const remove = (event) => {
    event.preventDefault()
    removeBlog(blog)
  }
  const like = (event) => {
    event.preventDefault()
    addLike(blog)
  }

  const button = visible ? 'show' : 'hide'
  const ifUser = (user.id === blog.user.id || user.id === blog.user) ? true : false
  return (
    <div className='blogStyle'>
      <div><p>Title: {blog.title}</p> <p> author: {blog.author} </p>  <button  onClick={toggleVisibility}> {button} </button></div>
      <div style={hideShow}>
        <div>URL: {blog.url}</div>
        <div>Likes: {blog.likes}<button onClick={like}>like</button></div>
        { ifUser ? <div><button onClick={remove}>delete</button></div> : null}
      </div>

    </div>
  )
}

export default Blog
