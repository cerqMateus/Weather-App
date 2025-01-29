document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    const apiKey = '44acdb9c47a73533f571ecd5b4274bb7'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
    const spinner = document.getElementById('loading-spinner');
    const errorMessage = document.getElementById('error-message');
    const natureImages = [
        'background-1',
        'background-2',
        'background-3',
    ];

    // Reset error message
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    spinner.style.display = 'block'; // Mostrar o spinner

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            spinner.style.display = 'none'; // Esconder o spinner
            if (data.cod !== 200) {
                throw new Error(data.message);
            }
            document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').textContent = `${data.main.temp}°C`;
            document.getElementById('condition').textContent = data.weather[0].description;

            // Bandeira do país
            const countryFlagUrl = `https://openweathermap.org/images/flags/${data.sys.country.toLowerCase()}.png`;
            document.getElementById('country-flag').innerHTML = `<img src="${countryFlagUrl}" alt="Bandeira de ${data.sys.country}">`;

            // Ícone da condição climática
            const weatherIconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            document.getElementById('weather-icon').innerHTML = `<img src="${weatherIconUrl}" alt="${data.weather[0].description}">`;

            // Índice UV
            const uvApiUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${data.coord.lat}&lon=${data.coord.lon}`;
            fetch(uvApiUrl)
                .then(response => response.json())
                .then(uvData => {
                    document.getElementById('uv-index').textContent = `Índice UV: ${uvData.value}`;
                });

            // Velocidade do vento
            document.getElementById('wind-speed').textContent = `Velocidade do vento: ${data.wind.speed} m/s`;

            // Seleciona uma classe de background aleatória da lista e define no body
            const randomClass = natureImages[Math.floor(Math.random() * natureImages.length)];
            document.body.className = randomClass;
        })
        .catch(error => {
            spinner.style.display = 'none'; // Esconder o spinner
            console.error('Erro ao buscar dados do clima:', error);
            errorMessage.textContent = 'Cidade não encontrada. Tente novamente.';
            errorMessage.style.display = 'block';
        });
});