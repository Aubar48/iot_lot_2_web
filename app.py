from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


BASE_URL = 'https://iot-lot-2.onrender.com/data'

# READ: Get all data from the external API
@app.route('/data', methods=['GET'])
def get_all_data():
    response = requests.get(BASE_URL)
    if response.status_code == 200:
        return jsonify(response.json()), 200
    return jsonify({"error": "Failed to fetch data"}), response.status_code

# CREATE: Add new data to the external API
@app.route('/data', methods=['POST'])
def add_data():
    new_item = request.json
    response = requests.post(BASE_URL, json=new_item)
    if response.status_code == 201:
        return jsonify(response.json()), 201
    return jsonify({"error": "Failed to add data"}), response.status_code

# READ: Get a specific data entry by ID from the external API
@app.route('/data/<int:id>', methods=['GET'])
def get_data(id):
    response = requests.get(f'{BASE_URL}/{id}')
    if response.status_code == 200:
        return jsonify(response.json()), 200
    return jsonify({"error": "Item not found"}), response.status_code

# UPDATE: Update an entry by ID via the external API
@app.route('/data/<int:id>', methods=['PUT'])
def update_data(id):
    updated_item = request.json
    response = requests.put(f'{BASE_URL}/{id}', json=updated_item)
    if response.status_code == 200:
        return jsonify(response.json()), 200
    return jsonify({"error": "Failed to update data"}), response.status_code

# DELETE: Delete an entry by ID from the external API
@app.route('/data/<int:id>', methods=['DELETE'])
def delete_data(id):
    response = requests.delete(f'{BASE_URL}/{id}')
    if response.status_code == 204:
        return jsonify({"message": "Item deleted"}), 204
    return jsonify({"error": "Failed to delete item"}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
