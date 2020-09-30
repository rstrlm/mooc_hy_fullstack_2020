require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

//RESTful routes API's
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            const p = person
            if (p) {
            // res.send('<p>' + p.name + '<br>puh: ' + p.number + '</p>')
                res.send(p)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })
    person.save()
        .then(savedPerson => {
            res.json(savedPerson.toJSON())
            next()
        })
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
            next()
        })
        .catch(error => next(error))
})
app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
    }
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
            next()
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    const maxPers = Person.length
    const date = new Date()
    const mJono = 'Phonebook has info for ' + maxPers + ' people'

    res.send('<p>' + mJono + '</p>' + '<p>' + date + '</p>')
})

// Loggers and Error handlers

morgan.token('type', (req) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :response-time ms :type '))

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if(res.headersSent) {
        return next(error)
    } else if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
