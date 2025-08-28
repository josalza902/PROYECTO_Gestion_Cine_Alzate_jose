// const enviarCredenciales = async () => {
//     const url = 'http://localhost:3000/api/login';
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

    

//     try {
//         const respuesta = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ username, password })
//         });

//         const data = await respuesta.json();

//         if (!respuesta.ok) {
//             if (msgDiv) msgDiv.textContent = data.message || 'Error en la autenticación.';
//             return;
//         }

//         if (msgDiv) msgDiv.textContent = '¡Inicio de sesión exitoso!';
//         window.location.href = "https://www.google.com";
//         return data;

//     } catch (error) {
//         if (msgDiv) msgDiv.textContent = 'Error de conexión con el servidor.';
//         console.error(error);
//     }
// };

const loginbtn = document.getElementById('loginBtn');
loginbtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const usuario = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    

    const post = await fetch('http://localhost:3000/api/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username:usuario, password:password})
    });
    if(post.ok){
        const result = await post.json();
    localStorage.setItem('token', result.token);
    window.location.href = "/dashboard.html";
    }

});
// // Llama a enviarCredenciales solo desde el submit del formulario:
// // document.getElementById('loginForm').addEventListener('submit', function(e) {
// //     e.preventDefault();
// //     enviarCredenciales();
// //