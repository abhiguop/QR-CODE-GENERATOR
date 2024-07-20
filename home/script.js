document.addEventListener('DOMContentLoaded', () => {
    let QrContainer = document.getElementById('Qr-container');
    let exit = document.getElementById('exit');
    let QR = document.getElementById('qr-code');
    let input = document.getElementById('input');
    let submit = document.getElementById('submit');
    var loader = document.getElementById("loader");
    let jpg = document.getElementById('forjpg');
    let png = document.getElementById('forpng');
    let svg = document.getElementById('forsvg');
    let fileName = "QR_CODE";

    // Function to generate QR code
    function generateQRCode() {
        let fetchedData = input.value;

        if (fetchedData.length == 0) {
            input.classList.add('shake-horizontal');
            setTimeout(() => input.classList.remove('shake-horizontal'), 500);
            vibratePhone();
        } else {
            QrContainer.classList.add('exit-Qr');
            let apiLink = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=30&data=${fetchedData}`;
            QR.src = apiLink;
        }
    }

    // Submit using click
    submit.addEventListener('click', generateQRCode);

    // Submit using enter key press
    document.body.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateQRCode();
        }
    });

    // Hide loader when QR code is loaded
    QR.addEventListener("load", () => {
        loader.classList.add('deactivate-loader');
    });

    // Vibration if input field is empty
    function vibratePhone() {
        if (navigator.vibrate) {
            navigator.vibrate(500);
        } else {
            console.log("Vibration API is not supported in your browser.");
        }
    }

    // Download buttons
    jpg.addEventListener('click', () => {
        let imgPath = QR.getAttribute('src') + `&format=jpeg`;
        fetch(imgPath)
            .then(response => response.blob())
            .then(blob => saveAs(blob, fileName + '.jpeg'));
    });

    png.addEventListener('click', () => {
        let imgPath = QR.getAttribute('src') + `&format=png`;
        fetch(imgPath)
            .then(response => response.blob())
            .then(blob => saveAs(blob, fileName + '.png'));
    });

    svg.addEventListener('click', () => {
        let imgPath = QR.getAttribute('src') + `&format=svg`;
        fetch(imgPath)
            .then(response => response.blob())
            .then(blob => saveAs(blob, fileName + '.svg'));
    });

    // Exit button
    exit.addEventListener('click', () => {
        QrContainer.classList.remove('exit-Qr');
        loader.classList.remove('deactivate-loader');
    });
});
