const express = require('express')
const morgan = require('morgan')
const path = require('path')
const {mongoose} = require('./database')
const app = express()

//setting

app.set('port', process.env.PORT || 3000)
//Middlewares
app.use(morgan('dev'))
app.use(express.json())

//Rotes

app.use('/api/task',require('./routes/task.routers'));
//static files

app.use(express.static(path.join(__dirname, 'public')))
//starting server
app.listen(app.get('port'), () => {
console.log(`server on port ${app.get('port')}`)
});