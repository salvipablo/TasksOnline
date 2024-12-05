// Declaracion de variables.

const cmpCntPagination = document.getElementById("cntPagination");
const cmpCntPendingTasks = document.getElementById("tareasPendientes");
const cmpCntExecutionTasks = document.getElementById("tareasEjecucion");
const cmpCntCompletedTasks = document.getElementById("tareasFinalizadas");
const DISPLAYTASK = 5;
const parameterValues = window.location.search;

// Declaracion de variables.

// Programa

// createTask("Tarea 20", "Des 20", "pending");
// createTask("Tarea 21", "Des 21", "pending");

// createTask("Tarea 22", "Des 22", "running");
// createTask("Tarea 23", "Des 23", "running");
// createTask("Tarea 26", "Des 26", "running");
// createTask("Tarea 27", "Des 27", "running");

// createTask("Tarea 28", "Des 28", "running");
// createTask("Tarea 29", "Des 29", "running");
// createTask("Tarea 30", "Des 30", "running");
// createTask("Tarea 31", "Des 31", "running");
// createTask("Tarea 32", "Des 32", "running");
// createTask("Tarea 33", "Des 33", "running");


// createTask("Tarea 24", "Des 24", "completed");
// createTask("Tarea 25", "Des 25", "completed");

showTasks();

pagination(pendingTasks.length, runningTasks.length, completedTasks.length, DISPLAYTASK );

// Programa