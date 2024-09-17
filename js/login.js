const BASE_URL = 'https://booksrental-2jtkn4w3.b4a.run'
const USER_RESOURCE = 'user'
const USER_API = `${BASE_URL}/${USER_RESOURCE}`
 
async function login(usuario, senha) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: usuario, password: senha }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('usuarioLogado', JSON.stringify(data)); // Salva dados do usuário no localStorage
      alert(`Bem-vindo, ${usuario}!`);
      window.location.href = 'index.html';
    } else {
      alert('Usuário ou senha incorretos.');
    }
  } catch (error) {
    alert('Erro ao tentar fazer login. Tente novamente mais tarde.');
    console.error(error);
  }
}

   