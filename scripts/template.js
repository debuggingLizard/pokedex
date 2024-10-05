const modalTemplates = {
    templateAbout: function (modalData) {
      return /*html*/ `
              <table>
                <tr>
                  <td class="bold">Height</td>
                  <td>${modalData.height} dm</td>
                </tr>
                <tr>
                  <td class="bold">Weight</td>
                  <td>${modalData.weight} hg</td>
                </tr>
                <tr>
                  <td class="bold">Abilities</td>
                  <td id="modal-pkm-abilities"></td>
                </tr>
              </table>
      `;
    },
    templateBaseStats: function (modalData) {
      return /*html*/ `
              <table>
                <tr>
                  <td class="bold">HP</td>
                  <td>${modalData.stats[0].base_stat}</td>
                </tr>
                <tr>
                  <td class="bold">Attack</td>
                  <td>${modalData.stats[1].base_stat}</td>
                </tr>
                <tr>
                  <td class="bold">Defense</td>
                  <td>${modalData.stats[2].base_stat}</td>
                </tr>
                <tr>
                  <td class="bold">Special Attack</td>
                  <td>${modalData.stats[3].base_stat}</td>
                </tr>
                <tr>
                  <td class="bold">Special Defense</td>
                  <td>${modalData.stats[4].base_stat}</td>
                </tr>
                <tr>
                  <td class="bold">Speed</td>
                  <td>${modalData.stats[5].base_stat}</td>
                </tr>
              </table>
      `;
    },
    templateShiny: function (modalData) {
      return /*html*/`
        <img src="${modalData.sprites.other.home.front_shiny}" alt="Image of ${modalData.name}">
      `
    }
  };

function getPokemonEntriesTemplate(pokemonData, i) {
  return /*html*/ `
          <div class="pkm-entry ${
            pokemonData.types[0].type.name
          }" onclick="showModal(${i})">
              <p class="pkm-entry-number">#${pokemonData.id
                .toString()
                .padStart(3, "0")}</p>
              <div class="pkm-entry-info">
                  <div class="pkm-entry-info-left">
                      <p>${pokemonData.name.toUpperCase()}</p>
                      <div class="pkm-entry-types" id="pkm-types${i}"></div>
                  </div>
                  <img src="${
                    pokemonData.sprites.other.home.front_default
                  }" alt="Image of ${pokemonData.name}">
              </div>
          </div>
      `;
}

function getPokemonTypesTemplate(pokemonData, i) {
  return /*html*/ `
          <span>${pokemonData.types[i].type.name.toUpperCase()}</span>
      `;
}

function getModalTemplate(modalData, index) {
    return /*html*/ `
            <div id="modal-top" class="${modalData.types[0].type.name}">
              <div class="modal-top-info">
                  <div class="modal-top-info-left">
                  <p id="modal-pkm-name">${(modalData.name).toUpperCase()}</p>
                  <p id="modal-pkm-types"></p>
                </div>
                <div class="modal-top-info-right">
                  <p>#${(modalData.id).toString().padStart(3, '0')}</p>
                </div>
              </div>
              <img src="${
                modalData.sprites.other.home.front_default
              }" alt="Image of ${modalData.name}">
            </div>
            <div class="modal-bottom">
              <div class="modal-nav">
                <button id="btnAbout" class="focus" onclick="renderModalStats('About', ${index}); updateFocus('btnAbout')">ABOUT</button>
                <button id="btnBase" onclick="renderModalStats('BaseStats', ${index}); updateFocus('btnBase')">BASE STATS</button>
                <button id="btnShiny" onclick="renderModalStats('Shiny', ${index}); updateFocus('btnShiny')">SHINY</button>
              </div>
              <div id="modal-stats"></div>
            </div>
            <div class="modal-buttons">
              <button id="btn-prev" onclick="showModal(${index - 1})">&#8617; #${(index - 1).toString().padStart(3, '0')}</button>
              <button id="btn-next" onclick="showModal(${index + 1})">#${(index + 1).toString().padStart(3, '0')} &#8618;</button>
            </div>
    `;
  }

