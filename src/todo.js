const addTaskButton = document.getElementById('AddTask');
const taskList = document.getElementById('taskList');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');

function loadTasks() {
    const tasksJSON = localStorage.getItem('tasks');
    const tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
    taskList.innerHTML = '';
    tasks.forEach(addTaskToDOM);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(li => {
        const title = li.querySelector('h3').textContent;
        const content = li.querySelector('p').textContent;
        tasks.push({ title, content });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTaskToDOM({ title, content }) {
    const listItem = document.createElement('li');
    listItem.className = 'task';
    listItem.style.opacity = '0';
    listItem.style.transform = 'scale(0.8)';
    listItem.style.transition = 'all 0.3s ease';
    
    const taskDiv = document.createElement('div');
    taskDiv.className = 'taskContent';
    
    const taskTitle = document.createElement('h3');
    taskTitle.textContent = title;
    
    const taskContent = document.createElement('p');
    taskContent.textContent = content;
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteBtn';
    deleteButton.textContent = 'Delete';
    
    deleteButton.addEventListener('click', () => {
        listItem.style.opacity = '0';
        listItem.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            taskList.removeChild(listItem);
            saveTasks();
        }, 300);
    });
    
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskContent);
    taskDiv.appendChild(deleteButton);
    
    listItem.appendChild(taskDiv);
    taskList.appendChild(listItem);
    
    requestAnimationFrame(() => {
        listItem.style.opacity = '1';
        listItem.style.transform = 'scale(1)';
    });
}

function addTask() {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    
    if (!title || !content) {
        if (!title) {
            titleInput.style.borderColor = '#ff6b6b';
            titleInput.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(0)' }
            ], {
                duration: 400,
                easing: 'ease-in-out'
            });
        }
        if (!content) {
            contentInput.style.borderColor = '#ff6b6b';
            contentInput.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(0)' }
            ], {
                duration: 400,
                easing: 'ease-in-out'
            });
        }
        
        setTimeout(() => {
            titleInput.style.borderColor = '';
            contentInput.style.borderColor = '';
        }, 1500);
        
        return;
    }
    
    const task = { title, content };
    addTaskToDOM(task);
    saveTasks();
    
    titleInput.value = '';
    contentInput.value = '';
    titleInput.focus();
}

addTaskButton.addEventListener('click', () => {
    addTask();
});

[titleInput, contentInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

window.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

if (document.readyState !== 'loading') {
    loadTasks();
}