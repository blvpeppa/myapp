const express = require('express')
const db = require('./db')
const app = express()
app.use(express.json());
const  port = 3200
const bodyParser = require('body-parser')
//select 
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM app')
    res.send(rows)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error retrieving users from the database')
  }
}) 
//insert 
 
app.post('/users',async (req,res) => {
  const {teachers,students} = req.body 
  if(!teachers||!students) {
    return res.status(400).send("bad request")
  }
    const [rows] = await db.query('INSERT INTO app (teachers,students) values(?,?)',[teachers,students]);
  res.status(201).send({ message: 'User created successfully'})

if(!rows) { 
    res.status(500).send('Error creating user in the database')
  }
})
//update
app.put('/users/:id', async (req, res) => {
  const {teachers,students} = req.body
  const id = req.params.id
  const [rows] = await db.query(`UPDATE app set teachers = ?,students = ? where id = ?`,[teachers,students,id]);
  res.status(201).send({message: 'updated'})
})
//delete
app.delete('/users/:id', async (req, res) => {
 // const {teachers,students} = req.body
  const id = req.params.id
  const [rows] = await db.query('DELETE FROM `app` WHERE id = ?',[id]);
  res.status(201).send({message: 'deleted successfully'})
})
app.listen(port, () => {
  console.log(`My app is running on port ${port}`);
});