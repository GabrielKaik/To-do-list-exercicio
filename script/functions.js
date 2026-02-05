// VARIÁVEIS GLOBAIS
let tarefas = [];
let tarefasFeitas = 0;

const submitButton = document.getElementById('botaoSubmit');
const contadorSpan = document.getElementById('contador-span');


// LOCAL STORAGE
function salvarLocalStorage() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
    const dados = localStorage.getItem("tarefas");

    if (dados) {
        tarefas = JSON.parse(dados);

        tarefas.forEach(tarefa => {
            criarTarefaNaTela(tarefa.texto, tarefa.concluida);
        });

        contadorSpan.textContent = `Tarefas concluídas: ${tarefasFeitas}`;
    }
}


// CRIAR TAREFA NA TELA
function criarTarefaNaTela(textoTarefa, concluida = false) {
    const elementoPai = document.getElementById('listaTarefas');

    const novaDiv = document.createElement('div');
    novaDiv.classList.add('classe-dinamica');

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.checked = concluida;

    const texto = document.createElement('span');
    texto.textContent = textoTarefa;

    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add('botao-excluir');

    // Estado inicial
    if (concluida) {
        texto.classList.add('texto-riscado');
        tarefasFeitas++;
    }

    // Checkbox
    checkbox.addEventListener('change', function () {
        texto.classList.toggle('texto-riscado');
        tarefasFeitas += checkbox.checked ? 1 : -1;

        const tarefa = tarefas.find(t => t.texto === textoTarefa);
        if (tarefa) {
            tarefa.concluida = checkbox.checked;
            salvarLocalStorage();
        }

        contadorSpan.textContent = `Tarefas concluídas: ${tarefasFeitas}`;
    });

    // Botão excluir
    botaoExcluir.addEventListener('click', function () {
        const resposta = confirm('Deseja excluir a tarefa?');

        if (resposta) {
            if (checkbox.checked) {
                tarefasFeitas--;
            }

            tarefas = tarefas.filter(t => t.texto !== textoTarefa);
            salvarLocalStorage();

            novaDiv.remove();
            contadorSpan.textContent = `Tarefas concluídas: ${tarefasFeitas}`;
        }
    });

    novaDiv.appendChild(checkbox);
    novaDiv.appendChild(texto);
    novaDiv.appendChild(botaoExcluir);
    elementoPai.appendChild(novaDiv);
}


// SUBMIT
submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    const input = document.getElementById('tarefa');
    const conteudoDigitado = input.value.trim();

    if (conteudoDigitado === "") {
        alert("Esse campo está vazio!!");
        return;
    }

    tarefas.push({
        texto: conteudoDigitado,
        concluida: false
    });

    salvarLocalStorage();
    criarTarefaNaTela(conteudoDigitado, false);

    contadorSpan.textContent = `Tarefas concluídas: ${tarefasFeitas}`;
    input.value = "";
});

// INICIALIZAÇÃO
carregarTarefas();
