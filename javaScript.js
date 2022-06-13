const forSubmit = document.querySelector("#getInput");
const input = document.querySelector("#todo-input");
const inUl = document.querySelector("#ul");
const filter = document.querySelector("#todo-search");


eventListener();

function eventListener(){
    forSubmit.addEventListener("submit",whenSubmit);
    document.addEventListener("DOMContentLoaded",loadTodosFromStorage);
    document.addEventListener("click",whenClickDeleteTodo);
    filter.addEventListener("keyup",filterTodos);
}

function filterTodos(e){
    const filtervalue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filtervalue) === -1){
            listItem.setAttribute("style","display: none !important")
        }
        else {
            listItem.setAttribute("style","display: block ")
        }
    })
}

function whenClickDeleteTodo(e){
    if(e.target.className === "fa-solid fa-delete-left"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    }
    console.log(e.target);
}

function loadTodosFromStorage(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addUI(todo);
    })
}

function deleteTodoFromStorage(whenClickDeleteTodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === whenClickDeleteTodo){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
    todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}


function whenSubmit(e){
    const newTodo = input.value;
    if(newTodo === ""){
        showAlert("danger","Lütfen Dolu bir Todo Girin")
    }
    else{
        showAlert("success","Girdiğiniz Todo Başarıyla Kaydedildi")
        addUI(newTodo);
        addTodoToStorage(newTodo);
        input.value = "";
    }
    
    e.preventDefault();
}

function addUI(newTodo){
    const li = document.createElement("li");
    const a = document.createElement("a");

    li.className = "list-group-item d-flex justify-content-between"
    li.appendChild(document.createTextNode(newTodo))
    a.href = "#";
    a.style.color = "black";
    a.innerHTML = '<i class="fa-solid fa-delete-left"></i>'
    li.appendChild(a);
    inUl.appendChild(li);
}

function showAlert(type,massage){
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = massage;
    forSubmit.appendChild(div)

    setTimeout(function(){
        div.remove();
    },1500)
}


/*
            <div class="alert alert-warning">
                A simple warning alert—check it out!
            </div>


            <li class="list-group-item d-flex justify-content-between">
                An item
                <a href="#" style="color: black;"><i class="fa-solid fa-delete-left"></i></a>
            </li>
*/