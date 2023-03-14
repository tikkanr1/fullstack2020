const dummy = (_blogs) => 1

//totallikes couter
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
  return sum + blog.likes
  }, 0)
}

//favorite blog finder
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((favorite, current) => {
    if (current.likes > favorite.likes) {
      return current
    } else {
      return favorite
    }
  })
}

//most blogs counter
const mostBlogs = (blogs) => {
  if (!blogs.length) {
    return null
  }

  let blogCounts = {}

  blogs.forEach((blog) => {
    if (blogCounts[blog.author] === undefined) {
      blogCounts[blog.author] = 1
    } else {
      blogCounts[blog.author]++
    }
  })

  const highestCount = Object.entries(blogCounts).reduce((selected, current) => {
    if (current[1] > selected[1]) {
      return current
    } else {
      return selected
    }
  })

  return {
    author: highestCount[0],
    blogs: highestCount[1],
  }
}

//most likes counter
const mostLikes = (blogs) => {
  if (!blogs.length) {
    return null
  }

  let counts = {}

  blogs.forEach((blog) => {
    if (counts[blog.author] === undefined) {
      counts[blog.author] = blog.likes
    } else {
      counts[blog.author] += blog.likes
    }
  })
 
  const highestCount = Object.entries(counts).reduce((selected, current) => {
    if (current[1] > selected[1]) {
      return current
    } else {
      return selected
    }
  })

  return {
    author: highestCount[0],
    likes: highestCount[1],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}