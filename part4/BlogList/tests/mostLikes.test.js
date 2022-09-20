const mostLikes = require('../utils/list_helper').mostLikes
const helper = require('./test_helper')


describe('most likes', () => {
    const testResult = {
        author: "Edsger W. Dijkstra",
        likes: 17   
    }

    test('return the author with most likes', () => {
        const result = mostLikes(helper.blogs)
        expect(result).toEqual(testResult)
    })

    test('return an empty object if array is empty', () => { 
        const result = mostLikes([])
        expect(result).toEqual({})
    })
})
