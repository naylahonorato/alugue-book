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

function salvarLivrosNoLocalStorage(livrosAtualizados) {
  localStorage.setItem('statusAluguel', JSON.stringify(livrosAtualizados));
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
  salvarLivrosNoLocalStorage(livrosAtualizados);
  
  alert('O livro foi alugado com sucesso!');
  location.reload();
  carregarLivros(); // Atualiza a lista de livros
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
      <button onclick="editarLivro(${livro.id})">Editar</button>
      <button onclick="excluirLivro(${livro.id})">Excluir</button>
    `;
    catalogoDiv.appendChild(livroDiv);
  });
}

// Adicionar Livro
function adicionarLivro(titulo, autor, imagem) {
  const livrosCatalogo = carregarStatusAluguel();
  const novoLivro = {
    id: livrosCatalogo.length ? livrosCatalogo[livrosCatalogo.length - 1].id + 1 : 1, // Correção do ID
    titulo,
    autor,
    alugado: false,
    imagem
  };
  livrosCatalogo.push(novoLivro);
  
  salvarLivrosNoLocalStorage(livrosCatalogo);
  
  alert('O livro foi adicionado com sucesso!');
  carregarLivros(); // Atualiza a lista de livros
}

// Editar Livro
function editarLivro(id) {
  const livrosCatalogo = carregarStatusAluguel();
  const livro = livrosCatalogo.find(l => l.id === id);
  const novoTitulo = prompt("Novo título:", livro.titulo);
  const novoAutor = prompt("Novo autor:", livro.autor);
  const novaImagem = prompt("Nova URL da imagem:", livro.imagem);

  livro.titulo = novoTitulo || livro.titulo;
  livro.autor = novoAutor || livro.autor;
  livro.imagem = novaImagem || livro.imagem;

  salvarLivrosNoLocalStorage(livrosCatalogo);
  
  alert('O livro foi editado com sucesso!');
  carregarLivros(); // Atualiza a lista de livros
}

// Excluir Livro
function excluirLivro(id) {
  let livrosCatalogo = carregarStatusAluguel();
  livrosCatalogo = livrosCatalogo.filter(livro => livro.id !== id);
  salvarLivrosNoLocalStorage(livrosCatalogo);
  
  alert('O livro foi excluido com sucesso!');
  carregarLivros(); // Atualiza a lista de livros
}

// Listener para o formulário de adicionar livro
document.addEventListener('DOMContentLoaded', function() {
  carregarLivros();

  // Adiciona um listener para o formulário de adicionar livro
  document.getElementById('form-adicionar-livro').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const imagem = document.getElementById('imagem').value;

    adicionarLivro(titulo, autor, imagem);

    // Limpa os campos do formulário
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('imagem').value = '';
  });
});

// // Função para limpar o localStorage e carregar nova lista de livros
// function limparLocalStorage() {
//   localStorage.removeItem('statusAluguel');
// }

// // Chamando a função para limpar o localStorage na inicialização
// document.addEventListener('DOMContentLoaded', () => {
//   limparLocalStorage(); // Remover após testar
//   carregarLivros(false); // Apenas livros disponíveis na página inicial
// });
