document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    const apiKey = '44acdb9c47a73533f571ecd5b4274bb7'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
    const spinner = document.getElementById('loading-spinner');
    const natureImages = [
        'background-1',
        'background-2',
        'background-3',
    ];

    spinner.style.display = 'block'; // Mostrar o spinner

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            spinner.style.display = 'none'; // Esconder o spinner
            document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').textContent = `${data.main.temp}°C`;
            document.getElementById('condition').textContent = data.weather[0].description;

            // Seleciona uma classe de background aleatória da lista e define no body
            const randomClass = natureImages[Math.floor(Math.random() * natureImages.length)];
            document.body.className = randomClass;
        })
        .catch(error => {
            spinner.style.display = 'none'; // Esconder o spinner
            console.error('Erro ao buscar dados do clima:', error);
            alert('Cidade não encontrada. Tente novamente.');
        });
});