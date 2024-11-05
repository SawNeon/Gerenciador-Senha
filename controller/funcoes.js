
var senhas = [];
let senhaAtual = null;
let senhaAnterior = null;
let senhaProxima = null;
let ultimoCaixaAtual = null;
let ultimoCaixaAnterior = null; 
let historicoSenhas = []; 

function gerarSenhas() {
    const quantidade = document.getElementById("quantidade-senhas").value;
    senhas = []; 
    for (let i = 1; i <= quantidade; i++) {
        senhas.push(i);
    }
    alert(`${quantidade} senhas geradas!`);
}

function atualizarStorage() {
    localStorage.setItem("senhaAtual", senhaAtual || '--');
    localStorage.setItem("senhaAnterior", senhaAnterior || '--');
    localStorage.setItem("senhaProxima", senhaProxima || '--');
    localStorage.setItem("numeroCaixaAtual", ultimoCaixaAtual || '--');
    localStorage.setItem("numeroCaixaAnterior", ultimoCaixaAnterior || '--');
}

function chamarSenha(caixa) {
    if (senhaAtual) {
        ultimoCaixaAnterior = ultimoCaixaAtual; 
        senhaAnterior = senhaAtual; 
        historicoSenhas.push({ senha: senhaAtual, guiche: ultimoCaixaAtual });
    }

    if (senhas.length > 0) {
        senhaAtual = senhas.shift(); 
        ultimoCaixaAtual = caixa; 
        senhaProxima = senhas.length > 0 ? senhas[0] : "Não há Próxima Senha"; 
    } else {
        senhaAtual = "Não há Senhas";
        senhaProxima = "Não há Próxima Senha";
    }
    atualizarDisplay(); 
    atualizarStorage(); 
}

function voltarSenha() {
    if (historicoSenhas.length > 0) {
        const { senha, guiche } = historicoSenhas.pop();
        senhas.unshift(senha);
        senhaAtual = historicoSenhas.length > 0 ? historicoSenhas[historicoSenhas.length - 1].senha : null;
        ultimoCaixaAtual = guiche; 
        senhaProxima = senhas.length > 0 ? senhas[0] : "Não há Próxima Senha"; 
    }
    atualizarDisplay(); 
    atualizarStorage(); 
}

function atualizarDisplay() {
    document.getElementById("visor-tela-anterior").innerHTML = senhaAnterior ? `Senha Anterior: ${senhaAnterior}` : "Senha Anterior: --";
    document.getElementById("numero-caixa-anterior").innerHTML = ultimoCaixaAnterior || '--';
    document.getElementById("visor-tela").innerHTML = `Senha Atual: ${senhaAtual}`;
    document.getElementById("numero-caixa-atual").innerHTML = ultimoCaixaAtual || '--';
    document.getElementById("visor-tela-proxima").innerHTML = senhaProxima ? `Próxima Senha: ${senhaProxima}` : "Próxima Senha: --";
}


function atualizarExibicao() {
    const senhaAtualLocal = localStorage.getItem("senhaAtual");
    const senhaAnteriorLocal = localStorage.getItem("senhaAnterior");
    const senhaProximaLocal = localStorage.getItem("senhaProxima");
    const numeroCaixaAtual = localStorage.getItem("numeroCaixaAtual");
    const numeroCaixaAnterior = localStorage.getItem("numeroCaixaAnterior");

    document.getElementById("visor-tela-anterior").innerHTML = senhaAnteriorLocal || '--';
    document.getElementById("numero-caixa-anterior").innerHTML = numeroCaixaAnterior || '--';
    document.getElementById("visor-tela").innerHTML = senhaAtualLocal || '--';
    document.getElementById("numero-caixa-atual").innerHTML = numeroCaixaAtual || '--';
    document.getElementById("visor-tela-proxima").innerHTML = senhaProximaLocal || '--';
}
