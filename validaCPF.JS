class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            value: cpfEnviado.replace(/\D+/g, ''),
            writable: false,
            enumerable: true,
            configurable: false
        });
    }
    valida() {
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo !== 'string') return (console.log(2));
        if(this.cpfLimpo.length !== 11) return (console.log(3));
        if(this.eSequencia()) return (console.log(4));
        this.geraNovoCpf()
        return this.novoCPF === this.cpfLimpo;

    }

    eSequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    geraNovoCpf() {
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
        const digito1 = this.geraDigito(cpfSemDigitos);
        const digito2 = this.geraDigito(cpfSemDigitos + digito1);
        this.novoCPF = cpfSemDigitos +digito1 + digito2;
    }

    geraDigito(cpfSemDigitos) {
        let total = 0;
        let reverso = cpfSemDigitos.length +1;

        for(let numero of cpfSemDigitos) {
            total += reverso * Number(numero);
            reverso--;
        }
        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }
}

//const validacpf = new ValidaCPF('370.415.008-88');

//if (validacpf.valida()) {
  //  console.log('CPF válido');
//}else{
  //  console.log('CPF inválido');
//}