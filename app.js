// Función para eliminar caracteres especiales y números
function removeSpecialChatAndNum(text) {
    return text.replace(/[^a-zA-Z\s]/g, '');
}

// Función para eliminar acentos
function removeAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Función para convertir a minúsculas
function toLowerCase(text) {
    return text.toLowerCase();
}

// Función para limpiar el texto
function cleanText(text) {
    text = removeAccents(text);
    text = removeSpecialChatAndNum(text);
    return toLowerCase(text);
}

// Funciones de encriptar y desencriptar
function encryptText(text) {
    text = cleanText(text);
    if (text === "") return "";
    return text
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
}

function decryptText(text) {
    text = cleanText(text);
    if (text === "") return "";
    return text
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
}

// Verifica si el texto contiene solo números o caracteres especiales
function isInvalidInput(text) {
    return /^[^a-zA-Z]*$/.test(text);
}

// Verifica si el texto no contiene la clave encriptada
function textWithoutEncriptedKey(text) {
    const cleanedText = cleanText(text);
    const decryptedText = decryptText(cleanedText);
    return cleanedText === decryptedText;
}

// Evento para encriptar y desencriptar
document.getElementById('encrypt-button').addEventListener('click', function () {
    const inputText = document.getElementById('input-text').value.trim();
    const noMessage = document.getElementById('no-message');
    const flex_v = document.getElementById('flex-v');
    const ocult = document.getElementById('ocult');
    const invalidInputMessage = document.getElementById('invalid-input');
    const resultText = document.querySelector('.result-text');
    
    if (inputText === "") {
        noMessage.style.display = 'block';
        invalidInputMessage.style.display = 'none';
        flex_v.style.display = 'none';
        ocult.style.display = 'block';
        resultText.innerText = '';
        alert('El campo de texto está vacío. Por favor, ingrese algún texto.');
    } else if (isInvalidInput(inputText)) {
        noMessage.style.display = 'none';
        invalidInputMessage.style.display = 'block';
        resultText.innerText = '';
        alert('Entrada no válida. Solo se permiten letras sin acentos y sin números.');
    } else {
        flex_v.style.display = 'flex';
        ocult.style.display = 'none';
        noMessage.style.display = 'none';
        invalidInputMessage.style.display = 'none';
        const encryptedText = encryptText(inputText);
        resultText.innerText = encryptedText;
    }
});

document.getElementById('decrypt-button').addEventListener('click', function () {
    const inputText = document.getElementById('input-text').value.trim();
    const noMessage = document.getElementById('no-message');
    const invalidInputMessage = document.getElementById('invalid-input');
    const resultText = document.querySelector('.result-text');

    if (inputText === "") {
        noMessage.style.display = 'block';
        invalidInputMessage.style.display = 'none';
        resultText.innerText = '';
    } else if (isInvalidInput(inputText)) {
        noMessage.style.display = 'none';
        invalidInputMessage.style.display = 'block';
        resultText.innerText = '';
    } else {
        noMessage.style.display = 'none';
        invalidInputMessage.style.display = 'none';
        if (textWithoutEncriptedKey(inputText)) {
            // No cambiar el texto del área de resultados
        } else {
            const decryptedText = decryptText(inputText);
            resultText.innerText = decryptedText;
        }
    }
});

// Evento para copiar el texto
document.getElementById('copy-button').addEventListener('click', function () {
    const resultText = document.querySelector('.result-text').innerText;

    navigator.clipboard.writeText(resultText).then(() => {
        const copyButton = document.getElementById('copy-button');
        copyButton.classList.add('copied');
    });
});