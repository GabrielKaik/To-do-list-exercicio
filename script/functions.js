 
 function criarCampo(elementoPai, campo, tipoCampo, texto) //elemento pai > div na qual o campo vai ficar dentro
            {                                                     //campo → tipo de elemento a ser criado (ex: 'input', 'button', 'span')
                let pai = document.getElementById(elementoPai);   // - tipoCampo → tipo do campo (ex: 'text', 'checkbox', etc.) [opcional]
                let novaDiv = document.createElement('div');      // - texto → texto que será exibido ao lado do campo
                
                let novoCampo = document.createElement(campo);
                if (tipoCampo) novoCampo.type = tipoCampo;
                
                let spanTexto = document.createElement('span');
                spanTexto.textContent = texto;  

                novaDiv.appendChild(novoCampo);
                novaDiv.appendChild(spanTexto)
                pai.appendChild(novaDiv);
            }

        const botaoTeste = document.getElementById('botao-teste');
        botaoTeste.addEventListener('click', () => criarCampo("classTeste", 'span',null , "Campo adicionado dinamicamente"));

    
/////////////////////////////////////////////////////////////////////////////////////////////

const submitButton = document.getElementById('botaoSubmit');
        submitButton.addEventListener('click', function(event) 
            {
                event.preventDefault();
                
                let elementoPai = document.getElementById('listaTarefas');
                let conteudo = document.getElementById('tarefa').value;

                let novaDiv = document.createElement('div'); //Cria uma div dentro do card Checklist
                let novoCampo = document.createElement('input'); //Cria um campo checkbox
                novoCampo.type="checkbox";
                
                let texto = document.createElement('span');
                texto.textContent = conteudo;

                let criarBotao = document.createElement('button');
                criarBotao.textContent = "Excluir";
                criarBotao.classList.add('botao-excluir');

                    criarBotao.addEventListener('click', function() 
                    {
                    const resposta = confirm('Deseja excluir a tarefa? Será permanente.');

                    if (resposta)
                    {
                        novaDiv.remove(); // remove a div da tarefa
                    }
                    
                    });
                
                novaDiv.classList.add('classe-dinamica');

                novaDiv.appendChild(novoCampo);
                novaDiv.appendChild(texto);
                novaDiv.appendChild(criarBotao);
                elementoPai.appendChild(novaDiv);
            });
        ;

