//Elementos importantes
const taskList = document.getElementById("task-list");
const inputId = document.getElementById("input-id");
const btnAdd = document.getElementById("btn-add");

// Clase tarea

class Task {
    constructor(id, text, isCompleted = false){
        this.id = id;
        this.text = text;
        this.isCompleted = isCompleted;
        this.element = null;

        this.createElement();
    }

    createElement(){
        let li = document.createElement("li")
        li.className = "task-item";
        if (this.isCompleted){
            li.classList.add('done')
        }
        li.innerHTML=`
            <div class="task-container">
                <button class="btn-check">✓</button>
                <span class="task-name">${this.text}</span>
            </div>                
            <button class="btn-delete">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button>
        `

        const btnCheck = li.querySelector(".btn-check");
        const btnDelete = li.querySelector(".btn-delete");
        btnCheck.addEventListener("click", () => this.finishTask());
        btnDelete.addEventListener("click", () => this.deleteTask());

        this.element = li; 
    }

    finishTask(){
        this.isCompleted = !this.isCompleted;
        this.saveToLocalStorage();
        this.element.classList.toggle("done");
    }

    deleteTask(){
        localStorage.removeItem('task_'+this.id)
        this.element.remove();
    }

    saveToLocalStorage(){
        const data = {
            text: this.text,
            isCompleted: this.isCompleted
        }
        localStorage.setItem('task_'+this.id, JSON.stringify(data))
    }
    

}

// Añadir tareas

function addTask(){
    const id = new Date().getTime();
    const taskText = inputId.value.trim();

    if (taskText !== ""){
        const taskToAdd = new Task(id, taskText);
        taskToAdd.saveToLocalStorage()
        taskList.prepend(taskToAdd.element)
        inputId.value = "";
    }
}

function loadTask(){

    for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        
        if (key.startsWith('task_')){
            const id = key.replace('task_','')
            const data = JSON.parse(localStorage.getItem(key))
            const loadedTask = new Task(id, data.text, data.isCompleted);
            taskList.prepend(loadedTask.element)
            
        }
    }

}

loadTask()