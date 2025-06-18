async function cadastro(){
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let cpf_cnpj = document.getElementById("cpf_cnpj").value
    let terms = document.getElementById("terms").checked
    let birth_data = document.getElementById("birth_data").value

    if(!name || !email || !password || !cpf_cnpj || !terms || !birth_data) {
        alert('Todos os campos são obrigatórios!')
        return
    }

    let url = "https://go-wash-api.onrender.com/api/user"
    
    let data = {
        'name': name,
        'email': email,
        'user_type_id': 1,
        'password': password,
        'cpf_cnpj': cpf_cnpj,
        'terms': terms,
        'birthday': birth_data
    }

    let api = await fetch(url,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    })

    try {
        let response = await api.json();

        if (!api.ok) {

            function error(){
                throw new Error(`Erro no cadastro de usuário! Status: ${api.status}`);
            }

            if(response.data && response.data.errors){

                if(response.data.errors.email){
                    alert('E-mail já cadastrado!')
                    console.log(response.data.errors.email)
                    error()
                }

                if(response.data.errors.cpf_cnpj){
                    alert('CPF | CNPJ já cadastrado!')
                    console.log(response.data.errors.cpf_cnpj)
                    error()
                }

                if(response.data.errors.password){
                    alert('A senha deve ter pelo menos 6 caracteres!')
                    console.log(response.data.errors.password)
                    error()
                }
            } 
        
        } else{
            alert(response.data)
        }
    
    } catch (error) {
        console.log(error.message);
    }    
}