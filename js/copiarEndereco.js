async function copiarEndereco(id) {

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

        title = endereco.data.title
        cep = endereco.data.cep
        address = endereco.data.address
        number = endereco.data.number
        complement = endereco.data.complement

        console.log(title, cep, address, number, complement)

        lancarEndereco(title, cep, address, number, complement)

    } catch (error) {
        console.log(error.message)
    }    
    
}