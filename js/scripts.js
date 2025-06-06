function carregarTabelaPrecos() {
  fetch('xml/servicos.xml')
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, 'text/xml');
      const servicos = xmlDoc.getElementsByTagName('servico');
      const container = document.getElementById('tabela-precos-dinamica');

      // Criar estrutura da tabela
      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const tbody = document.createElement('tbody');

      // Cabeçalho
      const headerRow = document.createElement('tr');
      ['Serviço', 'Modalidade', 'Duração', 'Preço'].forEach((text) => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);

      // Processar serviços
      for (let i = 0; i < servicos.length; i++) {
        const servico = servicos[i];
        const nome = servico.getElementsByTagName('nome')[0].textContent;
        const modalidades = servico.getElementsByTagName('modalidade');
        let firstRow = true;

        for (let j = 0; j < modalidades.length; j++) {
          const modalidade = modalidades[j];
          const tipo = modalidade.getAttribute('tipo');
          const frequencia =
            modalidade.getElementsByTagName('frequencia')[0].textContent;
          const duracao =
            modalidade.getElementsByTagName('duracao')[0]?.textContent || '';
          const sessoes =
            modalidade.getElementsByTagName('sessoes')[0]?.textContent || '';
          const preco = modalidade.getElementsByTagName('preco')[0].textContent;
          const unidade =
            modalidade.getElementsByTagName('unidade')[0].textContent;

          const row = document.createElement('tr');

          // Nome do serviço (apenas na primeira linha)
          if (firstRow) {
            const nomeCell = document.createElement('td');
            nomeCell.textContent = nome;
            nomeCell.rowSpan = modalidades.length;
            row.appendChild(nomeCell);
            firstRow = false;
          }

          // Modalidade
          const modalidadeCell = document.createElement('td');
          modalidadeCell.textContent = frequencia;
          row.appendChild(modalidadeCell);

          // Duração/Sessões
          const duracaoCell = document.createElement('td');
          duracaoCell.textContent =
            duracao || (sessoes ? `${sessoes} sessões` : '-');
          row.appendChild(duracaoCell);

          // Preço
          const precoCell = document.createElement('td');
          precoCell.textContent = `${preco}${unidade}`;
          row.appendChild(precoCell);

          tbody.appendChild(row);
        }
      }

      // Montar tabela
      table.appendChild(thead);
      table.appendChild(tbody);
      container.appendChild(table);
    })
    .catch((error) => console.error('Erro ao carregar tabela:', error));
}

// Chamar a função quando a página carregar
window.addEventListener('DOMContentLoaded', carregarTabelaPrecos);

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

// Destaque no menu de navegação
document.addEventListener('DOMContentLoaded', function () {
  // Obter o caminho da URL atual
  const path = window.location.pathname.split('/').pop();

  // Remover a classe "atual" de todos os itens
  document.querySelectorAll('nav ul li').forEach((item) => {
    item.classList.remove('atual');
  });

  // Adicionar a classe "atual" ao item correspondente
  if (path === 'index.html' || path === '') {
    document.querySelector('nav ul li:first-child').classList.add('atual');
  } else if (path === 'servicos.html') {
    document.querySelector('nav ul li:nth-child(2)').classList.add('atual');
  } else if (path === 'equipa.html') {
    document.querySelector('nav ul li:nth-child(3)').classList.add('atual');
  } else if (path === 'contactos.html') {
    document.querySelector('nav ul li:nth-child(4)').classList.add('atual');
  }
});
// Função para mostrar/esconder detalhes da equipa
function toggleDetalhes(element) {
  const detalhes = element.querySelector('.detalhes-equipa');
  detalhes.classList.toggle('ativo');

  // Fecha os detalhes de outros membros
  document.querySelectorAll('.membro-equipa').forEach((membro) => {
    if (
      membro !== element &&
      membro.querySelector('.detalhes-equipa').classList.contains('ativo')
    ) {
      membro.querySelector('.detalhes-equipa').classList.remove('ativo');
    }
  });
}

// Adiciona o evento de clique a cada membro
document.querySelectorAll('.membro-equipa').forEach((membro) => {
  membro.addEventListener('click', function () {
    toggleDetalhes(this);
  });
});
