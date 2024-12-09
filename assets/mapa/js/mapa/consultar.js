document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        var query = e.target.value;
        if (query) {
            searchDenuncia(query);
        }
    }
});

function searchDenuncia(query) {
    const formData = new FormData();
    formData.append('value', query);

    if (query != null && query.length > 0) {
        fetch(`${baseURL}denuncia/getDenuncia`, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            return response.json(); // Converte o corpo da resposta para JSON
        })
        .then(data => {
            if (data.denuncia) {
                displayDenunciaData(data.denuncia); // Exibe os dados na tabela
            } else {
                alert('Nenhuma denúncia encontrada.');
            }
        })
        .catch(error => {
            console.error('Erro ao consultar a denúncia:', error);
            alert('Erro ao consultar a denúncia. Tente novamente.');
        });
    }
}

function displayDenunciaData(denuncia) {
    const table = document.getElementById('denuncia-table');
    const tableBody = document.getElementById('denuncia-table-body');
    tableBody.innerHTML = ''; // Limpa qualquer dado existente na tabela

    // Se o dado não for um array, transforma em array
    const denuncias = Array.isArray(denuncia) ? denuncia : [denuncia];

    for (let i = 0; i < denuncias.length; i++) {
        const dataCadastro = denuncias[i].data_cadastro;
        const ano = new Date(dataCadastro).getFullYear();

        const natureza = denuncias[i].id_natureza;
        let tipo_denuncia;
        let status;

        if (natureza == 1) {
            tipo_denuncia = 'Poluição';
        } else if (natureza == 2) {
            tipo_denuncia = 'Fauna';
        } else if (natureza == 3) {
            tipo_denuncia = 'Flora';
        } else if (natureza == 4) {
            tipo_denuncia = 'Contra Ordenamento Urbano';
        } else if (natureza == 5) {
            tipo_denuncia = 'Administração Ambiental';
        } else if (natureza == 6) {
            tipo_denuncia = 'Administração Ambiental- contra Ordenamento Urbano';
        } else if (natureza == 7) {
            tipo_denuncia = 'Administração Ambiental - Fauna';
        } else if (natureza == 8) {
            tipo_denuncia = 'Administração Ambiental - Flora';
        } else if (natureza == 9) {
            tipo_denuncia = 'Administração Ambiental - Poluição';
        } else if (natureza == 10) {
            tipo_denuncia = 'Contra Ordenamento Urbano - Fauna';
        } else if (natureza == 11) {
            tipo_denuncia = 'Contra Ordenamento Urbano - Flora';
        } else if (natureza == 12) {
            tipo_denuncia = 'Contra Ordenamento Urbano - Poluição';
        } else if (natureza == 13) {
            tipo_denuncia = 'Fauna - Flora';
        } else if (natureza == 14) {
            tipo_denuncia = 'Fauna - Poluição';
        } else if (natureza == 15) {
            tipo_denuncia = 'Flora - Poluição';
        } else if (natureza == 16) {
            tipo_denuncia = 'Recursos Minerais';
        }

        if (denuncias[i].status == 0) {
            status = 'Em aberto';
        } else if (denuncias[i].status == 1) {
            status = 'Gerado Auto de Infração';
        } else if (denuncias[i].status == 2) {
            status = 'Gerada Notificação Ambiental';
        } else if (denuncias[i].status == 3) {
            status = 'Atendido';
        } else if (denuncias[i].status == 4) {
            status = 'Atrasada';
        }

        if (denuncias[i]) {
            const row = `
                <tr>
                    <td>DEN${ano}.${denuncias[i].id_demanda}</td>
                    <td>${denuncias[i].data_cadastro}</td>
                    <td>${tipo_denuncia}</td>
                    <td>${status}</td>
                    <td>${denuncias[i].dtinclusao ? denuncias[i].dtinclusao : ''}</td>
                    <td>${denuncias[i].descricao ? denuncias[i].descricao : 'Nenhum evento'}</td>
                </tr>
            `;

            tableBody.innerHTML += row;

            // Remove a classe 'hidden' para exibir a tabela
            table.classList.remove('hidden');
        }
    }

    // Caso nenhum dado seja encontrado, mantém a tabela oculta
    if (denuncias.length === 0) {
        table.classList.add('hidden');
    }
}