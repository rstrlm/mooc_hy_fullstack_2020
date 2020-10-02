const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    const likes = blogs.reduce((tot, b) =>  tot + b.likes ,0)
    return likes
}

const favoriteBlog = (blogs) => {
    
    const blog = blogs.reduce((favorite, blog) => {
        return (favorite.likes > blog.likes) ? favorite : blog
    },0)
    trimBlog = blog !== 0 ? { title: blog.title, author: blog.author, likes: blog.likes } : 0
    return trimBlog
}

const mostBlogs = (blogs) => {
    const blogsPerAuthor = blogs.reduce((list, blog) => {
        const index = list.findIndex(x => x.author === blog.author)
        if(index === -1) {
            list.push({ author:blog.author, count: 1})
        } else {
            list[index].count++
        }
        return list
    },[]) 

    const mostBlogs = blogsPerAuthor.reduce((most, blog) => {
        return (most.count > blog.count ) ? most : blog
    },{})
    let noBlogTest = Object.keys(mostBlogs).length
    return noBlogTest === 0 ? 0 : mostBlogs 
}
const mostLikes = (blogs) => {
    const likesPerAuthor = blogs.reduce((list, blog) => {
        const index = list.findIndex(x => x.author === blog.author)
        if(index === -1) {
            list.push({ author:blog.author, likes: blog.likes})
        } else {
            list[index].likes += blog.likes
        }
        return list
    },[]) 

    const mostLikes = likesPerAuthor.reduce((most, blog) => {
        return (most.likes > blog.likes ) ? most : blog
    },{})
    let noBlogTest = Object.keys(mostLikes).length
    return noBlogTest === 0 ? 0 : mostLikes
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}