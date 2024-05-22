from flask import Flask, request, jsonify
from flask_cors import CORS
import hashlib

app = Flask(__name__)
CORS(app)

hash_db = {}

def hash_text(text, hash_type):
    if hash_type == 'md5':
        return hashlib.md5(text.encode()).hexdigest()
    elif hash_type == 'sha1':
        return hashlib.sha1(text.encode()).hexdigest()
    elif hash_type == 'sha256':
        return hashlib.sha256(text.encode()).hexdigest()
    return None

@app.route('/encode', methods=['POST'])
def encode():
    data = request.json
    text = data.get('text')
    hash_type = data.get('hashType')
    
    if not text or not hash_type:
        return jsonify({'error': 'Missing text or hashType'}), 400
    
    if hash_type not in ['md5', 'sha1', 'sha256']:
        return jsonify({'error': 'Invalid hashType'}), 400

    hash_value = hash_text(text, hash_type)
    if hash_value:
        hash_db[hash_value] = text
        return jsonify({'hash': hash_value})
    else:
        return jsonify({'error': 'Error generating hash'}), 500

@app.route('/decode', methods=['POST'])
def decode():
    data = request.json
    hash_value = data.get('hash')
    
    if not hash_value:
        return jsonify({'error': 'Missing hash'}), 400
    
    text = hash_db.get(hash_value, 'Not found')
    return jsonify({'text': text})

if __name__ == '__main__':
    app.run(debug=True)
