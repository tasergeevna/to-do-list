const addTaskButton = document.querySelector(".add-task");
const addListButton = document.querySelector(".add-list");
const taskInput = document.querySelector(".task-input");
const listInput = document.querySelector(".list-input");
const container = document.querySelector(".lists-container");
// const ordinaryLists = document.querySelector(".ordinary-lists");

const mainObject = {
    "General": [],
    "Done": []
};


const rendering = (mainObject) => {
    container.innerHTML = "";

    const {listGenContainer, listGeneral, listGenButton, showDoneButton} = generalListRendering();
    container.appendChild(listGenContainer);
    listGenButton.addEventListener("click", (event) => {
        event.preventDefault();
        listGeneral.innerHTML = "";
    })

    showDoneButton.addEventListener("click", (event) => {
        event.preventDefault();
        for (let i = 0; i < mainObject["Done"].length; i++) {
            const {taskItem, taskCheckbox, deleteTaskButton} = taskRendering();
            taskItem.textContent = mainObject["Done"][i].name;
            taskItem.classList.add("done-item");
            taskCheckbox.checked = true;
            taskCheckbox.disabled = true;
            listGeneral.appendChild(taskItem);
            taskItem.prepend(taskCheckbox, deleteTaskButton);
        }
    })
    
    for (let i = 0; i < mainObject["General"].length; i++) {
        const {taskItem, taskCheckbox, deleteTaskButton, taskText} = taskRendering();
        taskText.textContent = mainObject["General"][i].name;
        taskCheckbox.checked = false;
        taskCheckbox.addEventListener("change", (event) => {
            if (event.target.checked) {
                mainObject["Done"].push(mainObject["General"][i]);
                mainObject["General"].splice(i, 1);
                rendering(mainObject);
            }
        })
        deleteTaskButton.addEventListener("click", (event) => {
            event.preventDefault();
            mainObject["General"].splice(i, 1);
            rendering(mainObject);
        })
        listGeneral.appendChild(taskItem);
        taskItem.prepend(taskCheckbox, taskText, deleteTaskButton);
    }

    if (Object.keys(mainObject).length > 2) {
        ordinaryLists = document.createElement("div");
        ordinaryLists.classList.add("ordinary-lists");
        container.appendChild(ordinaryLists);

        for (let key in mainObject) {
            if (key !== "General" && key !== "Done") {
                const {listContainer, listHeadline, listDelete}  = listRendering();
                listHeadline.textContent = key;
                ordinaryLists.appendChild(listContainer);
                listContainer.prepend(listHeadline, listDelete); 
                listDelete.addEventListener("click", (event) => {
                    event.preventDefault();
                    ordinaryLists.removeChild(listContainer);
                })
            
            }
        }
    }
    
}


const generalListRendering = () => {
    const listTemp = document.querySelector("#list-general");
    const listClone = listTemp.content.cloneNode(true);
    const listGenContainer = listClone.querySelector(".list-container");
    const listGeneral = listGenContainer.querySelector(".general-list");
    const listGenHeadline = listGenContainer.querySelector(".headline");
    const listGenButton = listGenContainer.querySelector(".clear-button");
    const showDoneButton = listGenContainer.querySelector(".done-button");
    return {listGenContainer, listGenHeadline, listGenButton, showDoneButton, listGeneral}
}

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
    const listDelete = listContainer.querySelector(".delete-button");
    return {listContainer, listHeadline, listDelete}
}

rendering(mainObject);


