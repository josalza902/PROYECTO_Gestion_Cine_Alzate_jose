const enviarCredenciales = async () => {
    const url = 'http://localhost:3000/api/login';
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const msgDiv = document.getElementById('loginMsg');

    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
            msgDiv.textContent = data.message || 'Error en la autenticación.';
            return;
        }

        msgDiv.textContent = '¡Inicio de sesión exitoso!';
        window.location.href = "https://www.google.com";
    } catch (error) {
        msgDiv.textContent = 'Error de conexión con el servidor.';
        console.error(error);
    }
};

// No llames enviarCredenciales() aquí, solo desde el submit del formulario:
// document.getElementById('loginForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     enviarCredenciales();
// });