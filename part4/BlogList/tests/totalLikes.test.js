const { totalLikes, favoriteBlog } = require('../utils/list_helper.js')
const helper = require('./test_helper')

describe('total Likes', () => {
      
    test('of empty list is zero', () => {
        const result = totalLikes([])
        expect(result).toBe(0)
    })
    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(helper.oneBlog)
        expect(result).toBe(5)
    })
    test('of a bigger list is calculated right', () => { 
        const result = totalLikes(helper.blogs)
        expect(result).toBe(36)
    })
})

describe('favorite Blog', () => { 
    const testObj = {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
    }
    
    test('when blog list does not include testObj', () => { 
        const result = favoriteBlog([])
        expect(result).toEqual({})
    })

    test('when blog list includes testObj', () => { 
        const result = favoriteBlog(helper.blogs)
        expect(result).toEqual(testObj)
    })
})

