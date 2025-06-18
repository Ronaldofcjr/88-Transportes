async function abrirModalAtualizar(id) {
  let url = `https://go-wash-api.onrender.com/api/auth/address/${id}`;

  try {
    let response = await fetch(url, {
      method: 'GET',
      headers:{ 
        'Authorization':'Bearer ' + getToken() 
      }
    });

    if (!response.ok) { 
      throw new Error(`Erro ao buscar endereço! Status: ${response.status}`);
    }

    let endereco = await response.json();

    document.getElementById('title').value = endereco.data.title || '';
    document.getElementById('cep').value = endereco.data.cep || '';
    document.getElementById('address').value = endereco.data.address || '';
    document.getElementById('number').value = endereco.data.number || '';
    document.getElementById('complement').value = endereco.data.complement || '';

    document.getElementById('modal-update').setAttribute('data-endereco-id', endereco.data.id);

    $('#modal-update').modal('show');

  } catch (error) {
    console.log(error.message);
  }
}
