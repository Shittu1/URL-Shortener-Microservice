let urlInput = document.querySelector('input#url');
let para = document.getElementById('demo');

urlInput.addEventListener('input', (e) => {
    para.textContent = urlInput.value;
});