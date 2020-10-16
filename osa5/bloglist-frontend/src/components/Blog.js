import React, { useState } from 'react'

const Blog = ({ blog, user, removeBlog, addLike }) => {
  const [visible, setVisible] = useState(false)

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

  const button = visible ? 'hide' : 'show'
  let ifUser = false

  if(user && blog.user){
    ifUser = (user.id === blog.user.id || user.id === blog.user) ? true : false
  }
  return (
    <div className='blogStyle'>
      <div className='blog'>Title: {blog.title}, Author: {blog.author} <button id='blog-showhide' onClick={toggleVisibility}>{button}</button></div>
      {visible ?
        <div className='hiddenInfo'>
          <div>URL: <span id='blog-url'>{blog.url}</span></div>
          <div>Likes: <span id='blog-likes'>{blog.likes}</span><button id='blog-like' onClick={like}>like</button></div>
          { user ? <div>{blog.user.name}</div>: null}
          { ifUser ? <div><button id='blog-remove' onClick={remove}>delete</button></div> : null}
        </div>
        : null}

    </div>
  )
}

export default Blog
