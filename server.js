// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port =  5001;


app.use(cors({ origin: '*' }));

app.use(express.json());

// Connect to MongoDB (replace 'your-mongodb-url' with your MongoDB connection string)
mongoose.connect('mongodb+srv://vishwa_vbn:Vbn9535@todolist.ycrp3bf.mongodb.net/', {
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: Date,
  assignedTo: String,
  completed: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

app.get('/tasks', async (req, res) => {
  console.log("get tasks api is called ")

  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/tasks', async (req, res) => {

  const { title, description, deadline, assignedTo } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      deadline,
      assignedTo,
      completed: false,
    });

    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
