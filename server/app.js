const express = require('express')
const app = express()
const path = require('path')
const { v4 } = require('uuid')

// типа база данных
let CONTACTS = [
    {
        id: v4(),
        name: "Сергей",
        value: 'СЛУЧАЙНАЯ писанина',
        marked: false
    },
]


// Необходим чтоб сервер мог обрабатывать json
app.use(express.json())


// получение списка всех контактов GET запрос
app.get('/api/contacts', (req, response) => {
    console.log('> New requst on /api/contacts')
    response.status(200).json(CONTACTS)
})


// добавление нового поста
app.post('/api/contacts', (request, response) => {
    const newContact = {
        id: v4(),
        name: request.body.name,
        value: request.body.value,
        marked: false,
    }
    response.status(201).json(newContact)
    CONTACTS.push(newContact)
})


// удаление контакта по id
app.delete('/api/contacts/:id', (req, res) => {
    console.log('> Try delete contact with id:', req.params.id)
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
    res.status(200).json({ message: 'Контакт был удален ' })
})


app.put('/api/contacts/:id', (req, res) => {
    const idx = CONTACTS.findIndex(c => c.id === req.params.id)
    CONTACTS[idx] = req.body
    res.json(CONTACTS[idx])
})


// подключение статической папки
app.use(express.static(path.resolve(__dirname, '../', 'client')))


// обработка всех входящих get запросов
app.get('*', (req, res) => {
    console.log('> New requst on index page')

    res.sendFile(path.resolve(__dirname, '../', 'client', 'index.html'))
})

// запуск самого сервера 
app.listen(3333, () => { console.log('===> SERVER START') })