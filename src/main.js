/**
 * @file QR Code Generator Script
 * @description
 * Este script permite gerar QR Codes a partir de uma entrada de texto do usuário,
 * exibir o resultado na página, fornecer a opção de download da imagem gerada
 * e reiniciar o formulário. Inclui validação básica de entrada e feedback visual.
 * 
 * Funcionalidades principais:
 * 1. Captura do input de texto do usuário.
 * 2. Validação mínima de caracteres.
 * 3. Geração de QR Code usando a biblioteca QRCode.js.
 * 4. Exibição do QR Code gerado em uma div específica.
 * 5. Botão para download da imagem do QR Code.
 * 6. Botão de reset para limpar o QR Code e o input.
 * 7. Toast visual de aviso quando a entrada não atende aos requisitos.
 * 8. Animações de scroll e feedback visual usando jQuery.
 * 
 * Elementos HTML utilizados:
 * - #QR_INPUT: campo de texto do usuário.
 * - #GENERATE: botão de gerar QR Code.
 * - #result-container: container do resultado do QR Code.
 * - #qrcode: div onde o QR Code é renderizado.
 * - #download-btn: botão para baixar o QR Code.
 * - #reset-btn: botão para resetar a entrada e o QR Code.
 * - #toast: mensagem de alerta para entrada inválida.
 * 
 * Bibliotecas externas:
 * - jQuery: manipulação de DOM, eventos e animações.
 * - QRCode.js: geração do QR Code em canvas ou imagem.
 * 
 * Uso típico:
 * 1. Usuário insere texto no input (#QR_INPUT).
 * 2. Clica no botão gerar (#GENERATE).
 * 3. Se o texto for válido (>= 3 caracteres), o QR Code é gerado e exibido.
 * 4. Usuário pode baixar o QR Code clicando em (#download-btn) ou resetar com (#reset-btn).
 * 5. Se o texto for inválido, um toast de aviso é exibido e o input é destacado.
 * 
 * Observações:
 * - O QR Code é gerado com 256x256 pixels, cor preta sobre fundo branco.
 * - Nível de correção de erros configurado como H (alto).
 * - As animações utilizam classes CSS pré-definidas (como animate-shake).
 */


const qrInput = $('#QR_INPUT');
const generateBtn = $('#GENERATE');
const resultContainer = $('#result-container');
const qrCodeDiv = $('#qrcode');
const downloadBtn = $('#download-btn');
const resetBtn = $('#reset-btn');
const toast = $('#toast');

// Configuração inicial do QR Code
let qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});

// Função para exibir o toast de aviso
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

// Gerar o QR Code
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

// Baixar a imagem do QR Code
downloadBtn.on('click', function () {
    const img = qrCodeDiv.find('img').attr('src');
    if (img) {
        const link = document.createElement('a');
        link.href = img;
        link.download = 'qrcode-cabrapi.png';
        link.click();
    }
});

// Resetar o formulário e o QR Code
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