const mostBlogs = require('../utils/list_helper').mostBlogs
const helper = require('./test_helper')

describe('most blogs', () => {
    const testResult = {
        author: 'Robert C. Martin',
        blogs: 3,
    }

    test('return the author with most blogs', () => {
        const result = mostBlogs(helper.blogs)
        expect(result).toEqual(testResult)
    })

    test('return an empty object if array is empty', () => { 
        const result = mostBlogs([])
        expect(result).toEqual({})
    })
})
