async function encodeText() {
    try {
        const text = document.getElementById('text-input').value;
        const hashType = document.getElementById('hash-type').value;
        
        const response = await fetch('http://127.0.0.1:5000/encode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, hashType }),
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        document.getElementById('encoded-hash').textContent = data.hash;
        document.getElementById('encoded-output').style.display = 'block';
    } catch (error) {
        console.error('Error encoding text:', error);
    }
}

async function decodeHash() {
    try {
        const hash = document.getElementById('hash-input').value;
        
        const response = await fetch('http://127.0.0.1:5000/decode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hash }),
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        document.getElementById('decoded-text').textContent = data.text || 'Not found';
        document.getElementById('decoded-output').style.display = 'block';
    } catch (error) {
        console.error('Error decoding hash:', error);
    }
}

function copyToClipboard(elementId) {
    const textToCopy = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            console.error('Could not copy text: ', err);
        });
}

function pasteFromClipboard() {
    navigator.clipboard.readText()
        .then(text => {
            document.getElementById('hash-input').value = text;
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
}
