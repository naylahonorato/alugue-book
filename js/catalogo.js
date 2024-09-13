let livros = [

    { id: 1, titulo: "O Hobbit", autor: "J.R.R. Tolkien", alugado: false, imagem: "../imagens/OHobbit.jpg" },
    { id: 2, titulo: "1984", autor: "George Orwell", alugado: false, imagem: "../imagens/1984.jpg" },
    { id: 3, titulo: "Dom Quixote", autor: "Miguel de Cervantes", alugado: false, imagem: "../imagens/DomQuixote.jpg" },
    { id: 4, titulo: "Orgulho e Preconceito", autor: "Jane Austen", alugado: false , imagem: "../imagens/OrgulhoePreconceito.jpg"},
    { id: 5, titulo: "O Código da Vinci", autor: "Dan Brown", alugado: false , imagem: "../imagens/OCodigoDaVinci.jpg"},
    { id: 6, titulo: "Iracema", autor: "José de Alencar", alugado: false , imagem: "../imagens/Iracema.jpg"},
    { id: 7, titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", alugado: false , imagem: "../imagens/HarryPotter.jpg"},
    { id: 8, titulo: "O Senhor dos Anéis", autor: "J.R.R Tolkien", alugado: false , imagem: "../imagens/OSenhordosAneis.jpg"},
  
];

function carregarStatusAluguel() {
  const statusAluguel = JSON.parse(localStorage.getItem('statusAluguel')) || livros;
  return statusAluguel;
}

function alugarLivro(livroId) {
  const usuarioLogado = localStorage.getItem('usuarioLogado');

  if (!usuarioLogado) {
    alert("Você precisa estar logado para alugar um livro.");
    window.location.href = 'login.html'; // Redireciona para a página de login
    return;
  }

  const livrosAtualizados = carregarStatusAluguel().map(livro => {
    if (livro.id === livroId && !livro.alugado) {
      return { ...livro, alugado: true, alugadoPor: localStorage.getItem('usuarioLogado'), dataAluguel: new Date().toLocaleDateString() };
    }
    return livro;
  });
  localStorage.setItem('statusAluguel', JSON.stringify(livrosAtualizados));
  
    // Mensagem de sucesso após o aluguel
    alert('O livro foi alugado com sucesso!');

   
    location.reload();
  }
  
  function carregarLivros() {
  const livrosCatalogo = carregarStatusAluguel();
  const catalogoDiv = document.querySelector('.livros-todos');
  catalogoDiv.innerHTML = '';

  livrosCatalogo.forEach(livro => {
    const livroDiv = document.createElement('div');
    livroDiv.innerHTML = `
      <img src="${livro.imagem}" alt="${livro.titulo}" style="width:150px;height:200px;">
       <h3>${livro.titulo}</h3>
      <p>Autor: ${livro.autor}</p>
      <button ${livro.alugado ? 'disabled' : ''} onclick="alugarLivro(${livro.id})">
        ${livro.alugado ? `Alugado por ${livro.alugadoPor} em ${livro.dataAluguel}` : 'Alugar'}
      </button>
    `;
    catalogoDiv.appendChild(livroDiv);
  });
}

document.addEventListener('DOMContentLoaded', carregarLivros);


// // Função para limpar o localStorage e carregar nova lista de livros
// function limparLocalStorage() {
//   localStorage.removeItem('statusAluguel');
// }

// // Chamando a função para limpar o localStorage na inicialização
// document.addEventListener('DOMContentLoaded', () => {
//   limparLocalStorage(); // Remover após testar
//   carregarLivros(false); // Apenas livros disponíveis na página inicial
// });