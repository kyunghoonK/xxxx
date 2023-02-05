// 유저가 값을 입력한다
// +버튼을 클릭하면, 할일이 추가된다
// delete버튼을 누르면 할일이 삭제된다
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 true를 false로 바꿔준다
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로

// 진행중 탭을 누르면, 언더바가 이동한다
// 끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.querySelector(".task-input");
let addButton = document.querySelector(".add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("mousedown", addTask);

// 엔터 눌렀을때 실행
taskInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      addTask(event);
    }
  });

for(let i=1; i<tabs.length;i++){
    tabs[i].addEventListener("click", function (event) {
        filter(event);
    });
}

function addTask() {
    let task = {
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    };
    taskList.push(task);
    console.log(taskList);
    taskInput.value = "";
    render();
}

function render() {
    let list = [];
    if(mode == "all"){
        list = taskList;
    }else if(mode == "ongoing" || mode == "done"){
        list = filterList;
    }

    let resultHTML = '';
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML+=`<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`
        }else{
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

// check 버튼
function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render()
    console.log(taskList);
}

// delete 버튼
function deleteTask(id){
    for(i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    render();
}

function filter(event){
    if(event){
        mode = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) +"px";
    }

    filterList = [];
    if(mode == "all"){
        render()
    }else if(mode == "ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        render();
    }else if(mode == "done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
    console.log(filterList);
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}