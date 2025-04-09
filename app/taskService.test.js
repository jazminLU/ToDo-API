const { addTask, getTasks } = require('./taskService');

test('Agregar tarea', () => {
  const task = addTask('Hacer la entrega');
  expect(task.name).toBe('Hacer la entrega');
});

test('Obtener tareas', () => {
  const tasks = getTasks();
  expect(tasks.length).toBeGreaterThan(0);
});
