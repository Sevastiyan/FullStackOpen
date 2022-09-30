const listHelper = require('./list_helper')
const helper = require('./test_helper')

//--------------------------------------------------------------------------
describe('most blogs', () => {
    const testResult = {
        author: 'Robert C. Martin',
        blogs: 3,
    }

    test('return the author with most blogs', () => {
        const result = listHelper.mostBlogs(helper.blogsData)
        expect(result).toEqual(testResult)
    })

    test('return an empty object if array is empty', () => { 
        const result = listHelper.mostBlogs([])
        expect(result).toEqual({})
    })
})

//--------------------------------------------------------------------------
describe('most likes', () => {
    const testResult = {
        author: "Edsger W. Dijkstra",
        likes: 17   
    }

    test('return the author with most likes', () => {
        const result = listHelper.mostLikes(helper.blogsData)
        expect(result).toEqual(testResult)
    })

    test('return an empty object if array is empty', () => { 
        const result = listHelper.mostLikes([])
        expect(result).toEqual({})
    })
})

//--------------------------------------------------------------------------
describe('total Likes', () => {
      
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
    // test('when list has only one blog, equals the likes of that', () => {
    //     const result = listHelper.totalLikes(helper.oneBlog)
    //     expect(result).toBe(5)
    // })
    test('of a bigger list is calculated right', () => { 
        const result = listHelper.totalLikes(helper.blogsData)
        expect(result).toBe(36)
    })
})

//--------------------------------------------------------------------------
describe('favorite Blog', () => { 
    const testObj = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
    }
    
    test('when blog list does not include testObj', () => { 
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual({})
    })

    test('when blog list includes testObj', () => { 
        const result = listHelper.favoriteBlog(helper.blogsData)
        expect(result).toEqual(testObj)
    })
})

