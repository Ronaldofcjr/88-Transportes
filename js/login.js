async function login(){
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    if(!email || !password) {
        alert('Todos os campos são obrigatórios!')
        return
    }

    let url = "https://go-wash-api.onrender.com/api/login"
    
    let data = {
        'email': email,
        'password': password,
        'user_type_id': 1
    }

    let api = await fetch(url,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    })

    try {
        let response = await api.json()

        if (!api.ok) {

            function error(){
                throw new Error(`Erro no login de usuário! Status: ${api.status}`)
            }

            if(response.data && response.data.errors){
                alert(response.data.errors)
                console.log(response.data.errors)
                error()
            } 
        
        } else{
            alert('Login realizado com sucesso!')
            localStorage.setItem('user', JSON.stringify(response))

            window.location.href = "listagem.html"
        }
     
    } catch (error) {
        console.log(error.message)
    }    
}
