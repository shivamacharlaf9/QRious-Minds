function generateQRCode() {
    const text = document.getElementById('text-input').value;
    const qrCodeContainer = document.getElementById('qr-code');
    qrCodeContainer.innerHTML = '';
    const qrCode = new QRCode(qrCodeContainer, {
        text: text,
        width: 128,
        height: 128
    });
}

function readQRCode() {
    const fileInput = document.getElementById('qr-input');
    const qrResult = document.getElementById('qr-result');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, canvas.width, canvas.height);
                if (code) {
                    qrResult.textContent = `QR Code Data: ${code.data}`;
                } else {
                    qrResult.textContent = 'No QR code found.';
                }
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}
