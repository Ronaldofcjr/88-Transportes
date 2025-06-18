async function logout(){
    
    let token = getToken();
        if (!token) {
            alert('Usuário não logado! Faça login para continuar.')
            window.location.href = "login.html"
        }
        
    let url = "https://go-wash-api.onrender.com/api/auth/logout"

    let api = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+`${token}`
        }
    })

   try {
        if (!api.ok) {
            throw new Error(`Erro no logout de usuário! Status: ${api.status}`)
        } else{
            alert('Logout realizado com sucesso!')
            localStorage.removeItem('user')

            window.location.href = "login.html"
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