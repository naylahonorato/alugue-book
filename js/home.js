const BASE_URL = 'https://booksrental-2jtkn4w3.b4a.run'
const BOOK_RESOURCE = 'book'
const BOOK_API = `${BASE_URL}/${BOOK_RESOURCE}`

async function carregarLivrosDisponiveis() {
  try {
    const response = await fetch(`${BOOK_API}/disponiveis`);
    const livrosDisponiveis = await response.json();

    const catalogoDiv = document.querySelector('.livros-disponiveis');
    catalogoDiv.innerHTML = '';

    livrosDisponiveis.forEach(livro => {
      const livroDiv = document.createElement('div');
      livroDiv.innerHTML = `
        <img src="${livro.imagem}" alt="${livro.titulo}" style="width:150px;height:200px;">
        <h3>${livro.titulo}</h3>
        <p>Autor: ${livro.autor}</p>
        <button onclick="alugarLivro(${livro.id})">Alugar</button>
      `;
      catalogoDiv.appendChild(livroDiv);
    });
  } catch (error) {
    console.error('Erro ao carregar os livros disponíveis:', error);
  }
}

document.addEventListener('DOMContentLoaded', carregarLivrosDisponiveis);


