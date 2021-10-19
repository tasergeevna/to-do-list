const addTaskButton = document.querySelector(".add-task");
const addListButton = document.querySelector(".add-list");
const taskInput = document.querySelector(".task-input");
const listInput = document.querySelector(".list-input");
const container = document.querySelector(".lists-container");
const ordinaryLists = document.querySelector(".ordinary-lists");


const mainObject = {
    "General": [
        {name: "task1", status: false},
        {name: "task2", status: false}
    ],
    "Done": [
        {name: "task3", status: true}
    ]
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
            listGeneral.appendChild(taskItem);
        taskItem.prepend(taskCheckbox, deleteTaskButton);
        }
    })
    
    for (let i = 0; i < mainObject["General"].length; i++) {
        const {taskItem, taskCheckbox, deleteTaskButton} = taskRendering();
        taskItem.textContent = mainObject["General"][i].name;
        taskCheckbox.checked = false;
        
        taskCheckbox.addEventListener("change", (event) => {
            if (event.target.checked) {
                mainObject["Done"].push(mainObject["General"][i]);
                mainObject["General"].splice(i, 1);
                rendering(mainObject);
            }
        })
        
        listGeneral.appendChild(taskItem);
        taskItem.prepend(taskCheckbox, deleteTaskButton);
       
        
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
    const deleteTaskButton = taskClone.querySelector(".task-delete");
    return {taskItem, taskCheckbox, deleteTaskButton};
}

rendering(mainObject);


/*
taskInput.addEventListener("change", updateTask);

listInput.addEventListener("change", updateList);

// for (let key in mainObject) {    

addTaskButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (taskInput.value == "") {
        alert("Write smthng!")
    } else {
        mainObject["General"][i].name =  taskInput.value;
        mainObject["General"][i].status = false;
        taskInput.value = ""; 
        rendering(mainObject);
    }
})



addListButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (listInput.value == "") {
        alert("Write smthng!")
    } else {
        let j = listInput.value;
        mainObject[j] = [];
        listInput.value = "";
        rendering(mainObject);
    }
})


//ordinaryLists.appendChild(listContainer);
//listContainer.prependChild(listHeadline);



const listRendering = () => {
    const listTemp = document.querySelector("#list-temp");
    const listClone = listTemp.content.cloneNode(true);
    const listContainer = listClone.querySelector(".list-container");
    const listHeadline = listContainer.querySelector(".headline");
    return {listContainer, listHeadline}
}




function updateTask(event) {
    taskInput.textContent = event.target.value;
}

function updateList(event) {
    listInput.textContent = event.target.value;
}
*/