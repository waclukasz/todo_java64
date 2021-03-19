const savedTasks = localStorage.getItem('allTasks');
let allTasks = [];



const setCurrentDate = () => {
  const dayMonthElement = document.getElementById('dayMonth');
  const monthNameElement = document.getElementById('monthName');
  const yearElement = document.getElementById('year');
  const weekdayElement = document.querySelector('.app-weekday');

  const dayMonth = new Date(Date.now()).getDate();
  const monthName = new Date().toLocaleString('default', { month: 'short' });
  const year = new Date().getFullYear();
  const weekdayName = new Date().toLocaleString('en-gb', { weekday: 'long' });
  
  dayMonthElement.innerText = dayMonth;
  monthNameElement.innerText = monthName;
  yearElement.innerText = year;
  weekdayElement.innerText = weekdayName;
};

const toggleModal = () => {
  const modalElement = document.getElementById('modal');
  modalElement.classList.toggle('hidden');
}

const createTaskTemplate = (task) => {
  const template = `
    <li 
      class="todo-item ${task.completed && 'completed'}"
    >
      <p>${task.name}</p>
      <div class="todo-icons">
        <i 
          data-id="${task.id}"
          class="far fa-trash-alt trash-btn"
        >
        </i>
        <div
          data-id="${task.id}"
          class="icon-wrapper"
        >
          <i
            data-id="${task.id}"
            class="fas fa-check"
          ></i>
        </div>
      </div>
    </li>
  `
  return template;
}

const toggleTaskState = (id) => {
  allTasks = allTasks.map((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });

  renderTasks();
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

const removeTask = (id) => {
  allTasks = allTasks.filter((task) => task.id !== id);

  renderTasks();
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

const addRemoveTaskEvent = () => {
  const trashBtns = document.querySelectorAll('.trash-btn');
  trashBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const taskId = event.target.dataset.id;
      removeTask(taskId);
    })
  })

}

const addTogleEventToListElement = () => {
  const allButtons = document.querySelectorAll('.icon-wrapper');
  
  allButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const taskId = event.target.dataset.id;
      toggleTaskState(taskId);
    })
  })
}

const renderTasks = () => {
  const todosListElement = document.querySelector('.todo-list');

  const tasksTemplate = allTasks.map((task) => {
    return createTaskTemplate(task)
  })

  todosListElement.innerHTML = tasksTemplate.join('');
  addTogleEventToListElement();
  addRemoveTaskEvent();
}

const checkIfTaskExists = (taskName) => { // Return Boolean
  const filteredTasks = allTasks.filter((task) => {
    return task.name === taskName;
  })

  return filteredTasks.length;
}

const addNewTask = () => {
  const inputTaskElement = document.getElementById('todoTask');
  let taskName = inputTaskElement.value;
  taskName = taskName.trim();

  if (!taskName) {
    alert('You should type a task');
    return; // end executing if true
  }

  if (checkIfTaskExists(taskName)) {
    alert('This task already exists');
    return;
  }

  const newTaskModel = {
    name: taskName,
    completed: false,
    id: `id-${Math.random()}`
  };

  allTasks.push(newTaskModel);
  localStorage.setItem('allTasks', JSON.stringify(allTasks));

  renderTasks();
  inputTaskElement.value = null; 
  toggleModal();
  
}

if (savedTasks) {
  allTasks = JSON.parse(savedTasks);
  renderTasks();
}

document.querySelector('.add-task-btn').addEventListener('click', toggleModal);
document.querySelector('.close-btn').addEventListener('click', toggleModal);
document.querySelector('.add-btn').addEventListener('click', addNewTask)
document.getElementById('todoTask').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addNewTask();
  } 
})

document.addEventListener('keyup', (event) => {
  if (event.key === 'Escape') {
    toggleModal();
  }
})

setCurrentDate();