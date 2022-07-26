//Recuperamos todas las tareas que vayamos creando etiquetados con la clase .todo
const todos = document.querySelectorAll(".todo");
//Recuperamos todas las columnas asignables a nuestras tareas etiquetadas con la clase .status
const all_status = document.querySelectorAll(".status");
//Seteamos inicialmente una variable llamada draggableTodo a null para poder asignarsela a cualquier de la que recuperemos.
let draggableTodo = null;
//------------------------------------------

//Definimos la función que comienza al arrastrar un elemento
function dragStart() {
  //console.log("Acabo de empezar a arrastrar un elemento");
  //Le asignamos a la variable draggableTodo el valor this para que apunte directamente al elemento que queremos arrastrar
  draggableTodo = this;
}

//Definimos la función que comienza al soltar un evento
function dragEnd() {
  //console.log("Acabo de soltar un elemento");
  //Cuando lo dejamos de arrastrar lo seteamos de nuevo a null para soltarlo
  draggableTodo = null;
}

//Le asignamos a cada una de las tareas las funciones al comenzar a arrastrar y al terminar de arrastrar mediante los eventos nativos dragstart y dragend
todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});

//------------------------------------------

//Definimos la función que se ejecutará al detectar un elemento arrastrable encima
function dragOver(ev) {
  //console.log("Hay un elemento arrastrable encima");
  //Le borramos el comportamiento por defecto del evento para que pueda añadir un elemento "desactivado". Cuando estamos arrastrando un elemento no es el definitivo, por lo que no lo va a coger si no le desactivamos este comportamiento, ya que se esta esperando uno "activado"
  ev.preventDefault();
}

//Definimos la función que se ejecuta al detectar un elemento arrastrable dentro de la columna
function dragEnter() {
  //console.log("Acaba de entrar un elemento arrastrable");
  //Al introducir un elemento en la columna le vamos a meter unos estilos para que se vean los borders;
  this.style.border = "1px dashed #ff8906";
}

//Definimos la función que se ejecuta al detectar que un elemento arrastrable ha dejado la columna.
function dragLeave() {
  //console.log("Me acaban de soltar un elemento arrastrable");
   //Al sacar de la columna el elemento le quitaremos los estilos que le hemos definido antes al empezar el arrastre
  this.style.border = "none";
}

//Definimos la función que se ejecutará al detectar que han soltado un elemento arrastrable encima
function dragDrop() {
  //console.log("Acaban de soltar un elemento en esta columna");
  //Le añadimos como hijo gracias al DOM el elemento que estamos arrastrando a la columna detectada
  //Al soltar el elemento le quitaremos los estilos que le hemos definido antes al empezar el arrastre
  this.style.border = "none";
  this.appendChild(draggableTodo);

}

//Por cada una de las columnas asignables le añadimos un escuchador de eventos mediante el evento dragover que se activará en cuanto le pasemos por encima un elemento arrastrable, otro con el evento dragenter que se activará al introducir en cada una de las columnas un elemento arrastable y otro con el evento dragleave al perder un elemento arrastrable
all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

//-----------------------------------------------
//Recuperamos los botones de los modales, los cierres del modal y el overlay para mostrar una capa "opaca" por detrás
const btns = document.querySelectorAll("[data-target-modal]");
const close_modals = document.querySelectorAll(".close-modal");
const overlay = document.getElementById("overlay");

//Por cada uno de los botones le asignaremos un click que seteará la clase a activo para que se muestre el modal
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.targetModal).classList.add("active");
    overlay.classList.add("active");
  });
});

//Por cada uno de los botones de cierre eliminaremos mediante el evento click la clase para que se cierre el modal
close_modals.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
});
//Mediante el evento click en la ventana eliminaremos tambien las clases para al pulsar fuera de modal cerrarlo
window.onclick = (event) => {
  if (event.target == overlay) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => modal.classList.remove("active"));
    overlay.classList.remove("active");
  }
};

//---------------------------
//Recuperamos el botón de crear tarea
const todo_submit = document.getElementById("todo_submit");
//Le añadimos que mediante el evento click cree una nueva tarea
todo_submit.addEventListener("click", createTodo);

//Definimos la función de crear una nueva tarea
function createTodo () {
    //Creamos un div
    const todo_div = document.createElement("div");
    //Recuperamos el valor de input
    const input_val = document.getElementById("todo_input").value;
    //Creamos un nodo de texto con el valor del input
    const txt = document.createTextNode(input_val);

    //Le inyectamos el texto al div
    todo_div.appendChild(txt);
    //Le añadimos la clase todo
    todo_div.classList.add("todo");
    //Lo hacemos arrastrable
    todo_div.setAttribute("draggable", "true");
    
    //Creamos un span para meterle el botón para eliminar
    const span = document.createElement("span");
    //Le introducimos el simbolo de la X
    const span_txt = document.createTextNode("\u00D7");
    //Le añadimos la clase
    span.classList.add("close");
    //Le añadimos el texto como hijo
    span.appendChild(span_txt);


    //Le añadimos el span al div
    todo_div.appendChild(span);

    //Le decimos que todos tengan las acciones de arrastrar como la incial
    todo_div.addEventListener("dragstart", dragStart);
    todo_div.addEventListener("dragEnd", dragEnd);

    //En la nueva versión de JS nos permite atacar directamente a un id de esta forma, por lo que vamos a inyectarle el nuevo div generado a la columna de No Asignada a través de su id
    no_status.appendChild(todo_div);

    //Los spans de antes tendrán la acción al hacer click que hagan desaparecer las tareas al pulsar la X
    span.addEventListener("click", ()=> {
        span.parentElement.style.display = "none";
    })

    //Eliminamos las clases para que dejen de verse tanto el modal como el overlay cuando creemos la nueva tarea
    todo_form.classList.remove("active");
    overlay.classList.remove("active");
}

//Por cada uno de los botones de X vamos a hacer que desparezcan los elementos
const close_btns = document.querySelectorAll(".close");
close_btns.forEach(btn => {
btn.addEventListener("click", ()=> {
    btn.parentElement.style.display = "none";
})
})