class NovoUsuario {
    constructor() {
        this.formulario = document.querySelector('.form');

        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const isValid = this.checkFields();
        const passwordIsValid = this.checkPasswords();

        if(isValid && passwordIsValid){
            alert('Formulario enviado.');
            this.formulario.submit();
        }
    }

    checkPasswords() {
        let valid = true;

        const senha = this.formulario.querySelector('#senha');
        const confirma = this.formulario.querySelector('#confirmacao');

        if(senha.value !== confirma.value) {
            valid = false;
            this.criaErro(senha, 'Campo senha e confirmar senha precisam ser iguais');
            this.criaErro(confirma, 'Campo senha e confirmar senha precisam ser iguais');
        }

        if(senha.value.length < 6 || senha.value.length > 12){
            valid = false;
            this.criaErro(senha, 'Senha precisa ter entre 6 e 12 caracteres');
        }

        return valid;
    }

    checkFields() {
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove();
        }

        for(let field of this.formulario.querySelectorAll('.validar')){
            if(!field.value) {
                let label = field.previousElementSibling.innerText;
                this.criaErro(field, `Campo "${label}" não pode estar em branco.`);
                valid = false;
            }

            if(field.id === 'cpf') {
                if(!this.validaCPF(field)) valid = false;
            }

            if(field.id === 'usuario') {
                if(!this.validaUsuario(field)) valid = false;
            }
        }
        return valid;
    }

    validaUsuario(field) {
        const usuario = field.value;
        let valid = true;
        if(usuario.length > 12 || usuario.length < 3) {
            console.log('cade');
            this.criaErro(field, 'Usuario tem que ter entre 3 e 12 caracteres.');
            valid = false;
        }
        if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(field, 'Usuario só pode conter letras e/ou numeros.');
            valid = false;
        }
        return valid;
    }

    validaCPF(field){
        const cpf = new ValidaCPF(field.value);

        if(!cpf.valida()) {
            this.criaErro(field, 'CPF inválido.');
            return false;
        }
        return true;
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new NovoUsuario();