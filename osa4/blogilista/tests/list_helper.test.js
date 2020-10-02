const listHelper = require('../utils/list_helper')

const blogs = [{
  _id: "5a422a851b54a676234d17f7",
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
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
  __v: 0
},
{
  _id: "5a422b891b54a676234d17fa",
  title: "First class tests",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  likes: 10, __v: 0
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
  __v: 0 }
]

const listWithOneBlog = [{
  _id: "5a422a851b54a676234d17f7",
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
  __v: 0
}]

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
const emptyList = []

test('dummy returns one', () => {

  const result = listHelper.dummy(emptyList)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when theres only one blog, likes equals its likes', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(7)
  })

  test('of many is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('of empty array is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })
})

describe('favorite blog', () => {
  test('when theres only one blog, its the favorite', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result.likes).toEqual(resultWithOneBlog.likes)
  })

  test('when theres multiple blogs, the favorite one is the one with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result.likes).toEqual(resultWithBlogs.likes)
  })

  test('when theres no blogs, returns 0', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toBe(0)
  })
  
})
describe('most blogs', () => {
  test('when theres only one blog, its author has most blogs', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(resultWithMostBLogsOneBlog)
  })

  test('when theres multiple blogs, look for the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(resultWithMostBlogsMany)
  })

  test('when theres no blogs, returns 0', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toBe(0)
  })
  
})
describe('most likes', () => {
  test('when theres only one blog, its author has most blogs', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(resultWithMostLikesOneBlog)
  })

  test('when theres multiple blogs, look for the author with most blogs', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(resultWithMostLikesMany)
  })

  test('when theres no blogs, returns 0', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toBe(0)
  })
  
})


