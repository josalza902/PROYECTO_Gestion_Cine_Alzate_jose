const enviarCredenciales = async (usuario, contrasena) => {
    // URL del endpoint del backend
    const url = 'http://localhost:3000/api/login';

    const usuario = document.getElementById('username').value;
    const contrasena = document.getElementById('password').value;

    // Datos que se enviarán al servidor
 

    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({usuario, contrasena})
        });

        // Verifica si la respuesta es exitosa (código 200-299)
        if (!respuesta.ok) {
            // Manejar errores de respuesta del servidor (ej. 401 Unauthorized)
            const errorData = await respuesta.json();
            throw new Error(errorData.mensaje || 'Error en la autenticación.');
        }

        const data = await respuesta.json();
        console.log('¡Inicio de sesión exitoso!', data);
        // Aquí puedes manejar la respuesta exitosa, como guardar un token JWT
        return data;

    } catch (error) {
        console.error('Ha ocurrido un error:', error);
        // Manejar errores de red o del servidor
        throw error;
    }
};

// Ejemplo de uso
// Supongamos que obtienes los valores de los campos del formulario


enviarCredenciales(usuario, contrasena)
    .then(data => {
        // Haz algo con los datos si la llamada es exitosa
        console.log('Datos recibidos del backend:', data);
    })
    .catch(error => {
        // Muestra un mensaje de error al usuario
        console.error('Error al iniciar sesión:', error.message);
    });