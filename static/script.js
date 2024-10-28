// Manejar la solicitud para enviar nuevos datos
document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que el formulario recargue la página
    const sensor = document.getElementById('sensor').value;
    const value = document.getElementById('value').value;

    fetch('/data', { // Llama al endpoint '/data' en tu app de Flask
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sensor, value }), // Convierte los datos a formato JSON
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message || data.error;
        document.getElementById('dataForm').reset(); // Limpia el formulario después de enviar
    })
    .catch(error => console.error('Error:', error));
});

// Manejar la solicitud para eliminar datos por ID
document.getElementById('deleteForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const dataId = document.getElementById('dataId').value;

    fetch(`/data/${dataId}`, { // Llama al endpoint '/data/{id}' en Flask para eliminar
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message || data.error;
        document.getElementById('deleteForm').reset(); // Limpia el formulario
    })
    .catch(error => console.error('Error:', error));
});

// Manejar la solicitud para actualizar datos por ID
document.getElementById('updateForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const id = document.getElementById('updateId').value;
    const sensor = document.getElementById('updateSensor').value;
    const value = document.getElementById('updateValue').value;

    fetch(`/data/${id}`, { // Llama al endpoint '/data/{id}' en Flask para actualizar
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sensor, value }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message || data.error;
        document.getElementById('updateForm').reset(); // Limpia el formulario
    })
    .catch(error => console.error('Error:', error));
});

// Obtener y mostrar todos los datos desde la API, incluyendo gráficos
// Obtener y mostrar todos los datos desde la API, incluyendo gráficos
document.getElementById('fetchDataButton').addEventListener('click', function () {
    fetch('/data') // Llama al endpoint '/data' para obtener los datos
    .then(response => response.json())
    .then(data => {
        console.log(data); // Revisa los datos en la consola
        const dataDisplay = document.getElementById('dataDisplay');
        dataDisplay.innerHTML = ''; // Limpia la pantalla antes de mostrar nuevos datos

        // Crear la tabla de gráficos
        const table = document.createElement('table');
        table.className = 'charts-css column show-labels';

        // Agregar encabezado de la tabla
        const caption = document.createElement('caption');
        caption.innerText = 'Gráfico de valores de sensores';
        table.appendChild(caption);

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Sensor</th>
                <th>Valor</th>
                <th>Tiempo</th> <!-- Encabezado para la columna de tiempo -->
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        
        // Iterar sobre el array de datos y agregarlos a la tabla
        data.data.forEach(item => {
            const row = document.createElement('tr');

            // Crear celda para el nombre del sensor
            const sensorCell = document.createElement('td');
            sensorCell.innerText = item.sensor;
            row.appendChild(sensorCell);

            // Crear celda para el valor, formateado como una barra de gráfico
            const valueCell = document.createElement('td');
            valueCell.style.setProperty('--size', item.value / 100); // Ajuste el valor para el gráfico (normalizado)
            valueCell.innerText = item.value; // Mostrar el valor numérico como etiqueta
            row.appendChild(valueCell);

            // Crear celda para el tiempo
            const timeCell = document.createElement('td');
            timeCell.innerText = item.timestamp; // Agregar el tiempo
            row.appendChild(timeCell);

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        dataDisplay.appendChild(table); // Agregar la tabla de gráficos a `dataDisplay`
    })
    .catch(error => console.error('Error:', error));
});
