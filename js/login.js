  function login(usuario, senha) {
    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];
    const usuarioEncontrado = usuariosCadastrados.find(user => user.username === usuario && user.password === senha);
  
    if (usuarioEncontrado) {
      localStorage.setItem('usuarioLogado', usuario);
      alert(`Bem-vindo, ${usuario}!`);
      window.location.href = 'index.html';
    } else {
      alert('Usuário ou senha incorretos.');
    }
  }
  
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
  });
  