const addTaskButton = document.querySelector(".add-task");
const addListButton = document.querySelector(".add-list");
const taskInput = document.querySelector(".task-input");
const listInput = document.querySelector(".list-input");
const generalList = document.querySelector(".general-list");
const ordinaryLists = document.querySelector(".ordinary-lists");
const deleteList = document.querySelector(".delete-button");
const clearGeneralButton = document.querySelector(".clear-button");


const taskRendering = () => {
    const taskTemp = document.querySelector("#task-temp");
    const taskClone = taskTemp.content.cloneNode(true);
    const taskItem = taskClone.querySelector(".item");
    const taskCheckbox = taskClone.querySelector(".task-checkbox");
    const deleteTaskButton = taskClone.querySelector(".task-delete");
    return {taskItem, taskCheckbox, deleteTaskButton};
}


addTaskButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (taskInput.value == "") {
        alert("Write smthng!")
    }
    const {taskItem, taskCheckbox, deleteTaskButton} = taskRendering();
    taskInput.addEventListener("change", updateTask);
    taskItem.textContent = taskInput.value;
    taskInput.value = "";
    generalList.appendChild(taskItem);
    taskItem.prepend(taskCheckbox, deleteTaskButton);
})

const listRendering = () => {
    const listTemp = document.querySelector("#list-temp");
    const listClone = listTemp.content.cloneNode(true);
    const listContainer = listClone.querySelector(".list-container");
    const listHeadline = listContainer.querySelector(".headline");
    return {listContainer, listHeadline}
}


addListButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (listInput.value == "") {
        alert("Write smthng!")
    }
    const {listContainer, listHeadline} = listRendering();
    listInput.addEventListener("change", updateList);
    listHeadline.textContent = listInput.value;
    listInput.value = "";
    ordinaryLists.appendChild(listContainer);
    listContainer.prependChild(listHeadline);
})


function updateTask(event) {
    taskInput.textContent = event.target.value;
}

function updateList(event) {
    listInput.textContent = event.target.value;
}


clearGeneralButton.addEventListener("click", () => {
    const {taskItem} = taskRendering();
    if (generalList.contains(taskItem)) {
        generalList.remove(taskItem)
    };
})




