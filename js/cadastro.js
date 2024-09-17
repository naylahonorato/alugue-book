// Função para cadastrar um novo usuário
const BASE_URL = 'https://booksrental-2jtkn4w3.b4a.run'
const USER_RESOURCE = 'user'
const USER_API = `${BASE_URL}/${USER_RESOURCE}`

async function createUser(nome, email,telefone, username, password) {
   
   try { 
      const response = await fetch(`${USER_API}/`, { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({nome, email,telefone, username, password})
      });

      if (response.ok) {
        console.log("usuario cadastrado");
        alert('Usuário cadastrado com sucesso! Agora você pode fazer login.');
        window.location.href = 'login.html';
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.message}`);
      }
    } catch (error) {
      alert('Erro ao cadastrar usuário. Tente novamente mais tarde.');
      console.error(error);
    } 

    }
    


