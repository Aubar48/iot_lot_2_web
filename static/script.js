// Manejar la solicitud para enviar nuevos datos
document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Evita que el formulario recargue la página
    const sensor = document.getElementById('sensor').value;
    const value = document.getElementById('value').value;

    fetch('/data', {  // Llama al endpoint '/data' en tu app de Flask
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sensor, value }),  // Convierte los datos a formato JSON
    })
    .then(response => response.json())  // Convierte la respuesta a JSON
    .then(data => {
        document.getElementById('response').innerText = data.message || data.error;  // Muestra el mensaje de respuesta
        document.getElementById('dataForm').reset();  // Limpia el formulario después de enviar
    })
    .catch(error => console.error('Error:', error));
});

// Manejar la solicitud para eliminar datos por ID
document.getElementById('deleteForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const dataId = document.getElementById('dataId').value;

    fetch(`/data/${dataId}`, {  // Llama al endpoint '/data/{id}' en Flask para eliminar
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message || data.error;
        document.getElementById('deleteForm').reset();  // Limpia el formulario
    })
    .catch(error => console.error('Error:', error));
});

// Manejar la solicitud para actualizar datos por ID
document.getElementById('updateForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const id = document.getElementById('updateId').value;
    const sensor = document.getElementById('updateSensor').value;
    const value = document.getElementById('updateValue').value;

    fetch(`/data/${id}`, {  // Llama al endpoint '/data/{id}' en Flask para actualizar
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sensor, value }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message || data.error;
        document.getElementById('updateForm').reset();  // Limpia el formulario
    })
    .catch(error => console.error('Error:', error));
});

// Obtener y mostrar todos los datos desde la API
document.getElementById('fetchDataButton').addEventListener('click', function () {
    fetch('/data')  // Llama al endpoint '/data' para obtener los datos
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Revisa los datos en la consola
        const dataDisplay = document.getElementById('dataDisplay');
        dataDisplay.innerHTML = '';  // Limpia la pantalla antes de mostrar nuevos datos

        // Iterar sobre el array de datos y mostrarlos
        data.data.forEach(item => {
            const div = document.createElement('div');
            div.innerText = `ID: ${item.id}, Sensor: ${item.sensor}, Valor: ${item.value}, Timestamp: ${item.timestamp}`;
            dataDisplay.appendChild(div);
        });
    })
    .catch(error => console.error('Error:', error));
});
