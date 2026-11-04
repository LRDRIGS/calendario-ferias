const gridCalendario = document.getElementById('grid-calendario');
const modal = document.getElementById('modal-dia');
const modalTitulo = document.getElementById('modal-titulo');
const modalTexto = document.getElementById('modal-texto');
const btnSalvar = document.getElementById('btn-salvar-dia');
const btnFechar = document.getElementById('btn-fechar-modal');

let diaSelecionado = null;
let anotacoes = JSON.parse(localStorage.getItem('ferias_novembro_2026')) || {};

function gerarCalendario() {
    gridCalendario.innerHTML = '';

    for (let dia = 1; dia <= 30; dia++) {
        const card = document.createElement('div');
        card.classList.add('dia-card');

        if (anotacoes[dia]) {
            card.classList.add('com-anotacao');
        }

        const previewTexto = anotacoes[dia] ? anotacoes[dia] : '';

        card.innerHTML = `
            <span class="dia-numero">${dia}</span>
            <div class="dia-preview">${previewTexto}</div>
        `;

        card.addEventListener('click', () => abrirModal(dia));
        gridCalendario.appendChild(card);
    }
}

function abrirModal(dia) {
    diaSelecionado = dia;
    modalTitulo.innerText = `Dia ${dia} de Novembro`;
    modalTexto.value = anotacoes[dia] || '';
    modal.classList.remove('hidden');
}

function fecharModal() {
    modal.classList.add('hidden');
    diaSelecionado = null;
}

btnSalvar.addEventListener('click', () => {
    if (diaSelecionado) {
        const texto = modalTexto.value.trim();
        if (texto) {
            anotacoes[diaSelecionado] = texto;
        } else {
            delete anotacoes[diaSelecionado];
        }

        localStorage.setItem('ferias_novembro_2026', JSON.stringify(anotacoes));
        gerarCalendario();
        fecharModal();
    }
});

btnFechar.addEventListener('click', fecharModal);

gerarCalendario();