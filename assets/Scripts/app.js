document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    var nombreInput = document.getElementById('nombre');
    var emailInput = document.getElementById('email');
    var tareasList = document.getElementById('tareas-list');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var nombre = nombreInput.value;
        var email = emailInput.value;

        if (nombre.trim() === '' || email.trim() === '') {
            alert('Por favor, complete todos los campos');
            return;
        }

        var tarea = {
            nombre: nombre,
            email: email
        };

        var tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        tareas.push(tarea);
        localStorage.setItem('tareas', JSON.stringify(tareas));

        nombreInput.value = '';
        emailInput.value = '';

        mostrarTareas();
        alert('Tarea guardada correctamente');
    });

    function mostrarTareas() {
        tareasList.innerHTML = '';

        var tareas = JSON.parse(localStorage.getItem('tareas')) || [];

        tareas.forEach(function (tarea, index) {
            var li = document.createElement('li');
            li.textContent = 'Nombre: ' + tarea.nombre + ', Email: ' + tarea.email;

            var eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.className = 'eliminar-btn';
            eliminarBtn.addEventListener('click', function () {
                eliminarTarea(index);
            });

            li.appendChild(eliminarBtn);
            tareasList.appendChild(li);
        });
    }

    function eliminarTarea(index) {
        var tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        tareas.splice(index, 1);
        localStorage.setItem('tareas', JSON.stringify(tareas));
        mostrarTareas();
        alert('Tarea eliminada correctamente');
    }

    mostrarTareas();
});

