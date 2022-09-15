let addBtn = document.querySelector("#addBtn");
let delBtn = document.querySelector("#delBtn");
let taskInfo = document.querySelector("#taskInfo");
let taskTime = document.querySelector("#taskTime");
let tBody = document.querySelector("#tBody");
var tasks = JSON.parse(localStorage.getItem("tasks"));

let showTasks = () => { 
    tasks.forEach((element) => {
    let task = document.createElement("tr");
    task.innerHTML = `<td>${element.info}</td><td>${element.time}</td><td><button class="btn btn-secondary" id="t${element.id}"onclick="removeThis(this.id)" >remove</button></td>`;
    tBody.appendChild(task);
  });
};

if(tasks != null){
    showTasks()
}
else{
    tasks = []
}

let removeThis = (id) => {
  let el = document.querySelector(`#${id}`);
  el.closest("tr").innerHTML = "";
  let n = id.match(/\d/);
  n = n["0"];
  tasks.forEach((element, index) => {
    if (element.id == n) {
        tasks.splice(index,1)
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
};

let removeAll = () => {
    localStorage.removeItem("tasks");
    tBody.innerHTML = "";
};

class Task{
  constructor(info,time,id){
  this.info = info;
  this.time = time;
  this.id = id;
  }
}
let i = 1;
let addTask = () => {
  let info = taskInfo.value;
  let time = taskTime.value;
  if (info == "" || time == "") {
    alert("Empty fields aren't allowed");
  } else {
    let newTask = new Task(info, time, i);
    taskInfo.value = "";
    taskTime.value = "";
    tasks.unshift(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    let task = document.createElement("tr");
    task.innerHTML = `<td>${info}</td><td>${time}</td><td><button class="btn btn-secondary" id="t${i}"onclick="removeThis(this.id)" >remove</button></td>`;
    tBody.appendChild(task);
    i++;
  }
};

let checkTask = () => {
    setInterval(() => {
        let date = new Date()
        let time = `${date.getHours()}:${date.getMinutes()}`
        tasks.forEach(element => {
            if(element.time == time){
                alert(`Time for : ${element.info}`)
            }
        });
    }, 60000);
}
checkTask()
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});

delBtn.addEventListener("click", removeAll);
