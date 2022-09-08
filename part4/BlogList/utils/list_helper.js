const _ = require('lodash')

const dummy = (blogs) => {
    // ...
    return 1
}

const totalLikes = (blogs) => {
    const sumReducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0 ? 0 : blogs.reduce(sumReducer, 0)
}

const favoriteBlog = (blogs) => {
    // return Math.max(...blogs.map(obj => obj.likes))
    if (blogs.length === 0) {
        return {}
    }

    const favorite = blogs.reduce(function (prev, current) {
        return prev.likes > current.likes ? prev : current
    })

    const { __v, _id, url, ...result } = favorite

    return result
}

const mostBlogs = (blogs) => {
    if (blogs.length < 1) {
        return {}
    }
    const result = _(blogs)
        .groupBy('author')
        .map((items, author) => ({ author, blogs: items.length }))
        .value()
    
    return _.head(_.orderBy(result, 'blogs', 'desc'))
}

const mostLikes = (blogs) => { 
    if (blogs.length < 1) {
        return {}
    }
    const result = _(blogs)
        .groupBy('author')
        .map((items, key) => ({
            'author': key,
            'likes': _.sumBy(items, 'likes')
        }))
        .value();
    
    return _.head(_.orderBy(result, 'likes', 'desc'))
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
