const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const data = require('./src/mockDB/student.json')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send(data)
})

app.get('/:age', (req, res) => {
  res.send(data.filter(x => req.params.age === x.age));
})

app.post('/create/student', (req, res) => {
  data.push(req.body);
  res.status(201).send();
})

app.put('/add/age/:age', (req, res) => {
  const index = Math.floor(Math.random() * Object(data).length);
  Object(data)[index].age = Number(Object(data)[index].age) + Number(req.params.age);
  res.status(200).send()
})

app.delete('/', (req, res) => {
  const index = Math.floor(Math.random() * Object(data).length);
  data.splice(index, 1);
  res.status(200).send();
})

app.listen(process.env.PORT || 8081)
