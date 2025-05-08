from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/lookup', methods=['POST'])
def lookup():
    barcode = request.json.get('barcode')
    if not barcode:
        return jsonify({'error': 'No barcode provided'}), 400

    url = f'https://world.openfoodfacts.org/api/v0/product/{barcode}.json'
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch product'}), 500

    data = response.json()
    if data.get('status') != 1:
        return jsonify({'error': 'Product not found'}), 404

    product = data['product']
    return jsonify(product)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)