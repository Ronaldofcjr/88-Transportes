async function clima() {
    const key = "c6aed0e027e54b32b83134052251006";
    const city = "São Paulo";

    // 1. CORREÇÃO PRINCIPAL: Usar crases (`) para a URL
    // 2. Usar HTTPS para a URL, é uma boa prática e evita problemas de "mixed content"
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;

    try {
        let api = await fetch(url, {
            method: 'GET'
        });

        if (api.ok) {
            let response = await api.json();
            // 3. CORREÇÃO PRINCIPAL: Usar crases (`) para o alert
            alert(`Temperatura de ${city}: ${response.current.temp_c}°C`);
            console.log(response);
        } else {
            console.error(`Erro da API: ${api.status} - ${api.statusText}`);
            let errorResponse = await api.json(); // Definir errorResponse aqui
            console.error(errorResponse);
            // Melhorar a mensagem de erro para o usuário
            alert(`Erro ao obter temperatura: ${errorResponse.error.message || 'Verifique sua chave de API ou nome da cidade.'}`);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Ocorreu um erro ao tentar buscar a temperatura. Verifique sua conexão com a internet ou a validade da sua chave API.");
    }
}