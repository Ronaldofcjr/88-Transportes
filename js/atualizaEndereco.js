document.addEventListener('DOMContentLoaded', function () {
  let salvar = document.getElementById('btnSalvarAtualizacao');

  if (salvar) {
    salvar.addEventListener('click', async function () {
      let id = document.getElementById('modal-update').getAttribute('data-endereco-id');
      let title = document.getElementById('title').value;
      let cep = document.getElementById('cep').value;
      let address = document.getElementById('address').value;
      let number = document.getElementById('number').value;
      let complement = document.getElementById('complement').value;

      if(!title || !cep || !address || !number) {
        alert('Todos os campos são obrigatórios! Exceto complemento.')
        return
      }

      let url = `https://go-wash-api.onrender.com/api/auth/address/${id}`;

      let data = {
        title,
        cep,
        address,
        number,
        complement
      }

      try {
        let response = await fetch(url,{
          method: 'POST',
          body:JSON.stringify(data),
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + getToken()
          }
        })

        if (!response.ok) { 
          throw new Error(`Erro ao atualizar endereço! Status: ${response.status}`);
        }

        alert('Endereço atualizado com sucesso!');
        $('#modal-update').modal('hide');
        listagem();

      } catch (error) {
        console.log(error.message);
      }
    })
  }
})
