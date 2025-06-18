async function listagem(){
    let url = "https://go-wash-api.onrender.com/api/auth/address"

    let api = await fetch(url,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+`${getToken()}`
        }
    })

    try {
        if (!api.ok) {
            throw new Error(`Erro na listagem de endereços! Status: ${api.status}`);
        }

        let response = await api.json()
        console.log(response)
        preencherTabela(response.data)

    } catch (error) {
        console.log(error.message);
    }    
}

function getToken(){
    let token = JSON.parse(localStorage.getItem('user'))
    return token.access_token
}

function preencherTabela(enderecos){
    const tbody = document.querySelector('table tbody')
    tbody.innerHTML = ''

    for(let i = 0; i < enderecos.length; i++){
        const endereco = enderecos[i];

        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${endereco.title || '-'}</td>
            <td>${endereco.cep || '-'}</td>
            <td>${endereco.address || '-'}</td>
            <td>${endereco.number || '-'}</td>
            <td>
                <button class="fas fa-edit btn btn-success" type="button" onclick="abrirModalAtualizar('${endereco.id}')" data-toggle="modal" data-target="#modal-update"></button>
                <button class="fas fa-edit btn btn-success" type="button" onclick="copiarEndereco('${endereco.id}')"></button>
                <button class="fas fa-trash btn btn-danger" type="button"  onclick="deletarEndereco('${endereco.id}')"> </button>
            </td>
        `

        tbody.appendChild(tr);
    }
}

document.addEventListener('DOMContentLoaded', listagem);