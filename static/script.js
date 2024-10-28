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
document.getElementById('fetchDataButton').addEventListener('click', function () {
    fetch('/data') // Llama al endpoint '/data' para obtener los datos
    .then(response => response.json())
    .then(data => {
        console.log(data); // Revisa los datos en la consola
        const dataDisplay = document.getElementById('dataDisplay');
        dataDisplay.innerHTML = ''; // Limpia la pantalla antes de mostrar nuevos datos

        // Crear tabla de gráficos
        const tableGraph = document.createElement('table');
        tableGraph.className = 'charts-css column show-labels';
        const captionGraph = document.createElement('caption');
        captionGraph.innerText = 'Gráfico de valores de sensores';
        tableGraph.appendChild(captionGraph);

        const theadGraph = document.createElement('thead');
        theadGraph.innerHTML = `
            <tr>
                <th>Sensor</th>
                <th>Valor</th>
                <th>Tiempo</th>
            </tr>
        `;
        tableGraph.appendChild(theadGraph);

        const tbodyGraph = document.createElement('tbody');
        
        // Tabla para los datos en texto plano
        const tablePlain = document.createElement('table');
        tablePlain.className = 'plain-table';
        const captionPlain = document.createElement('caption');
        captionPlain.innerText = 'Datos en texto plano';
        tablePlain.appendChild(captionPlain);

        const theadPlain = document.createElement('thead');
        theadPlain.innerHTML = `
            <tr>
                <th>Sensor</th>
                <th>Valor</th>
                <th>Tiempo</th>
            </tr>
        `;
        tablePlain.appendChild(theadPlain);

        const tbodyPlain = document.createElement('tbody');

        // Iterar sobre los datos y llenar ambas tablas
        data.data.forEach(item => {
            // Fila para la tabla de gráficos
            const rowGraph = document.createElement('tr');
            const sensorCellGraph = document.createElement('td');
            sensorCellGraph.innerText = item.sensor;
            rowGraph.appendChild(sensorCellGraph);

            const valueCellGraph = document.createElement('td');
            valueCellGraph.style.setProperty('--size', item.value / 100); // Ajuste el valor para el gráfico
            valueCellGraph.innerText = item.value;
            rowGraph.appendChild(valueCellGraph);

            tbodyGraph.appendChild(rowGraph);

            // Fila para la tabla de texto plano
            const rowPlain = document.createElement('tr');
            const sensorCellPlain = document.createElement('td');
            sensorCellPlain.innerText = item.sensor;
            rowPlain.appendChild(sensorCellPlain);

            const valueCellPlain = document.createElement('td');
            valueCellPlain.innerText = item.value;
            rowPlain.appendChild(valueCellPlain);

            const timeCellPlain = document.createElement('td');
            timeCellPlain.innerText = item.timestamp;
            rowPlain.appendChild(timeCellPlain);

            tbodyPlain.appendChild(rowPlain);
        });

        // Agregar cuerpo de ambas tablas y mostrarlas en la pantalla
        tableGraph.appendChild(tbodyGraph);
        dataDisplay.appendChild(tableGraph);

        tablePlain.appendChild(tbodyPlain);
        dataDisplay.appendChild(tablePlain); // Muestra la tabla de texto plano después de la tabla de gráficos
    })
    .catch(error => console.error('Error:', error));
});
