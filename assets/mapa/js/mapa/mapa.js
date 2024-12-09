// Inicializar o mapa
var map = L.map('map').setView([-27.591839, -48.548793], 13);  // Coordenadas de Florinopolis

// Camada de mapa usando OpenStreetMap (via CDN)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ''
}).addTo(map);

// Ícones personalizados do Leaflet
var customIcon = L.icon({
    iconUrl: 'assets/mapa/marker-icon.png', // URL da imagem do marcador
    iconSize: [38, 38], // Tamanho do ícone [largura, altura]
    iconAnchor: [19, 38], // Ponto de ancoragem [x, y]
    popupAnchor: [0, -38], // Ponto onde o pop-up aparecerá em relação ao ícone
    shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png', // (Opcional) Sombra do marcador
    shadowSize: [41, 41], // Tamanho da sombra
    shadowAnchor: [12, 41] // Ponto de ancoragem da sombra
});

// Variável para armazenar o marcador
var marker = null;
var address;
var lat;
var lon;

// Função para realizar a busca de endereço e exibir resultados dinâmicos
function searchAddress(query) {
    var geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1`;

    // Requisição para a API de Geocodificação
    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            // Limpar resultados anteriores
            const resultsContainer = document.getElementById('search-results');
            resultsContainer.innerHTML = '';

            // Verificar se há resultados
            if (data.length > 0) {
                data.forEach((result) => {
                    // Criar item da lista
                    const listItem = document.createElement('li');
                    listItem.textContent = result.display_name;
                    
                    // Evento de clique para preencher o campo de pesquisa com o resultado
                    listItem.addEventListener('click', function() {
                        document.getElementById('search-input').value = result.display_name;
                        resultsContainer.innerHTML = ''; // Limpar os resultados após a seleção
                        // Chama a função para mostrar o endereço no mapa e preencher os dados
                        showAddressOnMap(result);
                    });

                    // Adiciona item à lista de resultados
                    resultsContainer.appendChild(listItem);
                });
            } else {
                // Se não encontrar resultados
                resultsContainer.innerHTML = '<li>Nenhum resultado encontrado</li>';
            }
        })
        .catch(err => {
            console.error('Erro na pesquisa:', err);
        });
}

// Função para exibir o endereço no mapa (após selecionar um item da lista)
function showAddressOnMap(result) {
    lat = result.lat;
    lon = result.lon;

    // Detalhes do endereço
    const addressDetails = `
        <div class="address-details">
            <b>Localização:</b><br>
            <b>CEP:</b> ${result.address.postcode || 'Desconhecido'}<br>
            <b>Rua:</b> ${result.address.road || 'Desconhecida'}<br>
            <b>Número:</b> ${result.address.house_number || 'Desconhecido'}<br>
            <b>Bairro:</b> ${result.address.suburb || 'Desconhecido'}<br>
            <b>Cidade:</b> ${result.address.city || 'Desconhecida'}<br>
            <b>Estado:</b> ${result.address.state || 'Desconhecido'}<br>
        </div>
    `;

    // Atualiza o campo de texto com o endereço
    document.getElementById('endereco').innerText = `${result.address.road || 'Desconhecida'}, Nº ${result.address.house_number || 'Desconhecido'}, ${result.address.suburb || 'Desconhecido'}, ${result.address.city || 'Desconhecida'}, ${result.address.state || 'Desconhecido'}`;

    // Atualiza o mapa com o novo marcador
    if (marker) {
        marker.setLatLng([lat, lon]).bindPopup(addressDetails).openPopup();
    } else {
        marker = L.marker([lat, lon], { draggable: true, icon: customIcon })
            .addTo(map)
            .bindPopup(addressDetails)
            .openPopup();
    }

    // Atualiza a visão do mapa para o local encontrado
    map.setView([lat, lon], 13);

    marker.on('dragend', function() {
        var newLatLng = marker.getLatLng();
        reverseGeocode(newLatLng.lat, newLatLng.lng);
    });
}

// Função para fazer a reversa geocodificação e obter o endereço baseado nas coordenadas
function reverseGeocode(lat, lon) {
    var reverseUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;

    fetch(reverseUrl)
        .then(response => response.json())
        .then(data => {

            // Detalhes do endereço
            address = data.address || {};
            lat = lat; // Atribuir a latitude
            lon = lon; // Atribuir a longitude

            // Criar o texto de detalhes do endereço
            var addressDetails = `
                <div class="address-details">
                    <b>Localização:</b><br>
                    <b>CEP:</b> ${address.postcode || 'Desconhecido'}<br>
                    <b>Rua:</b> ${address.road || 'Desconhecida'}<br>
                    <b>Número:</b> ${address.house_number || 'Desconhecido'}<br>
                    <b>Bairro:</b> ${address.suburb || 'Desconhecido'}<br>
                    <b>Cidade:</b> ${address.city || 'Desconhecida'}<br>
                    <b>Estado:</b> ${address.state || 'Desconhecido'}<br>
                </div>
            `;

            // Atualiza o campo de texto com o endereço
            document.getElementById('endereco').innerText = `
            ${address.road || 'Desconhecida'}, Nº ${address.house_number || 'Desconhecido'}, ${address.suburb || 'Desconhecido'}, ${address.city || 'Desconhecida'}, ${address.state || 'Desconhecido'}
            `;

            // Atualizar o pop-up do marcador
            if (marker) {
                marker.bindPopup(addressDetails).openPopup();
            }
        })
        .catch(err => console.error('Erro na geocodificação reversa:', err));
}

// Evento para quando o usuário digitar no campo de pesquisa
document.getElementById('search-input').addEventListener('input', function() {
    const query = this.value;
    if (query) {
        searchAddress(query); // Inicia a busca
    } else {
        document.getElementById('search-results').innerHTML = ''; // Limpar resultados se o campo estiver vazio
    }
});

// Envia Denuncia
document.getElementById('enviar-denuncia').addEventListener('click', function () {
    const pontoReferencia = document.getElementById('ponto_referencia').value;
    const tipoDenuncia = document.getElementById('id_natureza').value;
    const descricao = document.getElementById('descricao').value;
    const anexos = document.getElementById('imagens').files;
    const endereco = document.getElementById('endereco').innerText;
    const email = document.getElementById('email').value;

    // Validar os campos obrigatórios
    if (!pontoReferencia || !tipoDenuncia || !descricao || !endereco || !anexos) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Criar um FormData para enviar os dados, incluindo os anexos
    const formData = new FormData();
    formData.append('ponto_referencia', pontoReferencia);
    formData.append('id_natureza', tipoDenuncia);
    formData.append('descricao', descricao);
    formData.append('endereco', endereco);
    formData.append('email', email);
    formData.append('bairro', address.suburb)
    formData.append('coordenada1', lat);
    formData.append('coordenada2', lon);
    formData.append('municipio', address.city);

    // Função para converter imagem para Base64
    const convertImageToBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result // Remove o prefixo "data:image/png;base64,"
            callback(base64String);
        };
        reader.readAsDataURL(file); // Lê o arquivo como DataURL
    };

    // Processar os anexos e converter para Base64
    const promises = [];
    for (let i = 0; i < anexos.length; i++) {
        const file = anexos[i];
        const promise = new Promise((resolve, reject) => {
            convertImageToBase64(file, (base64String) => {
                formData.append('imagens[]', base64String); // Adiciona o base64 à FormData
                resolve();
            });
        });
        promises.push(promise);
    }

    // Esperar a conversão de todas as imagens antes de enviar o formulário
    Promise.all(promises)
    .then(() => {
        // Enviar os dados para o servidor via fetch
        fetch(`${baseURL}denuncia/postDenuncia`, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            return response.text(); // Lê como texto primeiro
        })
        .then(text => {
            // Tenta parsear como JSON
            let data;
            try {
                data = JSON.parse(text);
            } catch (error) {
                throw new Error('Resposta do servidor não é um JSON válido: ' + text);
            }

            if (data) {
                alert('Denúncia enviada com sucesso!');
                document.querySelector('.form-box').reset();
            } else {
                alert('Erro ao enviar denúncia: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erro ao enviar a denúncia:', error);
            alert('Erro ao enviar a denúncia. Tente novamente.');
        });
    })
    .catch(error => {
        console.error('Erro ao processar as imagens:', error);
        alert('Erro ao processar as imagens. Tente novamente.');
    });
});
