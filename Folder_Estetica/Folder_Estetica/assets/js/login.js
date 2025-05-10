document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email === 'teste@teste.com' && password === '123456') {
            alert('Login realizado com sucesso!');
        } else {
            alert('E-mail ou senha incorretos.');
        }
    });
});