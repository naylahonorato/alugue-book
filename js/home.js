// Função para carregar apenas os livros disponíveis
document.addEventListener('DOMContentLoaded', function() {
    carregarLivros(true); // true = carregar apenas os disponíveis
  });

function usuarioEstaLogado() {
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  return usuarioLogado ? true : false;
}

function mostrarUsuarioLogado() {
  const usuario = localStorage.getItem('usuarioLogado');
  const usuarioDiv = document.getElementById('usuarioLogado');
  
  if (usuario) {
    usuarioDiv.textContent = `Usuário logado: ${usuario}`;
    document.getElementById('logoutBtn').style.display = 'block';
  }
}

function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'login.html';
}

document.getElementById('logoutBtn').addEventListener('click', logout);

document.addEventListener('DOMContentLoaded', function() {
  if (!usuarioEstaLogado()) {
  
  } else {
    mostrarUsuarioLogado();
  }
});

function carregarLivrosDisponiveis() {
  const livrosCatalogo = JSON.parse(localStorage.getItem('statusAluguel')) || livros; // Obtém o status dos livros do armazenamento ou usa o padrão
  const livrosDisponiveis = livrosCatalogo.filter(livro => !livro.alugado); // Filtra os livros que não estão alugados
  const catalogoDiv = document.querySelector('.livros-disponiveis'); // Div onde os livros serão exibidos
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
}


document.addEventListener('DOMContentLoaded', carregarLivrosDisponiveis);

