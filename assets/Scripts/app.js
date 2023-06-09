document.addEventListener('DOMContentLoaded', function () {
    //Obtener referencias a los elementos del DOM
    var form = document.querySelector('form');
    var nombreInput = document.getElementById('nombre');
    var emailInput = document.getElementById('email');
    var tareasList = document.getElementById('tareas-list');

    //Agregar un evento de escucha al formulario para guardar una tarea
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        //Obtener los valors de los campos de entrada
        var nombre = nombreInput.value;
        var email = emailInput.value;

        //Validar que los campos no esten vacios
        if (nombre.trim() === '' || email.trim() === '') {
            alert('Por favor, complete todos los campos');
            return;
        }

        //Crea un objeto tarea con los valores ingresados
        var tarea = {
            nombre: nombre,
            email: email
        };

        //obtener las tareas existentes del almacenamiento local o inicializar un arreglo vacio
        var tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        //Agregar la nueca tarea al arreglo de tareas
        tareas.push(tarea);
        //Guardar las tareas actualizadas en local storage
        localStorage.setItem('tareas', JSON.stringify(tareas));

        //Limpiar los campos de entrada
        nombreInput.value = '';
        emailInput.value = '';

        //Mostrar las tareas actualizadas
        mostrarTareas();
        //mostrar un mensaje de confirmacion
        alert('Tarea guardada correctamente');
    });

    //Funcion para mostrar las taras en la lista
    function mostrarTareas() {
        tareasList.innerHTML = '';

        //Obtener las tareas del almacenamiento local o un arreglo vacio si no hay tareas guardadas
        var tareas = JSON.parse(localStorage.getItem('tareas')) || [];

        //Iterar sobre las tareas y crear elementos li para cada una
        tareas.forEach(function (tarea, index) {
            var li = document.createElement('li');
            li.textContent = 'Nombre: ' + tarea.nombre + ', Email: ' + tarea.email;

            //Crear el botton eliminar para cada tarea
            var eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.className = 'eliminar-btn';
            eliminarBtn.addEventListener('click', function () {
                eliminarTarea(index);
            });

            // Agregar el botón "Eliminar" al elemento <li> de la tarea
            li.appendChild(eliminarBtn);

            // Agregar el elemento <li> a la lista de tareas
            tareasList.appendChild(li);
        });
    }

    // Funcion para eliminar una tarea
    function eliminarTarea(index) {
        // Obtener las tareas del almacenamiento local o un arreglo vacío si no hay tareas guardadas
        var tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        // Eliminar la tarea correspondiente del arreglo de tareas
        tareas.splice(index, 1);
        // Guardar las tareas actualizadas en el almacenamiento local
        localStorage.setItem('tareas', JSON.stringify(tareas));
        mostrarTareas();
        alert('Tarea eliminada correctamente');
    }

    mostrarTareas();
});

