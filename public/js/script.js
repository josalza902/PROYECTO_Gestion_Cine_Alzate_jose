document.addEventListener('DOMContentLoaded', async () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const dashboardPanels = document.querySelectorAll('.dashboard-panel');
    const cineFormModal = document.getElementById('cineFormModal');
    const addCineBtn = document.getElementById('addCineBtn');
    const closeButton = document.querySelector('.close-button');
    const cineForm = document.getElementById('cineForm');
    const cinesTableBody = document.getElementById('cinesTableBody');

    // Manejo de la navegación entre paneles (mantener esta parte)
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.dataset.target;

            navButtons.forEach(btn => btn.classList.remove('active'));
            dashboardPanels.forEach(panel => panel.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Función para mostrar el modal del formulario
    function openModal() {
        cineFormModal.style.display = 'block';
    }

    // Función para cerrar el modal del formulario
    window.closeModal = () => {
        cineFormModal.style.display = 'none';
        clearCineForm(); // Limpiar el formulario al cerrar
    };

    // Eventos para abrir y cerrar el modal
    addCineBtn.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);

    // Cierra el modal si se hace clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === cineFormModal) {
            closeModal();
        }
    });

    // Lógica para el formulario de Cines
    cineForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cineId = document.getElementById('cineId').value;
        const codigoCine = document.getElementById('codigoCine').value;
        const nombreCine = document.getElementById('nombreCine').value;
        const direccionCine = document.getElementById('direccionCine').value;
        const ciudadCine = document.getElementById('ciudadCine').value;

        if (cineId) {
            // Lógica para actualizar (simulado)
            alert(`Actualizando Cine: ID ${cineId}, Código: ${codigoCine}`);
            updateCineInTable(cineId, codigoCine, nombreCine, direccionCine, ciudadCine);
        } else {
            // Lógica para crear un nuevo cine (simulado)
            const newId = Date.now();
            alert(`Creando Nuevo Cine: ID ${newId}, Código: ${codigoCine}`);
            addCineToTable(newId, codigoCine, nombreCine, direccionCine, ciudadCine);
        }
        closeModal();
    });

    // Función para añadir un cine a la tabla (solo frontend)
    function addCineToTable(id, codigo, nombre, direccion, ciudad) {
        const newRow = cinesTableBody.insertRow();
        newRow.innerHTML = `
            
            <td>${codigo}</td>
            <td>${nombre}</td>
            <td>${direccion}</td>
            <td>${ciudad}</td>
            <td class="table-actions">
                <button class="btn btn-edit" onclick="editCine(${id}, '${codigo}', '${nombre}', '${direccion}', '${ciudad}')"><i class="fas fa-edit"></i></button>
                <button class="btn btn-delete" onclick="deleteCine(${id})"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;
    }

    // Función para actualizar un cine en la tabla (solo frontend)
    function updateCineInTable(id, codigo, nombre, direccion, ciudad) {
        const rows = cinesTableBody.querySelectorAll('tr');
        rows.forEach(row => {
            if (row.children[0].textContent == id) {
                row.children[1].textContent = codigo;
                row.children[2].textContent = nombre;
                row.children[3].textContent = direccion;
                row.children[4].textContent = ciudad;
            }
        });
    }

    // Funciones globales (para ser accesibles desde el HTML)
    window.editCine = (id, codigo, nombre, direccion, ciudad) => {
        document.getElementById('cineId').value = id;
        document.getElementById('codigoCine').value = codigo;
        document.getElementById('nombreCine').value = nombre;
        document.getElementById('direccionCine').value = direccion;
        document.getElementById('ciudadCine').value = ciudad;
        document.querySelector('.form-card h4').textContent = 'Editar Cine';
        document.querySelector('#cineForm button[type="submit"]').textContent = 'Actualizar Cine';
        openModal();
    };

    window.deleteCine = (id) => {
        if (confirm(`¿Estás seguro de que deseas eliminar el cine con ID: ${id}?`)) {
            alert(`Eliminando Cine con ID: ${id}`);
            const rows = cinesTableBody.querySelectorAll('tr');
            rows.forEach(row => {
                if (row.children[0].textContent == id) {
                    row.remove();
                }
            });
        }
    };

    window.clearCineForm = () => {
        document.getElementById('cineId').value = '';
        document.getElementById('codigoCine').value = '';
        document.getElementById('nombreCine').value = '';
        document.getElementById('direccionCine').value = '';
        document.getElementById('ciudadCine').value = '';
        document.querySelector('.form-card h4').textContent = 'Añadir/Editar Cine';
        document.querySelector('#cineForm button[type="submit"]').textContent = 'Guardar Cine';
    };

    // Asegurarse de que el primer panel esté activo al cargar
    document.getElementById('cines').classList.add('active');
    document.querySelector('.nav-button[data-target="cines"]').classList.add('active');

    const cinestablebody = async () => {
        const get = await fetch('http://localhost:3000/api/cine/find', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const res = await get.json();
        return res
    };
    
    
    // addCineToTable("asd", "asd", "asd", "asd", "asd");
    const cinev = await cinestablebody()
    cinev.forEach(cine => {
        addCineToTable(cine._id, cine.codigo, cine.nombre, cine.direccion, cine.ciudad)
    })
        return
    const addcinesbody = async () => {
        const post = await fetch('http://localhost:3000/api/cine/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ codigo: "123", nombre: "Cine 1", direccion: "Calle Falsa 123", ciudad: "Madrid" })
        });
        const res = await post.json();
        return res
    };
    const cinec = await addcinesbody();
    cinec.forEach(cine => {
        addCineToTable(cine._id, cine.codigo, cine.nombre, cine.direccion, cine.ciudad);
    });

})