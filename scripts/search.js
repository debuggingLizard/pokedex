async function executeSearch() {
  let searchString = document.getElementById("search-input").value;
  if (searchString.length >= 3) {
    document.getElementById("load-more-btn").classList.add("d-none");
    document.getElementById("loading-animation").classList.remove("d-none");
    document.getElementById("main-content-container").innerHTML = "";
    await findPkm(searchString);
    await getResultPkm();
    document.getElementById("loading-animation").classList.add("d-none");
    searchResults = [];
  }
}

async function findPkm(searchString) {
  searchResults = await pokemonAllAsJson.results.filter((pokemon) =>
    pokemon.name.includes(searchString)
  );
}

async function getResultPkm() {
  for (let i = 0; i < searchResults.length; i++) {
    let response = await fetch(searchResults[i].url);
    let pokemonResultAsJson = await response.json();
    renderResultEntries(pokemonResultAsJson, pokemonResultAsJson.id);
  }
}

function renderResultEntries(pokemonData, i) {
  let entryRef = document.getElementById("main-content-container");
  entryRef.innerHTML += getPokemonEntriesTemplate(pokemonData, i);
  let typesRef = document.getElementById("pkm-types" + i);
  for (let i = 0; i < pokemonData.types.length; i++) {
    typesRef.innerHTML += getPokemonTypesTemplate(pokemonData, i);
  }
}

function clearSearch() {
  document.getElementById("search-input").value = "";
  document.getElementById("main-content-container").innerHTML = "";
  indexStart = 1;
  document.getElementById("load-more-btn").classList.add("d-none");
  document.getElementById("loading-animation").classList.remove("d-none");
  renderPokemonEntries();
}
