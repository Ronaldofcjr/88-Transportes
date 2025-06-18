async function lancarEndereco(title, cep, address, number, complement){


    let token = getToken();
        if (!token) {
            alert('Usuário não logado! Faça login para continuar.')
            window.location.href = "login.html"
        }

    let url = "https://go-wash-api.onrender.com/api/auth/address"
    
    let data = {
        'title': title,
        'cep': cep,
        'address': address,
        'number': number,
        'complement': complement
    }

    let api = await fetch(url,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+`${token}`
        }
    })

    try {
        if (!api.ok) {
            throw new Error(`Erro no cadastro de endereços! Status: ${api.status}`)
        } else{
            alert('Cadastro realizado com sucesso!')

            window.location.href = "listagem.html"
        }
    
    } catch (error) {
        console.log(error.message)
    }    
}

function getToken(){
    try{
        let token = JSON.parse(localStorage.getItem('user'))

        if (!token || !token.access_token) {
            return null
        }
        
        return token.access_token

    } catch (error) {
        console.log(error.message)
    }
}