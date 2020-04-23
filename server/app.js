const express = require('express')
const app = express()
const path = require('path')







// подключение статической папки
app.use(express.static(path.resolve(__dirname, '../', 'client')))

// обработка всех входящих get запросов
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'client', 'index.html'))
})

// запуск самого сервера
app.listen(3333, () => { console.log('=> SERVER START') })