const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: "5f7ec474ed8a656e5c159fe8",
    __v: 0
},
{
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
},
{
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Robert C. Martin",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: "5f7ec474ed8a656e5c159fe8",
    __v: 0
},
{
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10, 
    __v: 0
}, {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
},
{
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Edsger W. Dijkstra",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
}
]
const listWithOneBlog = [{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
}]
const listWithoutLikes = [{
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
}]

const initialUser = {
    _id: "5f7ec474ed8a656e5c159fe8",
    username: "root",
    passwordHash:"$2b$10$OGMon0Zu29kPKujozaC64O9ExK/QVVnsH3k6UYuCX/SZgykwydJfO",
    __v:  1
}

/**
*  RESULTS!!
*/

const resultWithBlogs = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
}

const resultWithOneBlog = {
    title: "React patterns",
    author: "Michael Chan",
    likes: 7
}

const resultWithMostBLogsOneBlog = {
    author: "Michael Chan",
    count: 1
}

const resultWithMostBlogsMany = {
    author: "Robert C. Martin",
    count: 3
}

const resultWithMostLikesOneBlog = {
    author: "Michael Chan",
    likes: 7
}

const resultWithMostLikesMany = {
    author: "Robert C. Martin",
    likes: 22
}

/**
 *  RESULTS ENDS
 */

const nonExistingId = async () => {
    const blog = new Blog({ title: 'will remove', url: 'this really soon' })
    await blog.save()
    await blog.remove()
  
    return blog.id.toString()
  }

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, listWithOneBlog, resultWithBlogs, resultWithMostBlogsMany, 
    resultWithMostBLogsOneBlog, resultWithMostLikesMany, initialUser,
    resultWithMostLikesOneBlog, resultWithOneBlog,
    blogsInDb, nonExistingId, usersInDb
}