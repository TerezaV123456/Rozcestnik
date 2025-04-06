document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const showActiveBtn = document.getElementById('showActive');
    const showCompletedBtn = document.getElementById('showCompleted');

    let showCompleted = false; // Výchozí zobrazení: aktivní

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';

        tasks
            .filter(task => task.completed === showCompleted)
            .forEach(task => addTaskToDOM(task));
    };

    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.classList.add('task-checkbox');
        checkbox.addEventListener('change', () => {
            toggleTaskCompletion(task.id, checkbox.checked);
        });

        const span = document.createElement('span');
        span.textContent = task.text;
        span.classList.add('task-text');
        if (task.completed) {
            span.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = () => {
            deleteTask(task.id);
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    };

    const addTask = () => {
        const text = taskInput.value.trim();
        if (text) {
            const task = {
                id: Date.now(),
                text,
                completed: false
            };
            saveTask(task);
            if (!showCompleted) addTaskToDOM(task); // Zobrazíme jen pokud jsme v aktivních
            taskInput.value = '';
        }
    };

    const saveTask = (task) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const toggleTaskCompletion = (id, completed) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.map(t => {
            if (t.id === id) {
                t.completed = completed;
            }
            return t;
        });
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        loadTasks(); // Překreslit podle aktuálního režimu
    };

    const deleteTask = (id) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(t => t.id !== id);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        const liToDelete = document.querySelector(`li[data-id='${id}']`);
        if (liToDelete) liToDelete.remove();
    };

    // Přepínání mezi aktivními a dokončenými
    showActiveBtn.addEventListener('click', () => {
        showCompleted = false;
        loadTasks();
    });

    showCompletedBtn.addEventListener('click', () => {
        showCompleted = true;
        loadTasks();
    });

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        document.getElementById('clock').textContent = timeString;
    }

    // Spuštění hodin po načtení stránky
    updateClock();
    setInterval(updateClock, 1000);

    loadTasks();
});
