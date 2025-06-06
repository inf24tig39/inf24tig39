// Função para carregar e exibir serviços do XML
function carregarServicosXML() {
  fetch('servicos.xml')
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const servicos = xmlDoc.getElementsByTagName('servico');

      let html =
        '<table id="xml-table"><tr><th>Serviço</th><th>Descrição</th><th>Preço</th></tr>';

      for (let i = 0; i < servicos.length; i++) {
        const nome =
          servicos[i].getElementsByTagName('nome')[0].childNodes[0].nodeValue;
        const descricao =
          servicos[i].getElementsByTagName('descricao')[0].childNodes[0]
            .nodeValue;
        let preco = '';

        if (servicos[i].getElementsByTagName('preco_sessao').length > 0) {
          preco =
            servicos[i].getElementsByTagName('preco_sessao')[0].childNodes[0]
              .nodeValue + '€/sessão';
        } else if (
          servicos[i].getElementsByTagName('preco_mensal').length > 0
        ) {
          preco =
            servicos[i].getElementsByTagName('preco_mensal')[0].childNodes[0]
              .nodeValue + '€/mês';
        } else {
          preco =
            servicos[i].getElementsByTagName('preco_curso')[0].childNodes[0]
              .nodeValue + '€/curso';
        }

        html += `<tr><td>${nome}</td><td>${descricao}</td><td>${preco}</td></tr>`;
      }

      html += '</table>';
      document.getElementById('servicos-xml').innerHTML = html;
    })
    .catch((error) => console.error('Erro ao carregar XML:', error));
}

// Chamar a função quando a página carregar
window.onload = function () {
  carregarServicosXML();

  // Adicionar manipuladores de eventos
  document
    .getElementById('btn-alterar')
    .addEventListener('click', alterarConteudo);
  document
    .getElementById('btn-toggle')
    .addEventListener('click', toggleElemento);
};

// Funções para manipulação DOM
function alterarConteudo() {
  const elemento = document.getElementById('conteudo-dinamico');
  elemento.innerHTML = '<mark>Conteúdo alterado com sucesso!</mark>';
  elemento.style.color = '#e74c3c';
  elemento.style.fontWeight = 'bold';
}

function toggleElemento() {
  const elemento = document.getElementById('elemento-toggle');
  elemento.style.display = elemento.style.display === 'none' ? 'block' : 'none';
}

function mostrarDetalhes(elemento) {
  const detalhes = elemento.querySelector('.detalhes-equipa');
  detalhes.classList.toggle('escondido');
}

// Menu Mobile
document
  .querySelector('.mobile-menu-btn')
  .addEventListener('click', function () {
    document.querySelector('nav ul').classList.toggle('show');
  });

// Animação de scroll suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});
