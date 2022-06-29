const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fulstack:${password}@myfirstcluster.58jk2km.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const contactSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length > 3) {
  const name = process.argv[3]
  const number = process.argv[4]
  const id = Math.floor(Math.random() * 1000)

  const contact = new Contact({
    id: id,
    name: name,
    number: number,
  })

  contact.save().then(() => {
    console.log(`Added ${name} ${number} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  console.log('Phonebook: \n')
  Contact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
}

mongoose.connect(url)
