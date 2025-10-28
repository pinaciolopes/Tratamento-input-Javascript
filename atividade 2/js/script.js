/* ============================================================
   Função: permitirApenasNumeros
   Descrição: Remove qualquer caractere que não seja número.
   Parâmetro: campo → referência ao input HTML.
   Uso: Evita que o usuário digite letras ou símbolos.
   ============================================================ */
function permitirApenasNumeros(campo) {
    campo.value = campo.value.replace(/\D/g, ''); // Remove tudo que não é dígito (0-9)
}

/* ============================================================
   Função: formatarData
   Descrição: Formata a data conforme o padrão dd/mm/aaaa.
   Parâmetro: campo → referência ao input HTML.
   Observação: Insere "/" automaticamente conforme o usuário digita.
   ============================================================ */
function formatarData(campo) {
    let valor = campo.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    // Caso tenha 3 ou 4 dígitos (ex: "1012" → "10/12")
    if (valor.length > 2 && valor.length <= 4)
        campo.value = valor.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    // Caso tenha mais de 4 dígitos (ex: "10122000" → "10/12/2000")
    else if (valor.length > 4)
        campo.value = valor.replace(/(\d{2})(\d{1,2})(\d{1,4})/, '$1/$2/$3');
    else
        campo.value = valor; // Caso contrário, mantém apenas os números
}

/* ============================================================
   Função: formatarCPF
   Descrição: Aplica máscara ao CPF no formato 000.000.000-00.
   Parâmetro: campo → referência ao input HTML.
   ============================================================ */
function formatarCPF(campo) {
    let valor = campo.value.replace(/\D/g, ''); // Corrigido: /\D/g (D → maiúsculo estava errado)
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    campo.value = valor;
}

/* ============================================================
   Função: formatarTelefone
   Descrição: Aplica máscara ao telefone no formato (00) 00000-0000.
   Parâmetro: campo → referência ao input HTML.
   ============================================================ */
function formatarTelefone(campo) {
    let valor = campo.value.replace(/\D/g, ''); // Corrigido: /\D/g
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2'); // Adiciona DDD entre parênteses
    valor = valor.replace(/(\d{5})(\d{4})$/, '$1-$2'); // Adiciona hífen entre os últimos 4 dígitos
    campo.value = valor;
}

/* ============================================================
   Função: formatarCEP
   Descrição: Aplica máscara ao CEP no formato 00000-000.
   Parâmetro: campo → referência ao input HTML.
   ============================================================ */
function formatarCEP(campo) {
    let valor = campo.value.replace(/\D/g, ''); // Corrigido: /\D/g
    valor = valor.replace(/^(\d{5})(\d)/, '$1-$2'); // Adiciona hífen após o quinto dígito
    campo.value = valor;
}

/* ============================================================
   Função: marcarCampoInvalido
   Descrição: Adiciona ou remove a classe 'invalido' nos campos
              conforme o resultado da validação.
   Parâmetros:
     - campo: referência ao input
     - condicao: true se o campo estiver inválido
   ============================================================ */
function marcarCampoInvalido(campo, condicao) {
    if (condicao) campo.classList.add('invalido');
    else campo.classList.remove('invalido');
}

/* ============================================================
   Evento: DOMContentLoaded
   Descrição: Executa o script apenas após o carregamento do DOM.
   - Seleciona todos os campos do formulário
   - Adiciona eventos de input e validação
   - Controla o envio e feedback visual do formulário
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona os elementos HTML
    const idade = document.getElementById('idade');
    const quantidade = document.getElementById('quantidade');
    const dataNascimento = document.getElementById('dataNascimento');
    const cpf = document.getElementById('cpf');
    const telefone = document.getElementById('telefone');
    const cep = document.getElementById('cep');
    const enviar = document.getElementById('enviar');

    /* ------------------------------------------------------------
       Eventos de input: formatam e validam os campos em tempo real
       ------------------------------------------------------------ */
    idade.addEventListener('input', () => permitirApenasNumeros(idade));
    quantidade.addEventListener('input', () => permitirApenasNumeros(quantidade));
    dataNascimento.addEventListener('input', () => formatarData(dataNascimento));
    cpf.addEventListener('input', () => formatarCPF(cpf));
    telefone.addEventListener('input', () => formatarTelefone(telefone));
    cep.addEventListener('input', () => formatarCEP(cep));

    /* ------------------------------------------------------------
       Evento de clique no botão "Enviar"
       - Impede o envio automático do formulário
       - Valida todos os campos
       - Exibe alertas conforme o resultado
       ------------------------------------------------------------ */
    enviar.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o comportamento padrão do botão

        // Valida cada campo e aplica a classe 'invalido' quando necessário
        marcarCampoInvalido(idade, idade.value === '');
        marcarCampoInvalido(quantidade, quantidade.value === '');
        marcarCampoInvalido(dataNascimento, dataNascimento.value.length < 10);
        marcarCampoInvalido(cpf, cpf.value.length < 14);
        marcarCampoInvalido(telefone, telefone.value.length < 14);
        marcarCampoInvalido(cep, cep.value.length < 9);

        // Verifica se há campos inválidos
        if (document.querySelectorAll('.invalido').length === 0) {
            alert('Formulário enviado com sucesso!');
        } else {
            alert('Verifique os campos destacados em vermelho.');
        }
    });
});
