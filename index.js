const express = require('express');
const db = require('./db');
const app = express();
const port = 3400;

// Middleware to parse incoming JSON requests
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET Route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM app');
    res.json(rows); // Return the result as JSON
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving users from the database');
  }
});

// POST Route to add a new user
app.post('/users', async (req, res) => {
  const { teacher, student } = req.body; // Get data from the request body
  
  if (!teacher || !student) {
    return res.status(400).send('Teacher and student are required');
  }

  try {
    // Insert the new user into the database
    const [result] = await db.query('INSERT INTO app (teacher, student) VALUES (?, ?)', [teacher, student]);

    // Respond with the inserted data or success message
    res.status(201).json({
      message: 'User added successfully',
      data: { teacher, student },
      id: result.insertId // Assuming the result contains the insertId
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding user to the database');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`My app is running on port ${port}`);
});
