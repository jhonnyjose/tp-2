window.onload = function(){
    init();
};

var db, input, ul;

function init (){
  db = new Dexie("todos-dexie");
  input = document.querySelector('input');
  ul = document.querySelector('ul');

  // Ejecutar en el enter
  input.addEventListener("keyup", function(event) {
    // Numero 13 refiere a "Enter" en el teclado
    if (event.keyCode === 13) {
        // Evitamos el comportamiento default
        event.preventDefault();
        // Disparamos la accion
        onSubmit(event);
    }
  });
  document.body.addEventListener('submit', onSubmit);
  document.body.addEventListener('click', onClick);

  db.version(1).stores({ todo: '_id' })
  db.open()
    .then(refreshView);
}

function onClick(e) {
    e.preventDefault();
    if (e.target.hasAttribute('id')) {
        db.todo.where('_id').equals(e.target.getAttribute('id')).delete()
        .then(refreshView);
    }
}

function onSubmit(e) {
    e.preventDefault();
    db.todo.put({ text: input.value, _id: String(Date.now()) })
        .then(function() {
            input.value = '';
        })
        .then(refreshView);
}

function refreshView() {
    return db.todo.toArray()
        .then(renderAllTodos);
}

function renderAllTodos(todos) {
    var html = '';
    todos.forEach(function(todo) {
        html += todoToHtml(todo);
    });
    ul.innerHTML = html;
}

function todoToHtml(todo) {
    return '<li><button id="'+todo._id+'" class="btn btn-link bi bi-trash"></button>'+todo.text+'</li>';
}