const taskInput = document.getElementById("taskInput");
const timeInput = document.getElementById("timeInput");
const priorityInput = document.getElementById("priorityInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function save(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){
  const text = taskInput.value.trim();
  const time = timeInput.value;
  const priority = priorityInput.value;

  if(!text) return alert("Enter task");

  tasks.push({
    id: Date.now(),
    text,
    time,
    priority,
    completed:false
  });

  taskInput.value="";
  timeInput.value="";

  save();
  render();
}

function toggle(id){
  tasks = tasks.map(t => t.id===id ? {...t, completed:!t.completed}:t);
  save();
  render();
}

function removeTask(id){
  tasks = tasks.filter(t=>t.id!==id);
  save();
  render();
}

function render(){
  taskList.innerHTML="";
  let completed=0;

  tasks.forEach(t=>{
    if(t.completed) completed++;

    const li=document.createElement("li");
    li.innerHTML=`
      <div class="${t.completed?'completed':''}">
        ${t.text} (${t.time||"No time"}) [${t.priority}]
      </div>
      <div>
        <button onclick="toggle(${t.id})">${t.completed?"Undo":"Done"}</button>
        <button onclick="removeTask(${t.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  document.getElementById("total").textContent = tasks.length;
  document.getElementById("completed").textContent = completed;
  document.getElementById("pending").textContent = tasks.length - completed;
}

document.getElementById("addBtn").onclick = addTask;

render();
