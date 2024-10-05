let url = "https://pokeapi.co/api/v2/";
let indexStart = 1;
let pokemonAllAsJson = {};
let searchResults = [];

function init() {
  renderPokemonEntries();
  getAllPokemonData();
}

async function renderPokemonEntries() {
  let loadBtnRef = document.getElementById("load-more-btn");
  let loadingAnimation = document.getElementById('loading-animation');
  let mainContentContainer = document.getElementById("main-content-container");
  let newEntries = [];
  let pokemonDataArray = [];

  if (indexStart > 1) {
    toggleLoadElements(loadBtnRef, loadingAnimation)
  }
  // loadRef.classList.add("d-none");
  // loadingAnimation.classList.remove('d-none');
  await getSinglePokemonData(newEntries, pokemonDataArray);
  fillContentContainer(newEntries, mainContentContainer, pokemonDataArray);
  toggleLoadElements(loadBtnRef, loadingAnimation)
  // loadingAnimation.classList.add('d-none');
  // if (indexStart < 152) {
  //   loadBtnRef.classList.remove("d-none");
  // }
  newEntries = [];
  pokemonDataArray = [];
}

function toggleLoadElements(loadBtnRef, loadingAnimation) {
  if (indexStart < 152) {
    loadBtnRef.classList.toggle("d-none");
  }
  loadingAnimation.classList.toggle('d-none');
}

async function getSinglePokemonData(newEntries, pokemonDataArray) {
  for (let i = 0; i < 20; i++) {
    if (indexStart == 152) {
      indexStart = 161;
      break;
    }
    let response = await fetch(url + "pokemon/" + indexStart);
    let pokemonDataAsJson = await response.json();
    newEntries.push(getPokemonEntriesTemplate(pokemonDataAsJson, indexStart));
    pokemonDataArray.push(pokemonDataAsJson);
    indexStart++;
  }
}

function fillContentContainer(newEntries, mainContentContainer, pokemonDataArray) {
  newEntries.forEach((entry, index) => {
    mainContentContainer.innerHTML += entry;
    let typesRef = document.getElementById("pkm-types" + (indexStart - 20 + index));
    let pokemonData = pokemonDataArray[index];
    for (let j = 0; j < pokemonData.types.length; j++) {
      typesRef.innerHTML += getPokemonTypesTemplate(pokemonData, j);
    }
  });
}

async function getAllPokemonData() {
  let response = await fetch(url + "pokemon?limit=151&offset=0");
  pokemonAllAsJson = await response.json();
}