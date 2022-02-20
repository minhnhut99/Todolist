
const eleBtnSort = document.querySelector('.btn-sort');
const eleSortList = document.querySelector('.sort-list');
const eleSortName = document.querySelector('.sort-name');
const eleBtnAddTask = document.querySelector('.btn-add');
const eleAddGroup = document.querySelector('.add-group');
const eleGroupBtn = document.querySelector('.group-btn');
const eleBtnGo = document.querySelector('.btn-go');
const eleBtnSubmit = document.querySelector('.btn-submit');
const eleBtnSaveTask = document.querySelector('.btn-save');
const eleBtnCancel = document.querySelector('.btn-cancel');
const eleSearch = document.getElementById('search');
const eleTask = document.getElementById('task');
const eleLevel = document.getElementById('level');
const eleTaskArea = document.getElementById('task-area');
const eleSaveIndex = document.getElementById('saveIndex');
const eleNameAsc = document.getElementById('name-asc');
const eleNameDesc = document.getElementById('name-desc');
const eleLevelAsc = document.getElementById('level-asc');
const eleLevelDesc = document.getElementById('level-desc');

// show sort list
eleBtnSort.addEventListener('click', () => {
  eleSortList.classList.toggle('sort-list-show');
});

// show add group
eleBtnAddTask.addEventListener('click', () => {
  eleAddGroup.style.display = 'block';
});

// cancel Task 
eleBtnCancel.addEventListener('click', () => {
  eleAddGroup.style.display = 'none';
  eleTask.value = '';
})

//sort ASC
eleNameAsc.addEventListener('click', () => {
  eleSortName.innerText = 'NAME-ASC';
  sortAsc();
  eleSortList.classList.toggle('sort-list-show');
});

//sort DESC 
eleNameDesc.addEventListener('click', () => {
  eleSortName.innerText = 'NAME-DESC';
  sortDesc();
  eleSortList.classList.toggle('sort-list-show');
});


//sort Level Asc 
eleLevelAsc.addEventListener('click', () => {
  eleSortName.innerText = 'LEVEL-ASC';
  sortLevelAsc();
  eleSortList.classList.toggle('sort-list-show');
});

//sort Level Desc 
eleLevelDesc.addEventListener('click', () => {
  eleSortName.innerText = 'LEVEL-DESC';
  sortLevelDesc();
  eleSortList.classList.toggle('sort-list-show');
});


eleBtnGo.addEventListener('click', searchTask);

showTask();

eleBtnSubmit.addEventListener('click', () => {
  eleAddGroup.style.display = 'none';
  let inputValue = eleTask.value;
  let levelValue = eleLevel.value;
  if (inputValue.trim() != 0) {
    let listTask = localStorage.getItem('todos');
    if (listTask == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(listTask);
    }
    taskObj.push({
      'taskName': inputValue,
      'taskLevel': levelValue
    })
    localStorage.setItem('todos', JSON.stringify(taskObj));
    eleTask.value = '';
  }
  showTask();
})

function showItemLevel(value) {
  let spanLevel = '';
  if (value === '0') {
    spanLevel = '<span class="task-level task-small-level">Small</span>'
  }
  if (value === '1') {
    spanLevel = '<span class="task-level task-medium-level">Medium</span>'
  }
  if (value === '2') {
    spanLevel = '<span class="task-level task-high-level"> High</span>'
  }
  return spanLevel;
}

function showTask() {
  let listTask = localStorage.getItem('todos');
  if (listTask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(listTask);
  }
  let htmlTask = '';
  taskObj.forEach((task, index) => {
    let name = task.taskName;
    let level = showItemLevel(task.taskLevel);
    htmlTask +=
    `
    <tr class="task-row">
      <td>${index + 1}</td>
      <td class="task-text">${name}</td>
      <td>
        ${level}
      </td>
      <td>
        <button class="btn btn-edit" onclick = "editTask(${index})">edit</button>
        <button class="btn btn-delete" onclick = "deleteTask(${index})">delete</button>
      </td>
    </tr> 
    `
  });
  eleTaskArea.innerHTML = htmlTask;
}

//editTask 

function editTask(index) {
  eleSaveIndex.value = index;
  let listTask = localStorage.getItem('todos');
  let taskObj = JSON.parse(listTask);
  eleTask.value = taskObj[index]['taskName'];
  eleLevel.value = taskObj[index]['taskLevel'];
  eleAddGroup.style.display = 'block';
  eleBtnSubmit.style.display = 'none';
  eleBtnSaveTask.style.display = 'block';
}

//saveTask 

