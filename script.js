let url = "https://pokeapi.co/api/v2/";

// async function getAllPokemonData() {
//     let response = await fetch(url + "pokemon?limit=151&offset=0");
//     let responseAsJson = await response.json();
//     console.log(responseAsJson);
//     renderPokemonEntries(responseAsJson)
// }

// getAllPokemonData();

async function getOnePokemonData() {
    let response = await fetch(url + "pokemon/1/");
    let pokemonDataAsJson = await response.json();
    console.log(pokemonDataAsJson);
    renderPokemonEntries(pokemonDataAsJson);
}

// getOnePokemonData();

function renderPokemonEntries(pokemonData) {
    let entryRef = document.getElementById('main-content');
    entryRef.innerHTML = getPokemonEntriesTemplate(pokemonData);
}

function getPokemonEntriesTemplate() {
    return /*html*/`
        <div class="pokemon-entry">
            <div>
                <span>${pokemonData.name}</span>
                <span>#${pokemonData.id}</span>
            </div>
            <div>
                <img src="#" alt="">
            </div>
            <div>
                <span>Type 1</span>
                <span>Type 2</span>
            </div>
        </div>
    `
}