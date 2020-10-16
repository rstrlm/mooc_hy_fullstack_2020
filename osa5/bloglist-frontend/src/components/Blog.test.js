import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogFrom from './BlogForm'


describe('<Blog />', () => {
  let component
  let blog
  let user
  beforeEach(() => {
    blog = {
      author: 'Tester',
      title: 'We expect results',
      likes: 0,
      url: 'www.ThisShouldNotBeenRenderedAtFirst.com',
      user: {
        name: 'Test Mister',
        username: 'tst',
        id: 5,
      }
    }
    user = {
      name: 'Test Mister',
      username: 'tst',
      id: 5,
    }
  })

  test('renders content with just author and title', () => {
    component = render(
      <Blog blog={blog}/>
    )
    expect(component.container).toHaveTextContent('Title: We expect results')
    expect(component.container).toHaveTextContent('Author: Tester')
    expect(component.container).not.toHaveTextContent('URL: www.ThisShouldNotBeenRenderedAtFirst.com')
    expect(component.container).not.toHaveTextContent('Likes: 0')
  })
  test('show button renders more information', () => {
    component = render(
      <Blog blog={blog}/>
    )
    const button = component.getByText('show')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent('Title: We expect results')
    expect(component.container).toHaveTextContent('Author: Tester')
    expect(component.container).toHaveTextContent('URL: www.ThisShouldNotBeenRenderedAtFirst.com')
    expect(component.container).toHaveTextContent('Likes: 0')
    expect(component.container).not.toHaveTextContent('delete')
  })
  test('pressing like twice calls event handler twice', () => {
    const mockHandler = jest.fn()
    component = render(
      <Blog blog={blog} addLike={mockHandler}/>
    )
    const button = component.getByText('show')
    fireEvent.click(button)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
  test('if user id is same as blog adders, show delete button and it calls handler', () => {
    const mockHandler = jest.fn()
    component = render(
      <Blog blog={blog} removeBlog={mockHandler} user={user} />
    )
    const button = component.getByText('show')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent('delete')
  })

})
describe('<BlogForm />', () => {
  test('creating form', () => {
    const createBlog = jest.fn()

    const component= render(
      <BlogFrom createBlog={createBlog}/>
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
      target: { value: 'Crash Test Dummy' }
    })
    fireEvent.change(title, {
      target: { value: 'would there be easier way to test all the inputs at once?' }
    })
    fireEvent.change(url, {
      target: { value: 'localhost:3003/api/blogs' }
    })
    fireEvent.submit(form)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('Crash Test Dummy')
    expect(createBlog.mock.calls[0][0].title).toBe('would there be easier way to test all the inputs at once?')
    expect(createBlog.mock.calls[0][0].url).toBe('localhost:3003/api/blogs')
  })

})