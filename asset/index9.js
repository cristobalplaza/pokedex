const inputBuscar = document.getElementById('inputBuscar');
const botonBuscar = document.getElementById('botonBuscar');
const cardsContainer = document.getElementById('cards-container');

async function fetchDataAndDisplay() {
    const url = '/asset/pokemons.json';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        cardsContainer.innerHTML = '';

        data.forEach(item => {
            const card = createCard(item);
            cardsContainer.appendChild(card);
        });

        cardsContainer.addEventListener('click', (event) => {
            if (event.target.dataset.id) {
                const valores = event.target.dataset.id.split('-');
                console.log("Valores: ", valores);
                alert("Pokemon ID: " + valores[0] + " Peso: " + valores[1] +
                    " Altura: " + valores[2] + " Debilidades: " + valores[3]);
            }
        });

        return data;
    } catch (error) {
        console.error("Error en el fetch: ", error);
        throw error;
    }
}

function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');

    card.innerHTML = `
        <div class="card">
            <img class="imagenes" src=${item.ThumbnailImage} alt="error en Imagen"/>
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.type.join(" - ")}</p>
                <a href="#" class="btn btn-primary"  
                    data-id="${item.id}-${item.weight}-${item.height}-${item.weakness.join("/")}">Ver más</a>
            </div>
        </div>
    `;

    return card;
}

function eliminarRepetidos(pokemones) {
    let nombresVistos = {};
    const pokemonesUnicos = pokemones.filter(function (pokemon) {
        const nombreLowerCase = pokemon.name.toLowerCase();
        if (!nombresVistos[nombreLowerCase]) {
            nombresVistos[nombreLowerCase] = true;
            return true;
        }
        return false;
    });
    return pokemonesUnicos;
}

function listarApi(data) {
    cardsContainer.innerHTML = '';

    data.forEach(item => {
        const card = createCard(item);
        cardsContainer.appendChild(card);
    });

    cardsContainer.addEventListener('click', (event) => {
        if (event.target.dataset.id) {
            const valores = event.target.dataset.id.split('-');
            console.log("Valores: ", valores);
            alert("Pokemon ID: " + valores[0] + " Peso: " + valores[1] +
                " Altura: " + valores[2] + " Debilidades: " + valores[3]);
        }
    });
}

botonBuscar.addEventListener('click', () => {
    const searchTerm = inputBuscar.value.toLowerCase();
    const cards = cardsContainer.getElementsByClassName("col-md-4");

    Array.from(cards).forEach((card) => {
        card.style.display = "block"; // Asegúrate de que inicialmente todas las tarjetas estén visibles
        const title = card.querySelector(".card-title").textContent.toLowerCase();
        if (!title.includes(searchTerm)) {
            card.style.display = "none";
        }
    });
});

async function llamadaApi() {
    const datosApi = await fetchDataAndDisplay();
    const filtrados = eliminarRepetidos(datosApi);
    listarApi(filtrados);
}

llamadaApi();
