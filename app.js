const addTaskButton = document.querySelector(".add-task");
const addListButton = document.querySelector(".add-list");
const taskInput = document.querySelector(".task-input");
const listInput = document.querySelector(".list-input");
const container = document.querySelector(".lists-container");

const mainObject = {
    "General": [],
    "Done": []
};


// Page rendering

let j;

const rendering = (mainObject) => {
    container.innerHTML = "";
    
    for (let key in mainObject) {
        const {listContainer, listHeadline, listDelete, listClearButton, showDoneButton, list}  = listRendering();
        
        if (key !== "Done") {
            for (let i = 0; i < mainObject[key].length; i++) {
                const {taskItem, taskCheckbox, deleteTaskButton, taskText} = taskRendering();
                taskText.textContent = mainObject[key][i].name;
                taskItem.addEventListener("dragstart", (event) => {
                    event.target.classList.add("hold");
                    setTimeout(() => {
                        event.target.classList.add("display-none");
                    }, 0);
                    j = {
                        taskItem,
                        name: taskText.textContent,
                        i,
                        key
                    };
                });
                taskItem.addEventListener("dragend", dragend);
                taskCheckbox.checked = false;
                taskCheckbox.addEventListener("change", (event) => {
                    if (event.target.checked) {
                        mainObject["Done"].push(mainObject[key][i]);
                        mainObject[key].splice(i, 1);
                        rendering(mainObject);
                    }
                })
                deleteTaskButton.addEventListener("click", (event) => {
                    event.preventDefault();
                    mainObject[key].splice(i, 1);
                    rendering(mainObject);
            })
                list.appendChild(taskItem);
                taskItem.prepend(taskCheckbox, taskText, deleteTaskButton);
            }
            listContainer.addEventListener("dragover", dragover);
            listContainer.addEventListener("dragenter", () => {
                listContainer.classList.add("hovered");
            })
            listContainer.addEventListener("dragleave", dragleave)
            listContainer.addEventListener("drop", () => {
                listContainer.classList.remove("hovered");
                mainObject[j.key].splice(j.i, 1);
                mainObject[key].push(
                    {name: j.name, status: false} 
                );
                list.append(j.taskItem);
                j = null;
                rendering(mainObject);
            })
            listHeadline.textContent = key;
            if (key === "General") {
                listHeadline.textContent = "General";
                listContainer.classList.add("general-container");
                container.appendChild(listContainer);
                listContainer.removeChild(listDelete);
                listClearButton.addEventListener("click", (event) => {
                    event.preventDefault();
                    list.innerHTML = "";
                    mainObject["General"].length = 0;
                })
                showDoneButton.addEventListener("click", (event) => {
                    event.preventDefault();
                    for (let i = 0; i < mainObject["Done"].length; i++) {
                        const {taskItem, taskCheckbox, deleteTaskButton, taskText} = taskRendering();
                        taskText.textContent = mainObject["Done"][i].name;
                        taskItem.classList.add("done-item");
                        taskCheckbox.checked = true;
                        taskCheckbox.disabled = true;
                        deleteTaskButton.disabled = true;
                        taskItem.removeAttribute(draggable="true");
                        list.appendChild(taskItem);
                        taskItem.prepend(taskCheckbox, taskText, deleteTaskButton);
                    }
                }) 
                if (Object.keys(mainObject).length > 2) {
                    ordinaryLists = document.createElement("div");
                    ordinaryLists.classList.add("ordinary-lists");
                    container.appendChild(ordinaryLists);
                }
            } else {
                    ordinaryLists.appendChild(listContainer);
                    listHeadline.classList.add("headline-ordinary");
                    listContainer.prepend(listHeadline, list, listDelete); 
                    listContainer.removeChild(listClearButton);
                    listContainer.removeChild(showDoneButton);
                    listDelete.addEventListener("click", (event) => {
                        event.preventDefault();
                        delete mainObject[key];
                        ordinaryLists.removeChild(listContainer);
                    })
            }
        }
    }
    
}


// Extracting from templates


const taskRendering = () => {
    const taskTemp = document.querySelector("#task-temp");
    const taskClone = taskTemp.content.cloneNode(true);
    const taskItem = taskClone.querySelector(".item");
    const taskCheckbox = taskClone.querySelector(".task-checkbox");
    const taskText = taskClone.querySelector(".item-text");
    const deleteTaskButton = taskClone.querySelector(".task-delete");
    return {taskItem, taskCheckbox, deleteTaskButton, taskText};
}


taskInput.addEventListener("change", updateTask);


function updateTask(event) {
    taskInput.textContent = event.target.value;
}

addTaskButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (taskInput.value == "") {
        alert("Write smthng!")
    } else {
        mainObject["General"].push({name: taskInput.value, status: false})
        taskInput.value = ""; 
        rendering(mainObject);
    }
})

listInput.addEventListener("change", updateList);

function updateList(event) {
    listInput.textContent = event.target.value;
}


addListButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (listInput.value == "") {
        alert("Write smthng!")
    } else {
        mainObject[listInput.value] = [];
        listInput.value = "";
        rendering(mainObject);
    }
})

const listRendering = () => {
    const listTemp = document.querySelector("#list-temp");
    const listClone = listTemp.content.cloneNode(true);
    const listContainer = listClone.querySelector(".list-container");
    const listHeadline = listContainer.querySelector(".headline");
    const listClearButton = listContainer.querySelector(".clear-button");
    const showDoneButton = listContainer.querySelector(".done-button");
    const listDelete = listContainer.querySelector(".delete-button");
    const list = listContainer.querySelector(".list");
    return {listContainer, listHeadline, listDelete, listClearButton, showDoneButton, list}
}


// Moving tasks

function dragend(event) {
    event.target.classList.remove("hold");
    event.target.classList.remove("display-none");
}

function dragover(event) {
    event.preventDefault();
}

function dragleave(event) {
    event.target.classList.remove("hovered");
}


rendering(mainObject);
