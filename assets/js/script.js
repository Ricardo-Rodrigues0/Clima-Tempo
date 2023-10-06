// Variáveis e seleção de elementos
const cityInput = document.querySelector("#city-input"); // Input de entrada de cidade
const searchBtn = document.querySelector("#search"); // Botão de pesquisa

const cityElement = document.querySelector("#city"); // Elemento que exibirá o nome da cidade
const tempElement = document.querySelector("#temperature span"); // Elemento que exibirá a temperatura
const descElement = document.querySelector("#description"); // Elemento que exibirá a descrição do tempo
const weatherIconElement = document.querySelector("#weather-icon"); // Elemento que exibirá o ícone do tempo
const countryElement = document.querySelector("#country"); // Elemento que exibirá a bandeira do país
const humidityElement = document.querySelector("#humidity span"); // Elemento que exibirá a umidade
const windElement = document.querySelector("#wind span"); // Elemento que exibirá a velocidade do vento

const weatherContainer = document.querySelector("#weather-data"); // Contêiner que envolve os elementos de dados do tempo

const errorMessageContainer = document.querySelector("#error-message"); // Contêiner para mensagens de erro
const errorMessage2Container = document.querySelector("#error-message2"); // Contêiner para outro tipo de mensagem de erro

const loader = document.querySelector("#loader"); // Elemento de carregamento

const suggestionContainer = document.querySelector("#suggestions"); // Contêiner de sugestões
const suggestionButtons = document.querySelectorAll("#suggestions button"); // Botões de sugestão

// Função para alternar a visibilidade do carregamento
const toggleLoader = () => {
    loader.classList.toggle("hide");
};

// Função para obter dados do tempo usando a API OpenWeatherMap
const getWeatherData = async (city) => {
    toggleLoader();

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    toggleLoader();

    return data;
};

// Função para exibir uma mensagem de erro
const showErrorMessage = (errorContainer) => {
    errorContainer.classList.remove("hide");
};

// Função para ocultar informações de tempo e mensagens de erro
const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    errorMessage2Container.classList.add("hide");
    weatherContainer.classList.add("hide");
    suggestionContainer.classList.add("hide");
};

// Função para exibir dados do tempo com base na cidade fornecida
const showWeatherData = async (city) => {
    hideInformation();

    const data = await getWeatherData(city);

    if (data.cod === "404") {
        showErrorMessage(errorMessageContainer);
    } else if (data.cod === "400") {
        showErrorMessage(errorMessage2Container);
    }

    cityElement.innerText = data.name;
    tempElement.innerHTML = `<strong> Temperatura: </strong> ${parseInt(data.main.temp)}°C`;
    descElement.innerHTML = `<strong> Tempo: </strong>${data.weather[0].description}`;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
};

// Eventos
// Evento do clique no botão de pesquisa
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

// Evento de pressionar a tecla Enter no campo de entrada da cidade
cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
});

// Sugestões
// Evento de clique nos botões de sugestão
suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const city = btn.getAttribute("id");

        showWeatherData(city);
    });
});
