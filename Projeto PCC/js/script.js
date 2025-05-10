document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const sidenav = document.getElementById('sidenav');
  const menuOverlay = document.getElementById('menu-overlay');

  // Verifica se os elementos existem antes de adicionar os eventos
  if (!menuToggle || !sidenav || !menuOverlay) {
    console.error('Elementos do menu não encontrados no DOM.');
    return;
  }

  // Abre o menu ao clicar no botão
  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    sidenav.classList.add('open'); // Adiciona a classe 'open' ao menu
    menuOverlay.classList.add('active'); // Mostra o overlay
    menuToggle.style.display = 'none'; // Esconde o botão de menu
  });

  // Fecha o menu ao clicar no overlay
  menuOverlay.addEventListener('click', () => {
    sidenav.classList.remove('open'); // Remove a classe 'open' do menu
    menuOverlay.classList.remove('active'); // Esconde o overlay
    menuToggle.style.display = 'block'; // Mostra o botão de menu novamente
  });

  const calendarTable = document.getElementById('calendar-table').querySelector('tbody');
  const currentMonthLabel = document.getElementById('current-month');
  const prevMonthButton = document.getElementById('prev-month');
  const nextMonthButton = document.getElementById('next-month');

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  // Função para gerar o calendário
  function generateCalendar(month, year) {
    calendarTable.innerHTML = ''; // Limpa o calendário anterior
    currentMonthLabel.textContent = `${months[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;

    for (let i = 0; i < 6; i++) {
      const row = document.createElement('tr');

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement('td');

        if (i === 0 && j < firstDay) {
          cell.textContent = ''; // Células vazias antes do primeiro dia
        } else if (date > daysInMonth) {
          cell.textContent = ''; // Células vazias após o último dia
        } else {
          cell.textContent = date;
          date++;
        }

        row.appendChild(cell);
      }

      calendarTable.appendChild(row);
    }
  }

  // Eventos para navegar entre os meses
  prevMonthButton.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
  });

  nextMonthButton.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
  });

  // Gera o calendário inicial
  generateCalendar(currentMonth, currentYear);

  const adiarButtons = document.querySelectorAll('.adiar-btn');

  adiarButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const id = button.getAttribute('data-id');
      const inputHorario = document.getElementById(`input-horario-${id}`);

      // Foca no campo de entrada para edição
      inputHorario.focus();

      // Salva o novo horário ao perder o foco
      inputHorario.addEventListener('blur', () => {
        const novoHorario = inputHorario.value.trim();
        if (novoHorario) {
          const horarioCell = document.getElementById(`horario-${id}`);
          horarioCell.textContent = novoHorario; // Atualiza o horário na célula
        }
      });
    });
  });

  const editarButtons = document.querySelectorAll('.editar-btn');

  editarButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const id = button.getAttribute('data-id');
      const detalhesSpan = document.getElementById(`detalhes-${id}`);

      // Cria um campo de entrada para editar os detalhes
      const input = document.createElement('input');
      input.type = 'text';
      input.value = detalhesSpan.textContent.trim();
      input.classList.add('input-detalhes');

      // Substitui o conteúdo do span pelo campo de entrada
      detalhesSpan.innerHTML = '';
      detalhesSpan.appendChild(input);
      input.focus();

      // Salva os novos detalhes ao perder o foco
      input.addEventListener('blur', () => {
        const novosDetalhes = input.value.trim();
        detalhesSpan.textContent = novosDetalhes; // Permite salvar vazio
      });

      // Salva os novos detalhes ao pressionar Enter
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          const novosDetalhes = input.value.trim();
          detalhesSpan.textContent = novosDetalhes; // Permite salvar vazio
          input.blur(); // Remove o foco do campo
        }
      });
    });
  });

  const clientesTbody = document.getElementById('clientes-tbody');

  // Exemplo de dados vindos do banco de dados
  const clientes = []; // Inicialmente vazio

  // Preenche a tabela com os dados
  clientes.forEach(cliente => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cliente.horario}</td>
      <td>${cliente.nome}</td>
      <td>${cliente.servico}</td>
      <td>
        <button class="btn-small blue lighten-2 adiar-btn">
          <i class="material-icons">schedule</i>
        </button>
      </td>
      <td>
        <button class="btn-small orange lighten-2 editar-btn">
          <i class="material-icons">edit</i>
        </button>
      </td>
    `;
    clientesTbody.appendChild(row);
  });

  const clientesCadastradosTbody = document.getElementById('clientes-cadastrados-tbody');

  // Exemplo de dados fictícios (substitua pelos dados do banco no futuro)
  const clientesCadastrados = [
    { id: 1, nome: 'João Silva', cpf: '123.456.789-00', numero: '(11) 98765-4321' },
    { id: 2, nome: 'Maria Oliveira', cpf: '987.654.321-00', numero: '(21) 91234-5678' },
    { id: 3, nome: 'Carlos Santos', cpf: '456.789.123-00', numero: '(31) 99876-5432' },
  ];

  // Preenche a tabela com os dados
  clientesCadastrados.forEach(cliente => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cliente.id}</td>
      <td>${cliente.nome}</td>
      <td>${cliente.cpf}</td>
      <td>${cliente.numero}</td>
    `;
    clientesCadastradosTbody.appendChild(row);
  });
});