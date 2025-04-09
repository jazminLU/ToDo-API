document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taskForm');
    const input = document.getElementById('taskInput');
    const list = document.getElementById('taskList');
  
    const loadTasks = async () => {
      const res = await fetch('/tasks');
      const tasks = await res.json();
      list.innerHTML = '';
  
      tasks.forEach(task => {
        const li = document.createElement('li');
  
        const span = document.createElement('span');
        span.textContent = task.name;
        span.className = 'task-name';
  
        const inputEdit = document.createElement('input');
        inputEdit.type = 'text';
        inputEdit.value = task.name;
        inputEdit.className = 'edit-input hidden';
  
        const actions = document.createElement('div');
        actions.className = 'actions';
  
        const deleteBtn = document.createElement('button'); // 👉 definirlo antes de usarlo
        deleteBtn.textContent = '🗑️';
        deleteBtn.className = 'delete';
        deleteBtn.onclick = () => {
          fetch(`/tasks/${task.id}`, { method: 'DELETE' }).then(loadTasks);
        };
  
        const editBtn = document.createElement('button');
        editBtn.textContent = '✏️';
  
        const saveBtn = document.createElement('button');
        saveBtn.textContent = '✅';
        saveBtn.className = 'hidden';
  
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = '❌';
        cancelBtn.className = 'hidden';
  
        editBtn.onclick = () => {
          span.classList.add('hidden');
          inputEdit.classList.remove('hidden');
          editBtn.classList.add('hidden');
          deleteBtn.classList.add('hidden');
          saveBtn.classList.remove('hidden');
          cancelBtn.classList.remove('hidden');
        };
  
        saveBtn.onclick = () => {
          const newName = inputEdit.value;
          fetch(`/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName })
          }).then(() => {
            span.textContent = newName; // ✅ actualiza el texto visual
            loadTasks();
          });
        };
  
        cancelBtn.onclick = () => {
          span.classList.remove('hidden');
          inputEdit.classList.add('hidden');
          editBtn.classList.remove('hidden');
          deleteBtn.classList.remove('hidden');
          saveBtn.classList.add('hidden');
          cancelBtn.classList.add('hidden');
        };
  
        actions.appendChild(editBtn);
        actions.appendChild(saveBtn);
        actions.appendChild(cancelBtn);
        actions.appendChild(deleteBtn);
  
        li.appendChild(span);
        li.appendChild(inputEdit);
        li.appendChild(actions);
  
        list.appendChild(li);
      });
    };
  
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const taskName = input.value;
      await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskName })
      });
      input.value = '';
      loadTasks();
    });
  
    loadTasks();
  });
  