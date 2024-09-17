const BASE_URL = 'https://booksrental-2jtkn4w3.b4a.run'
const BOOK_RESOURCE = 'book'
const BOOK_API = `${BASE_URL}/${BOOK_RESOURCE}`


async function carregarLivros() {
  try {
    const response = await fetch(BOOK_API);
    const livros = await response.json();

    const catalogoDiv = document.querySelector('.livros-todos');
    catalogoDiv.innerHTML = '';

    livros.forEach(livro => {
      const livroDiv = document.createElement('div');
      livroDiv.innerHTML = `
        <img src="${livro.imagem}" alt="${livro.titulo}" style="width:150px;height:200px;">
        <h3>${livro.titulo}</h3>
        <p>Autor: ${livro.autor}</p>
        <button ${livro.alugado ? 'disabled' : ''} onclick="alugarLivro(${livro.id})">
          ${livro.alugado ? `Alugado por ${livro.alugadoPor} em ${livro.dataAluguel}` : 'Alugar'}
        </button>
        <button onclick="editarLivro(${livro.id})">Editar</button>
        <button onclick="excluirLivro(${livro.id})">Excluir</button>
      `;
      catalogoDiv.appendChild(livroDiv);
    });
  } catch (error) {
    console.error('Erro ao carregar os livros:', error);
  }
}


async function alugarLivro(livroId) {
  const usuarioLogado = localStorage.getItem('usuarioLogado');

  if (!usuarioLogado) {
    alert("Você precisa estar logado para alugar um livro.");
    window.location.href = 'login.html';
    return;
  }

  try {
    const response = await fetch(`${BOOK_API}/${livroId}/alugar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
    });

    if (response.ok) {
      alert('O livro foi alugado com sucesso!');
      carregarLivros(); // Atualiza a lista de livros
    } else {
      const errorData = await response.json();
      alert(`Erro: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Erro ao alugar o livro:', error);
  }
}



// // Função para limpar o localStorage e carregar nova lista de livros
// function limparLocalStorage() {
//   localStorage.removeItem('statusAluguel');
// }

// // Chamando a função para limpar o localStorage na inicialização
// document.addEventListener('DOMContentLoaded', () => {
//   limparLocalStorage(); // Remover após testar
//   carregarLivros(false); // Apenas livros disponíveis na página inicial
// });
