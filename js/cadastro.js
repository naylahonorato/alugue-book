// Função para cadastrar um novo usuário
function cadastrarUsuario(nome, email, username, password, confirmPassword) {
    // Validação simples de senha
    if (password !== confirmPassword) {
      alert('As senhas não coincidem. Por favor, tente novamente.');
      return;
    }
  
    // Verifica se o nome de usuário já existe
    const usuariosCadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];
    const usuarioExistente = usuariosCadastrados.find(user => user.username === username);
  
    if (usuarioExistente) {
      alert('Nome de usuário já existe. Por favor, escolha outro.');
      return;
    }
  
    // Cria o novo usuário
    const novoUsuario = {
      nome,
      email,
      username,
      password
    };
  
    // Adiciona o novo usuário à lista de usuários cadastrados
    usuariosCadastrados.push(novoUsuario);
    localStorage.setItem('usuariosCadastrados', JSON.stringify(usuariosCadastrados));
  
    alert('Usuário cadastrado com sucesso! Agora você pode fazer login.');
    window.location.href = 'login.html'; // Redireciona para a página de login após o cadastro
  }
  
  // Evento para o formulário de cadastro
  document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página
  
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    cadastrarUsuario(nome, email, username, password, confirmPassword);
  });
  


