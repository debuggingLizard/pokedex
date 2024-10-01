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
    // console.log(pokemonDataAsJson);
    renderPokemonEntries(pokemonDataAsJson, i);
  }
}

function renderPokemonEntries(pokemonData, i) {
  let entryRef = document.getElementById("main-content");
  entryRef.innerHTML += getPokemonEntriesTemplate(pokemonData, i);

  let typesRef = document.getElementById("pkm-types" + i);
  for (let i = 0; i < pokemonData.types.length; i++) {
    typesRef.innerHTML += getPokemonTypesTemplate(pokemonData, i);
  }
}

function getPokemonEntriesTemplate(pokemonData, i) {
  return /*html*/ `
        <div class="pkm-entry">
            <p class="pkm-entry-number">#${pokemonData.id}</p>
            <div class="pkm-entry-info">
                <div class="pkm-entry-info-left">
                    <p>${pokemonData.name}</p>
                    <div class="pkm-entry-types" id="pkm-types${i}"></div>
                </div>
                <img src="${pokemonData.sprites.other.home.front_default}" alt="Image of ${pokemonData.name}">
            </div>
        </div>
    `;
}

function getPokemonTypesTemplate(pokemonData, i) {
  return /*html*/ `
        <span>${pokemonData.types[i].type.name}</span>
    `;
}

getOnePokemonData();

// render Functionality for Modal
const modalTemplates = {
  templateAbout: function() {
    console.log('templateAbout');
    return /*html*/`
      <table>
                        <tr>
                            <td>Species</td>
                            <td>Seed</td>
                        </tr>
                        <tr>
                            <td>Height</td>
                            <td>0.7 cm</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>6.9 kg</td>
                        </tr>
                        <tr>
                            <td>Abilities</td>
                            <td>Overgrow, Chlorophyl</td>
                        </tr>
                    </table>
    `
  },
  templateBaseStats: function() {
    console.log('templateBaseStats');
    return /*html*/`
      <table>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                        </tr>
                        <tr>
                            <td>test</td>
                            <td>0.7 cm</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>6.9 kg</td>
                        </tr>
                        <tr>
                            <td>Abilities</td>
                            <td>Overgrow, Chlorophyl</td>
                        </tr>
                    </table>
    `
  },
  templateEvolution: function() {
    console.log('templateEvolution');
  },
  templateMoves: function() {
    console.log('templateMoves');
  }
}

function renderModalStats(identifier) {
  let functionName = 'template' + identifier;
  let contentRef = document.getElementById('modal-stats');
  contentRef.innerHTML = "";
  contentRef.innerHTML = modalTemplates[functionName]();
}