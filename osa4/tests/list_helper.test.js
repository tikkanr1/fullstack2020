const listHelper = require('../utils/list_helper')

//dummy test
test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

//example blog
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
]

//example blogs
const listWithMultipleBlogs = [
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
]

//tests for favorite blog
describe('favorite blog', () => {
  test('should return the single blog as favorite', () => {
    const expectedFavoriteBlog = listWithOneBlog[0]
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toBe(expectedFavoriteBlog)
  })
  
  test('should return the blog with the highest likes as favorite from multiple blogs', () => {
    const expectedFavoriteBlog = listWithMultipleBlogs[0]
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    expect(result).toEqual(expectedFavoriteBlog)
  })

  test('should return null when given an empty list of blogs', () => {
    const expectedFavoriteBlog = null
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(expectedFavoriteBlog)
  })
})
  
//tets for total likes
describe('total likes', () => {
  test('should return the total likes of a single blog', () => {
    const expectedTotalLikes = 5
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(expectedTotalLikes)
  })
  
  test('should return the total likes of multiple blogs', () => {
    const expectedTotalLikes = 22
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(expectedTotalLikes)
  })

  test('should return zero when given an empty list of blogs', () => {
    const expectedTotalLikes = 0
    const result = listHelper.totalLikes([])
    expect(result).toBe(expectedTotalLikes)
  })
})

//tests for most blogs
describe('most blogs', () => {
  test('should return the author and the number of blogs for a single blog', () => {
    const expectedAuthorWithMostBlogs = {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    }
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(expectedAuthorWithMostBlogs)
  })
  
  test('should return the author with the most blogs and the number of their blogs from multiple blogs', () => {
    const expectedAuthorWithMostBlogs = {
      author: 'Robert C. Martin',
      blogs: 2,
    }
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    expect(result).toEqual(expectedAuthorWithMostBlogs)
  })

  test('should return null when given an empty list of blogs', () => {
    const expectedMostBlogs = null
    const result = listHelper.mostBlogs([])
    expect(result).toBe(expectedMostBlogs)
  })
})

//tests for most likes
describe('most likes', () => {
  test('should return null when given an empty list of blogs', () => {
  const expectedMostLikes = null
    const result = listHelper.mostLikes([])
    expect(result).toBe(expectedMostLikes)
  })
  
  test('should return the author and likes of a single blog with most likes', () => {
    const expectedMostLikes = {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(expectedMostLikes)
  })
  
  test('should return the author and likes of the blog with most likes in a list', () => {
    const expectedMostLikes = {
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    expect(result).toEqual(expectedMostLikes)
  })
})