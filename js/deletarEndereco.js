async function deletarEndereco(id) {
  let confirmacao = confirm("Tem certeza que deseja deletar esse endereço?");
  if (!confirmacao) return;

  let url = `https://go-wash-api.onrender.com/api/auth/address/${id}`;

  try {
    let response = await fetch(url, {
      method: 'DELETE',
      headers:{
        'Authorization':'Bearer ' + getToken()
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar endereço! Status: ${response.status}`);
    }

    alert("Endereço deletado com sucesso!");
    listagem();

  } catch (error) {
    console.log(error.message);
  }
}