// Declaracion de funciones.

function calculateNumberPages( numberPendingTasks, numberRunningTasks, numberCompletedTasks, numberTasksToDisplay ) {
    let numberPendingPagesInt = parseInt(numberPendingTasks / numberTasksToDisplay);
    let numberRunningPagesInt = parseInt(numberRunningTasks / numberTasksToDisplay);
    let numberFinishedPagesInt = parseInt(numberCompletedTasks / numberTasksToDisplay);
    
    if ( ( numberPendingTasks/numberTasksToDisplay ) > numberPendingPagesInt ) numberPendingPagesInt +=1;
    if ( ( numberRunningTasks/numberTasksToDisplay ) > numberRunningPagesInt ) numberRunningPagesInt +=1;
    if ( ( numberCompletedTasks/numberTasksToDisplay ) > numberFinishedPagesInt ) numberFinishedPagesInt +=1;

    if ( numberPendingPagesInt >= numberRunningPagesInt && numberPendingPagesInt >= numberFinishedPagesInt ) return numberPendingPagesInt;
    if ( numberRunningPagesInt >= numberPendingPagesInt && numberRunningPagesInt >= numberFinishedPagesInt ) return numberRunningPagesInt;
    return numberFinishedPagesInt;
}

function pagination( cant1, cant2, cant3, numberTasksToDisplay ) {
    let pages = calculateNumberPages(cant1, cant2, cant3, numberTasksToDisplay);

    let html = "";

    for ( let i = 0; i < pages; i++ ) {
        html += `
            <a href="index.html?page=${i+1}">${i+1}</a>
        `;
    }

    cmpCntPagination.innerHTML = html;
}

let idNextToShow = (initialId) => initialId == 1 ? 0 : initialId - 1;

function showTasksPending(initialId) {
    let html = "<h2>Tareas Pendientes.</h2>";

    let nextToShow = idNextToShow(initialId)

    for (let i = 0; i < 5; i++) {
        if (pendingTasks[nextToShow] != undefined) {
            html += `
                <div class="tareasPendientes--task">
                    <h3 class="titleTask"><span><img class="iconTask" src="favicon.png"></span>${pendingTasks[nextToShow].taskTitle}</h3>
                    <p class="despcrTask">${pendingTasks[nextToShow].description}</p>
                </div>
            `;
        }
        nextToShow++;
    }
    cmpCntPendingTasks.innerHTML = html;
}

function showTasksRunning(initialId) {
    let html = "<h2>Tareas en ejecucion.</h2>";

    let nextToShow = idNextToShow(initialId)

    for (let i = 0; i < 5; i++) {
        if (runningTasks[nextToShow] != undefined) {
            html += `
                <div class="tareasEjecucion--task">
                    <h3 class="titleTask"><span><img class="iconTask" src="favicon.png"></span>${runningTasks[nextToShow].taskTitle}</h3>
                    <p class="despcrTask">${runningTasks[nextToShow].description}</p>
                </div>
            `;
        }
        nextToShow++;
    }
    cmpCntExecutionTasks.innerHTML = html;
}

function showTasksCompleted(initialId) {
    let html = "<h2>Tareas Finalizadas.</h2>";

    let nextToShow = idNextToShow(initialId)

    for (let i = 0; i < 5; i++) {
        if (completedTasks[nextToShow] != undefined) {
            html += `
                <div class="tareasFinalizadas--task">
                    <h3 class="titleTask"><span><img class="iconTask" src="favicon.png"></span>${completedTasks[nextToShow].taskTitle}</h3>
                    <p class="despcrTask">${completedTasks[nextToShow].description}</p>
                </div>
            `;
        }
        nextToShow++;
    }
    cmpCntCompletedTasks.innerHTML = html;
}

function showTasks() {
    let urlParams = new URLSearchParams(parameterValues);
    let pageNumber = 1;

    if ( urlParams.has('page') ) pageNumber = urlParams.get('page');

    console.log(pageNumber);

    let initialId = 1 + (DISPLAYTASK * (pageNumber-1));
    console.log(initialId);

    showTasksPending(initialId, pendingTasks.length);
    showTasksRunning(initialId, runningTasks.length);
    showTasksCompleted(initialId, completedTasks.length);
}

function newTask(id, taskTitle, description, status) {
    return {"id": id, "taskTitle": taskTitle, "description": description, "status": status};
}

function createTask(taskTitle, description, status) {
    console.log("Create Task");
    let nextId = 0;
    if ( status == "pending") {
        nextId = pendingTasks[pendingTasks.length - 1];
        pendingTasks.push(newTask(nextId, taskTitle, description, status))
        console.log(pendingTasks);
    }
    if ( status == "running") {
        nextId = runningTasks[runningTasks.length - 1];
        runningTasks.push(newTask(nextId, taskTitle, description, status))
    }
    if ( status == "completed") {
        nextId = completedTasks[completedTasks.length - 1];
        completedTasks.push(newTask(nextId, taskTitle, description, status))
    }
}

// Declaracion de funciones.