const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url).then(result => {
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log('error connecting to MongoDB', error.message)
})

// make sure every value is equal to "something"

let phonePattern = /(^\d{2,3}-\d+)/

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function (val) {
                return phonePattern.test(val);
            },
            message: 'The number must be correctly formatted'
        }
    }
})
  
contactSchema.set('toJSON', { 
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
  
  
module.exports = mongoose.model('Contact', contactSchema)
