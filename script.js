let url = "https://pokeapi.co/api/v2/";

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

function getPokemonTypesTemplate(pokemonData, i) {
  return /*html*/ `
        <span>${pokemonData.types[i].type.name}</span>
    `;
}

getOnePokemonData();

// render Functionality for Modal-Bottom Tabs
const modalTemplates = {
  templateAbout: function (modalData) {
    console.log("templateAbout");
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
    console.log("templateBaseStats");
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

async function renderModalStats(identifier, index) {
  let functionName = "template" + identifier;
  let contentRef = document.getElementById("modal-stats");
  let modalData = await getPokemonModalData(index);
  contentRef.innerHTML = "";
  contentRef.innerHTML = modalTemplates[functionName](modalData);
  if (identifier == 'About') {
    renderModalAbilities(modalData);
  }
}

// onclick/show Modal functionality
async function getPokemonModalData(index) {
  let response = await fetch(url + "pokemon/" + index);
  let pokemonDataAsJson = await response.json();
  return pokemonDataAsJson;
}

async function showModal(index) {
  let overlayRef = document.getElementById("modal-wrapper");
  overlayRef.classList.toggle("d-none");
  let modalData = await getPokemonModalData(index);
  renderModalContent(modalData, index);
  renderModalTypes(index);
  renderModalAbilities(modalData);
}

function renderModalContent(modalData, index) {
  let modalRef = document.getElementById("modal-card");
  modalRef.innerHTML = "";
  modalRef.innerHTML = /*html*/ `
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
              <button>previous pkm</button>
              <button>next pkm</button>
            </div>
  `;
  let modalBottomRef = document.getElementById('modal-stats');
  modalBottomRef.innerHTML = "";
  modalBottomRef.innerHTML = modalTemplates.templateAbout(modalData);
}

function renderModalTypes(index) {
  let typesRef = document.getElementById('pkm-types' + index).innerHTML;
  let typesModalRef = document.getElementById('modal-pkm-types');
  typesModalRef.innerHTML = typesRef;
}

function renderModalAbilities(modalData) {
  let abilitiesRef = document.getElementById('modal-pkm-abilities');
  abilitiesRef.innerHTML = "";
  for (let i = 0; i < modalData.abilities.length; i++) {
    abilitiesRef.innerHTML += /*html*/`
      <span>${modalData.abilities[i].ability.name}</span>
    `
  }
}