let url = "https://pokeapi.co/api/v2/";

// async function getAllPokemonData() {
//     let response = await fetch(url + "pokemon?limit=151&offset=0");
//     let responseAsJson = await response.json();
//     console.log(responseAsJson);
//     renderPokemonEntries(responseAsJson)
// }

// getAllPokemonData();

async function getOnePokemonData() {
    for (let i = 1; i <= 20; i++) {
        let response = await fetch(url + "pokemon/" + i);
        let pokemonDataAsJson = await response.json();
        console.log(pokemonDataAsJson);
        renderPokemonEntries(pokemonDataAsJson, i);
    }
}

function renderPokemonEntries(pokemonData, i) {
    let entryRef = document.getElementById('main-content');
    entryRef.innerHTML += getPokemonEntriesTemplate(pokemonData, i);

    let typesRef = document.getElementById('pokemon-types' + i);
    for (let i = 0; i < pokemonData.types.length; i++) {
        typesRef.innerHTML += getPokemonTypesTemplate(pokemonData, i);
    }
}

function getPokemonEntriesTemplate(pokemonData, i) {
    return /*html*/`
        <div class="pokemon-entry">
            <div>
                <span>${pokemonData.name}</span>
                <span>#${pokemonData.id}</span>
            </div>
            <div>
                <img src="${pokemonData.sprites.other.home.front_default}" alt="">
            </div>
            <div id="pokemon-types${i}">
            </div>
        </div>
    `
}

function getPokemonTypesTemplate(pokemonData, i) {
    return /*html*/`
        <span>${pokemonData.types[i].type.name}</span>
    `
}

getOnePokemonData();