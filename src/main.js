
const qrInput = $('#QR_INPUT');
const generateBtn = $('#GENERATE');


const resultContainer = $('#result-container');
const qrCodeDiv = $('#qrcode');
const downloadBtn = $('#download-btn');
const resetBtn = $('#reset-btn');
const toast = $('#toast');

let qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});

function showToast() {
    toast.removeClass('hidden').addClass('flex');
    setTimeout(() => {
        toast.addClass('translate-y-0 opacity-100').removeClass('translate-y-[-150%] opacity-0');
    }, 10);

    setTimeout(() => {
        toast.addClass('translate-y-[-150%] opacity-0').removeClass('translate-y-0 opacity-100');
        setTimeout(() => toast.addClass('hidden'), 500);
    }, 3000);
}

generateBtn.on('click', function () {
    const text = qrInput.val().trim();

    if (text.length < 3) {

        showToast();
        qrInput.addClass('border-red-500 animate-shake');
        setTimeout(() => qrInput.removeClass('border-red-500 animate-shake'), 500);
        return;
    }

    qrcode.clear();
    qrcode.makeCode(text);

    resultContainer.removeClass('hidden').addClass('flex');

    $('html, body').animate({
        scrollTop: resultContainer.offset().top - 100
    }, 500);
});

downloadBtn.on('click', function () {
    const img = qrCodeDiv.find('img').attr('src');
    if (img) {
        const link = document.createElement('a');
        link.href = img;
        link.download = 'qrcode-cabrapi.png';
        link.click();
    }
});

resetBtn.on('click', function () {
    resultContainer.addClass('hidden').removeClass('flex');
    qrInput.val('');
    qrcode.clear();
    qrCodeDiv.empty();
    qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
});

