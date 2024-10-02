let url = "https://pokeapi.co/api/v2/";
let indexStart = 1;

function init() {
  getOnePokemonData(indexStart);
}

// FUNCTIONALITY FOR DISPLAYING BODY ENTRIES (POKEMONS IN MAIN VIEW)
// fetch each Pokemon-Data and execute render-body-Function
async function getOnePokemonData() {
  for (let i = 0; i < 20; i++) {
    if (indexStart == 152) {break;};
    let response = await fetch(url + "pokemon/" + indexStart);
    let pokemonDataAsJson = await response.json();
    renderPokemonEntries(pokemonDataAsJson, indexStart);
    indexStart++;
  }
}

// render-body-Function: getting divs by ID and execute template-functions
function renderPokemonEntries(pokemonData, i) {
  let entryRef = document.getElementById("main-content-container");
  entryRef.innerHTML += getPokemonEntriesTemplate(pokemonData, i);
  let typesRef = document.getElementById("pkm-types" + i);
  for (let i = 0; i < pokemonData.types.length; i++) {
    typesRef.innerHTML += getPokemonTypesTemplate(pokemonData, i);
  }
}

// template-function for body-entries
function getPokemonEntriesTemplate(pokemonData, i) {
  return /*html*/ `
        <div class="pkm-entry" onclick="showModal(${i})">
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

// template-function for types of body-entries
function getPokemonTypesTemplate(pokemonData, i) {
  return /*html*/ `
        <span>${pokemonData.types[i].type.name}</span>
    `;
}

// FUNCTIONALITY FOR DISPLAYING MODAL (POKEMON IN SINGLE DETAILED VIEW)
// Object with template-functions for Modal-Tabs (lower half of modal)
const modalTemplates = {
  templateAbout: function (modalData) {
    return /*html*/ `
            <table>
              <tr>
                <td>Height</td>
                <td>${modalData.height} dm</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>${modalData.weight} hg</td>
              </tr>
              <tr>
                <td>Abilities</td>
                <td id="modal-pkm-abilities"></td>
              </tr>
            </table>
    `;
  },
  templateBaseStats: function (modalData) {
    return /*html*/ `
            <table>
              <tr>
                <td>HP</td>
                <td>${modalData.stats[0].base_stat}</td>
              </tr>
              <tr>
                <td>Attack</td>
                <td>${modalData.stats[1].base_stat}</td>
              </tr>
              <tr>
                <td>Defense</td>
                <td>${modalData.stats[2].base_stat}</td>
              </tr>
              <tr>
                <td>Special Attack</td>
                <td>${modalData.stats[3].base_stat}</td>
              </tr>
              <tr>
                <td>Special Defense</td>
                <td>${modalData.stats[4].base_stat}</td>
              </tr>
              <tr>
                <td>Speed</td>
                <td>${modalData.stats[5].base_stat}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>...</td>
              </tr>
            </table>
    `;
  },
};

function closeModal() {
  let overlayRef = document.getElementById("modal-wrapper");
  overlayRef.classList.add("d-none");
  let modalRef = document.getElementById("modal-card");
  modalRef.innerHTML = "";
}

// executed by onclick on pokemon entry in main view; displays overlay/modal, gets specific pokemon data and executes render-functions
async function showModal(index) {
  let overlayRef = document.getElementById("modal-wrapper");
  overlayRef.classList.remove("d-none");
  let modalData = await getPokemonModalData(index);
  renderModalContent(modalData, index);
  renderModalTypes(modalData);
  renderModalInitialStats(modalData);
  renderModalAbilities(modalData);
  disableNavButtons(index)
}

// fetches Data for specific selected (onclicked in main view) pokemon
async function getPokemonModalData(index) {
  let response = await fetch(url + "pokemon/" + index);
  let pokemonDataAsJson = await response.json();
  return pokemonDataAsJson;
}

// render-modal function gets div by ID and executes template-fucntion for modal
function renderModalContent(modalData, index) {
  let modalRef = document.getElementById("modal-card");
  modalRef.innerHTML = "";
  modalRef.innerHTML = getModalTemplate(modalData, index);
}

// renders types into modal by assigning types rendered into main view pokemon-entries
function renderModalTypes(modalData) {
  let typesRef = document.getElementById("modal-pkm-types");
  typesRef.innerHTML = "";
  for (let i = 0; i < modalData.types.length; i++) {
    typesRef.innerHTML += /*html*/ `
      <span>${modalData.types[i].type.name}</span>
    `;
  }
}

// renders stats in lower half of modal to be shown initially (which would be the first tab on the left) by using template object
function renderModalInitialStats(modalData) {
  let modalBottomRef = document.getElementById("modal-stats");
  modalBottomRef.innerHTML = "";
  modalBottomRef.innerHTML = modalTemplates.templateAbout(modalData);
}

// renders abilities into modal (into About-Tab)
function renderModalAbilities(modalData) {
  let abilitiesRef = document.getElementById("modal-pkm-abilities");
  abilitiesRef.innerHTML = "";
  for (let i = 0; i < modalData.abilities.length; i++) {
    abilitiesRef.innerHTML += /*html*/ `
      <span>${modalData.abilities[i].ability.name}</span>
    `;
  }
}

// disables nav-buttons in modal if necessary
function disableNavButtons(index) {
  if (index == 1) {
    document.getElementById("btn-prev").disabled = true;
  }
  if (index == 151) {
    document.getElementById("btn-next").disabled = true;
  }
}

// template-function for modal
function getModalTemplate(modalData, index) {
  return /*html*/ `
          <div id="modal-top">
            <div class="modal-top-info">
                <div class="modal-top-info-left">
                <p id="modal-pkm-name">${modalData.name}</p>
                <p id="modal-pkm-types"></p>
              </div>
              <div class="modal-top-info-right">
                <p>#${modalData.id}</p>
              </div>
            </div>
            <img src="${modalData.sprites.other.home.front_default}" alt="Image of ${modalData.name}">
          </div>
          <div class="modal-bottom">
            <div class="modal-nav">
              <button onclick="renderModalStats('About', ${index})">About</button>
              <button onclick="renderModalStats('BaseStats', ${index})">Base Stats</button>
            </div>
            <div id="modal-stats"></div>
          </div>
          <div>
            <button id="btn-prev" onclick="showModal(${index - 1})">previous pkm</button>
            <button id="btn-next" onclick="showModal(${index + 1})">next pkm</button>
          </div>
  `;
}

// executed by onclick on tab-link in lower half of modal (different categories of additional information)
// gets identifier (to get correct template) and index of pokemon (to fetch correct data) and executes template-function
async function renderModalStats(identifier, index) {
  let functionName = "template" + identifier;
  let contentRef = document.getElementById("modal-stats");
  let modalData = await getPokemonModalData(index);
  contentRef.innerHTML = "";
  contentRef.innerHTML = modalTemplates[functionName](modalData);
  if (identifier == "About") {
    renderModalAbilities(modalData);
  }
}
