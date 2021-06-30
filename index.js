require('dotenv').config()
const express = require('express')
const app = express()
const port = 8080
// const env = process.env
const bodyParser = require('body-parser')
const routes = require('./src/routes')
const cors = require('cors')
const connection = require('./src/helpers/db')

app.use(cors())

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use('/', routes)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})

connection.connect(function (err) {
  if (err) {
    throw err
  } else {
    console.log('Database has connected')
  }
})
