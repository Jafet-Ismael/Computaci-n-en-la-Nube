// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Check if there is a logged-in user
    const loggedInUser = localStorage.getItem('loggedInUser');

    // If on login page, handle login
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', handleLogin);
    }

    // If on other pages, check if user is logged in
    if (loggedInUser) {
        // User is logged in
        if (document.getElementById('logout')) {
            document.getElementById('logout').addEventListener('click', handleLogout);
        }
    } else {
        // User is not logged in, redirect to login page
        if (!document.getElementById('loginForm')) {
            window.location.href = 'login.html';
        }
    }

    // Handle adding products
    if (document.getElementById('agregarProductoForm')) {
        document.getElementById('agregarProductoForm').addEventListener('submit', agregarProducto);
    }

    // Show products if on product list page
    if (document.getElementById('productosTable')) {
        mostrarProductos();
    }
});

function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Hardcoded user for demonstration purposes
    const validUsername = 'admin';
    const validPassword = 'admin';

    if (username === validUsername && password === validPassword) {
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'index.html';
    } else {
        document.getElementById('loginError').textContent = 'Usuario o contraseña incorrectos.';
    }
}

function handleLogout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
}

function agregarProducto(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;
    const imagen = document.getElementById('imagen').files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
        const producto = {
            nombre,
            descripcion,
            precio,
            cantidad,
            imagen: reader.result
        };

        let productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));

        alert('Producto agregado correctamente');
        document.getElementById('agregarProductoForm').reset();
    };
    reader.readAsDataURL(imagen);
}

function mostrarProductos() {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const productosTableBody = document.querySelector('#productosTable tbody');

    productos.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td><img src="${producto.imagen}" alt="${producto.nombre}" width="50"></td>
        `;
        productosTableBody.appendChild(row);
    });
}
