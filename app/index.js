const express = require('express');
const path = require('path');
const { addTask, getTasks, updateTask, deleteTask } = require('./taskService');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.post('/tasks', (req, res) => {
  const task = addTask(req.body.name);
  res.status(201).json(task);
});

app.get('/tasks', (req, res) => {
  res.json(getTasks());
});

app.put('/tasks/:id', (req, res) => {
  const updated = updateTask(Number(req.params.id), req.body.name);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  deleteTask(Number(req.params.id));
  res.status(204).end();
});

const port = 3000;
app.listen(port, () => console.log(`API corriendo en puerto ${port}`));
