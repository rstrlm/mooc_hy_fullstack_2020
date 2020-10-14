import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }


  return (

    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>title:<input type="text" name="title" value={title} onChange={handleTitleChange}></input></div>
        <div>author:<input type="text" name="author" value={author} onChange={handleAuthorChange}></input></div>
        <div>url:<input type="text" name="url" value={url} onChange={handleUrlChange}></input></div>
        <button type="submit">create</button>
      </form>
    </div >
  )
}
export default BlogForm