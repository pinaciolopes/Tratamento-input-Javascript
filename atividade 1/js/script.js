    function permitirApenasNumeros(campo){
        campo.value = campo.value.replace(/\D/g, '');
    }

    function formatarData(campo){
        let valor = campo.value.replace(/\D/g, '');

        if (valor.length > 2 && valor.length <= 4)
            campo.value = valor.value.replace(/(\d{2})(\d{1,2})/, '$1/$2');

        else if(valor.length > 4)
            campo.value = valor.replace(/(\d{2})(\d{1,2})(\d{1,4})/, '$1/$2/$3');
        else
            campo.value = valor;
    }

    document.addEventListener("DOMContentLoaded", function () {
        const idade = document.getElementById('idade');
        const quantidade = document.getElementById('quantidade');
        const dataNascimento = document.getElementById('dataNascimento');

        idade.addEventListener('input', ()=> permitirApenasNumeros(idade));
        quantidade.addEventListener('input', ()=> permitirApenasNumeros(quantidade));
        dataNascimento.addEventListener('input', () => formatarData(dataNascimento));
    });

