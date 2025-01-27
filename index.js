const express = require('express')
const db = require('./db')
const app = express()
const port = 3400

app.get('/', (req, res) => {
  res.send('Hello World!')
})

  app.get('/users', async(req, res) => {
    const [rows] = await db.query('SELECT * from app')
    res.send(rows)
  })
  app.listen(port, () => {
    console.log(`MY app running on port ${port}`)
  })
