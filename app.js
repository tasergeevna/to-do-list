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
                taskItem.setAttribute("data-key", key);
                taskItem.setAttribute("data-index", i);
                taskItem.addEventListener("dragstart", dragstart);
                taskItem.addEventListener("dragend", dragend);
                taskCheckbox.checked = false;
                taskCheckbox.addEventListener("change", checkboxChange);
                deleteTaskButton.addEventListener("click", deleteTask);
                list.appendChild(taskItem);
                taskItem.prepend(taskCheckbox, taskText, deleteTaskButton);
            }
            listContainer.addEventListener("dragover", dragover);
            listContainer.setAttribute("data-key", key);
            listContainer.addEventListener("dragenter", dragenter);
            listContainer.addEventListener("dragleave", dragleave);
            listContainer.addEventListener("drop", dragdrop);
            listHeadline.textContent = key;
            if (key === "General") {
                listHeadline.textContent = "General";
                listContainer.classList.add("general-container");
                container.appendChild(listContainer);
                list.classList.add("done-list");
                listContainer.prepend(listHeadline, list);
                listContainer.removeChild(listDelete);
                listClearButton.addEventListener("click", clearGeneralList);
                showDoneButton.addEventListener("click", showDoneTasks);
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
                    listDelete.addEventListener("click", deleteList);
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


// Drag`n`drop listeners 

function dragstart(event) {
    event.target.classList.add("hold");
    setTimeout(() => {
        event.target.classList.add("display-none");
    }, 0);
    j = {
        taskItem: event.target,
        name: event.target.textContent
    }
}

function dragend(event) {
    event.target.classList.remove("hold");
    event.target.classList.remove("display-none");
}

function dragover(event) {
    event.preventDefault();
}

function dragenter(event) {
    event.currentTarget.classList.add("hovered");
}

function dragleave(event) {
    event.target.classList.remove("hovered");
}

function dragdrop(event) {
    event.target.classList.remove("hovered");
    mainObject[j.taskItem.dataset.key].splice(j.taskItem.dataset.i, 1);
    mainObject[event.currentTarget.dataset.key].push(
        {name: j.name, status: false} 
    );
    event.target.parentNode.append(j.taskItem);
    j = null;
    rendering(mainObject);
}

// Buttons and checkboxes listeners

function checkboxChange(event) {
    if (event.target.checked) {
        let root = event.target.parentNode.dataset;
        mainObject["Done"].push(mainObject[root.key][root.index]);
        mainObject[root.key].splice(root.index, 1);
        rendering(mainObject);
    }
}

function deleteTask(event) {
    event.preventDefault();
    let root = event.target.parentNode;
    mainObject[root.parentNode.dataset.key].splice(root.dataset.index, 1);
    rendering(mainObject);
}

function clearGeneralList(event) {
    event.preventDefault();
    mainObject["General"].length = 0;
    rendering(mainObject);
}

function showDoneTasks(event) {
    event.preventDefault();
    doneList = document.querySelector(".done-list");
    for (let i = 0; i < mainObject["Done"].length; i++) {
        const {taskItem, taskCheckbox, deleteTaskButton, taskText} = taskRendering();
        taskText.textContent = mainObject["Done"][i].name;
        taskItem.classList.add("done-item");
        taskCheckbox.checked = true;
        taskCheckbox.disabled = true;
        deleteTaskButton.disabled = true;
        taskItem.removeAttribute(draggable="true");
        doneList.appendChild(taskItem);
        taskItem.prepend(taskCheckbox, taskText, deleteTaskButton);
    }
}


function deleteList(event) {
    event.preventDefault();
    let root = event.target.parentNode;
    delete mainObject[root.dataset.key];
    root.parentNode.removeChild(root);
}


rendering(mainObject);
