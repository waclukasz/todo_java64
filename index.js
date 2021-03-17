const allTasks = [];

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
      id="${task.id}"
      class="todo-item ${task.completed && 'completed'}"
    >
      <p>${task.name}</p>
      <div class="icon-wrapper">
        <i class="fas fa-check"></i>
      </div>
    </li>
  `
  return template;
}

const renderTasks = () => {
  const todosListElement = document.querySelector('.todo-list');

  const tasksTemplate = allTasks.map((task) => {
    return createTaskTemplate(task)
  })

  console.log(tasksTemplate);
  todosListElement.innerHTML = tasksTemplate.join('');
}

const addNewTask = () => {
  const inputTaskElement = document.getElementById('todoTask');
  const taskName = inputTaskElement.value;

  const newTaskModel = {
    name: taskName,
    completed: false,
    id: `id-${Math.random()}`
  };

  allTasks.push(newTaskModel);
  renderTasks();
}

document.querySelector('.add-task-btn').addEventListener('click', toggleModal);
document.querySelector('.close-btn').addEventListener('click', toggleModal);
document.querySelector('.add-btn').addEventListener('click', addNewTask)

setCurrentDate();