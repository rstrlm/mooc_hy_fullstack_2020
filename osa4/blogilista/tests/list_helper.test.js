const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')
const emptyList = []

test('dummy returns one', () => {

  const result = listHelper.dummy(emptyList)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when theres only one blog, likes equals its likes', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(7)
  })

  test('of many is calculated right', () => {
    const result = listHelper.totalLikes(helper.initialBlogs)
    expect(result).toBe(36)
  })

  test('of empty array is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })
})

describe('favorite blog', () => {
  test('when theres only one blog, its the favorite', () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog)
    expect(result.likes).toEqual(helper.resultWithOneBlog.likes)
  })

  test('when theres multiple blogs, the favorite one is the one with most likes', () => {
    const result = listHelper.favoriteBlog(helper.initialBlogs)
    expect(result.likes).toEqual(helper.resultWithBlogs.likes)
  })

  test('when theres no blogs, returns 0', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toBe(0)
  })
  
})
describe('most blogs', () => {
  test('when theres only one blog, its author has most blogs', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)
    expect(result).toEqual(helper.resultWithMostBLogsOneBlog)
  })

  test('when theres multiple blogs, look for the author with most blogs', () => {
    const result = listHelper.mostBlogs(helper.initialBlogs)
    expect(result).toEqual(helper.resultWithMostBlogsMany)
  })

  test('when theres no blogs, returns 0', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toBe(0)
  })
  
})
describe('most likes', () => {
  test('when theres only one blog, its author has most blogs', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog)
    expect(result).toEqual(helper.resultWithMostLikesOneBlog)
  })

  test('when theres multiple blogs, look for the author with most blogs', () => {
    const result = listHelper.mostLikes(helper.initialBlogs)
    expect(result).toEqual(helper.resultWithMostLikesMany)
  })

  test('when theres no blogs, returns 0', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toBe(0)
  })
  
})