eleBtnSaveTask.addEventListener('click', () => {
  let listTask = localStorage.getItem('todos');
  let taskObj = JSON.parse(listTask);
  let saveIndex = document.getElementById('saveIndex').value;

  for (keys in taskObj[saveIndex]) {
    if (keys == 'taskName') {
      taskObj[saveIndex].taskName = eleTask.value;
      taskObj[saveIndex].taskLevel = eleLevel.value;
    }
  }

  eleBtnSubmit.style.display = 'block';
  eleBtnSaveTask.style.display = 'none';
  eleAddGroup.style.display = 'none';

  localStorage.setItem('todos', JSON.stringify(taskObj));
  eleTask.value = '';
  showTask();
})

//delete task

function deleteTask(index) {
  let listTask = localStorage.getItem('todos');
  let taskObj = JSON.parse(listTask);
  taskObj.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(taskObj));
  showTask();
}

// sort Asc 

function sortAsc() {
  let listTask = localStorage.getItem('todos');
  let taskObj = JSON.parse(listTask);

  taskObj.sort(function (a, b) {
    var nameA = a.taskName.toUpperCase();
    var nameB = b.taskName.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  })
  let htmlTask = '';
  taskObj.forEach((task, index) => {
    let name = task.taskName;
    let level = showItemLevel(task.taskLevel);
    htmlTask +=
      `
    <tr class="task-row">
      <td>${index + 1}</td>
      <td class="task-text">${name}</td>
      <td>
        ${level}
      </td>
      <td>
        <button class="btn btn-edit" onclick = "editTask(${index})">edit</button>
        <button class="btn btn-delete" onclick = "deleteTask(${index})">delete</button>
      </td>
    </tr> 
    `
  });
  eleTaskArea.innerHTML = htmlTask;
}

function sortDesc() {
  let listTask = localStorage.getItem('todos');
  let taskObj = JSON.parse(listTask);

  taskObj.sort(function (a, b) {
    var nameA = a.taskName.toUpperCase();
    var nameB = b.taskName.toUpperCase();
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }
    return 0;
  })
  let htmlTask = '';
  taskObj.forEach((task, index) => {
    let name = task.taskName;
    let level = showItemLevel(task.taskLevel);
    htmlTask +=
      `
    <tr class="task-row">
      <td>${index + 1}</td>
      <td class="task-text">${name}</td>
      <td>
        ${level}
      </td>
      <td>
        <button class="btn btn-edit" onclick = "editTask(${index})">edit</button>
        <button class="btn btn-delete" onclick = "deleteTask(${index})">delete</button>
      </td>
    </tr> 
    `
  });
  eleTaskArea.innerHTML = htmlTask;
}

function sortLevelAsc() {
  let listTask = localStorage.getItem('todos');
  let taskObj = JSON.parse(listTask);

  taskObj.sort(function (a, b) {
    return a.taskLevel - b.taskLevel;
  })

  let htmlTask = '';
  taskObj.forEach((task, index) => {
    let name = task.taskName;
    let level = showItemLevel(task.taskLevel);
    htmlTask +=
    `
    <tr class="task-row">
      <td>${index + 1}</td>
      <td class="task-text">${name}</td>
      <td>
        ${level}
      </td>
      <td>
        <button class="btn btn-edit" onclick = "editTask(${index})">edit</button>
        <button class="btn btn-delete" onclick = "deleteTask(${index})">delete</button>
      </td>
    </tr> 
    `
  });
  eleTaskArea.innerHTML = htmlTask;
}

function sortLevelDesc() {
  let listTask = localStorage.getItem('todos');
  let taskObj = JSON.parse(listTask);

  taskObj.sort(function (a, b) {
    return b.taskLevel - a.taskLevel;
  })

  let htmlTask = '';
  taskObj.forEach((task, index) => {
    let name = task.taskName;
    let level = showItemLevel(task.taskLevel);
    htmlTask +=
      `
    <tr class="task-row">
      <td>${index + 1}</td>
      <td class="task-text">${name}</td>
      <td>
        ${level}
      </td>
      <td>
        <button class="btn btn-edit" onclick = "editTask(${index})">edit</button>
        <button class="btn btn-delete" onclick = "deleteTask(${index})">delete</button>
      </td>
    </tr> 
    `
  });
  eleTaskArea.innerHTML = htmlTask;
}

// search task 

function searchTask() {
  const eleTaskText = document.querySelectorAll('.task-text');
  let searchValue = eleSearch.value.toLowerCase();
  const taskRow = document.querySelectorAll('.task-row');
  for (var i = 0; i < taskRow.length; i++) {
    searchValue = searchValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let patt = new RegExp(`${searchValue}`, "gi");
    eleTaskText[i].innerHTML = 
    eleTaskText[i].textContent.replace(patt, match => `<mark>${match}</mark>`);
    if (eleTaskText[i].innerHTML.toLowerCase().indexOf(searchValue) > -1) {
      taskRow[i].style.display = '';
    } else {
      taskRow[i].style.display = 'none';
    }
  }
}
