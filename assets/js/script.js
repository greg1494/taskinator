var taskIdCounter = 0;


var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var pageContentE1 = document.querySelector("#page-content");


var taskFormHandler = function(event) {
 event.preventDefault();
var taskNameInput = document.querySelector("input[name='task-name']").value;
var taskTypeInput = document.querySelector("select[name='task-type']").value;

// check if input values are empty strings
if (taskNameInput === "" || taskTypeInput === "") {
    alert("You need to fill out the task form!");
    return false;
}

formE1.reset();

// package up data as an object 
var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
};


// send it as an argument to createTaskE1
createTaskE1(taskDataObj);
};

var createTaskActions = function(taskId) {
var actionContainerE1 = document.createElement("div");
actionContainerE1.className = "task-actions";

// create edit button
var editButtonE1 = document.createElement("button");
editButtonE1.textContent = "Edit";
editButtonE1.className = "btn edit-btn";
editButtonE1.setAttribute("data-task-id", taskId);

actionContainerE1.appendChild(editButtonE1);

// create delte button 
var deleteButtonE1 = document.createElement("button");
deleteButtonE1.textContent = "Delete";
deleteButtonE1.className = "btn delete-btn";
deleteButtonE1.setAttribute("data-task-id", taskId);

actionContainerE1.appendChild(deleteButtonE1);

var statusSelectE1 = document.createElement("select");
statusSelectE1.className = "status-select";
statusSelectE1.setAttribute("name", "status-change");
statusSelectE1.setAttribute("data-task-id", taskId);

actionContainerE1.appendChild(statusSelectE1);

var statusChoices = ["To Do", "In Progress", "Completed"];
for (var i = 0; i < statusChoices.length; i++) {
    // create option Element
    var statusOptionE1 = document.createElement("option");
    statusOptionE1.textContent = statusChoices[i];
    statusOptionE1.setAttribute("value", statusChoices[i]);

    // append to select
    statusSelectE1.appendChild(statusOptionE1);
}

return actionContainerE1;
};

var createTaskE1 = function(taskDataObj) {

// create list item
var listItemE1 = document.createElement("li");
listItemE1.className = "task-item";

// add task id as a custom attribute
listItemE1.setAttribute("data-task-id", taskIdCounter);


// create div to hold task info and add to list item
var taskInfoE1 = document.createElement("div");
// give it a class name 
taskInfoE1.className = "task-info";
// add html content to div
taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

listItemE1.appendChild(taskInfoE1);

console.dir(listItemE1);

var taskActionsE1 = createTaskActions(taskIdCounter);
listItemE1.appendChild(taskActionsE1);

// add entire list item to list
tasksToDoE1.appendChild(listItemE1);

// increase task counter for next unique id 
    taskIdCounter++;
};

formE1.addEventListener("click", taskFormHandler);


var taskButtonHandler = function(event) {
    // get target element from event
    var targetE1 = event.target;

    // edit button was clicked
    if (targetE1.matches(".edit-btn")) {
        // get the element's task id 
        var taskId = targetE1.getAttribute("data-task-id");
        editTask("taskId");
    }
    //delete button was clicked
    else if (targetE1.matches(".delete.btn")) {
        var taskId = targetE1.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var editTask = function(taskId) {
    console.log(taskId);

    // get task list item Element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("input[name='task-type']").value = taskName;

    // set data attribute to the form with a value of the task's id so it knows which one is being edited
    formEl.setAttribute("data-task-id", taskId);
  // update form's button to reflect editing a task rather than creating a new one
    formEl.querySelector("#save-task").textContent = "Save Task";
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

};

// Create a new task
formEl.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing the status
pageContentEl.addEventListener("change", taskStatusChangeHandler);
