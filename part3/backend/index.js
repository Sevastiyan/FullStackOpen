/* eslint-disable no-unused-vars */
const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const Contact = require('./models/contact')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :response-body')
)

morgan.token('response-body', function (request, response) {
  return JSON.stringify(request.body)
})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  Contact.find({}).then((contacts) => {
    const persons = Object.keys(contacts).length
    console.log('🚀 ~ Contact.find ~ persons', persons)
    const message = `Phonebook has info for ${persons} people.`
    const date = new Date().toISOString()
    response.send(`<h1>Phonebook Info</h1><p>${message}</p>${date}</p>`)
  })

})

app.get('/api/persons', (request, response) => {
  Contact.find({}).then((contacts) => {
    console.log('🚀 ~ Contact.find ~ contacts', contacts)
    response.json(contacts)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => {
      console.log('🚀 ~ app.get ~ contact', contact)
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    // .catch(error => {
    //   console.log(error)
    //   response.status(400).send({ error: 'malformatted id' })
    // })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons/', (request, response, next) => {
  const body = request.body
  const name = body.name
  const number = body.number

  if (!name || !number) {
    return response.status(400).json({
      error: 'contact details missing',
    })
  }

  const contact = new Contact({
    name: body.name ? body.name : '',
    number: body.number ? body.number : '',
  })

  contact
    .save()
    .then((savedContact) => {
      response.json(savedContact)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const id = body.id

  const person = {
    name: body.name,
    number: body.number,
  }

  Contact.findByIdAndUpdate(id, person, {
    number: body.number,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  // console.error(error.message)
  console.log('🚀 ~ errorHandler ~ error', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
