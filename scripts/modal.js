async function showModal(index) {
  let scrollbarWidth = getScrollbarWidth();
  let overlayRef = document.getElementById("modal-wrapper");
  document.body.classList.add("no-scroll");
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  overlayRef.classList.remove("d-none");
  let modalData = await getPokemonModalData(index);
  renderModal(modalData, index);
  disableNavButtons(index);
}

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

async function getPokemonModalData(index) {
  let response = await fetch(url + "pokemon/" + index);
  let pokemonDataAsJson = await response.json();
  return pokemonDataAsJson;
}

function renderModal(modalData, index) {
  renderModalContent(modalData, index);
  renderModalTypes(modalData);
  renderModalInitialStats(modalData);
  renderModalAbilities(modalData);
}

function renderModalContent(modalData, index) {
  let modalRef = document.getElementById("modal-card");
  modalRef.innerHTML = "";
  modalRef.innerHTML = getModalTemplate(modalData, index);
}

function renderModalTypes(modalData) {
  let typesRef = document.getElementById("modal-pkm-types");
  typesRef.innerHTML = "";
  for (let i = 0; i < modalData.types.length; i++) {
    typesRef.innerHTML += /*html*/ `
        <span>${modalData.types[i].type.name}</span>
      `;
  }
}

function renderModalInitialStats(modalData) {
  let modalBottomRef = document.getElementById("modal-stats");
  modalBottomRef.innerHTML = "";
  modalBottomRef.innerHTML = modalTemplates.templateAbout(modalData);
}

function renderModalAbilities(modalData) {
  let abilitiesRef = document.getElementById("modal-pkm-abilities");
  abilitiesRef.innerHTML = "";
  for (let i = 0; i < modalData.abilities.length; i++) {
    abilitiesRef.innerHTML += /*html*/ `
        <span>${modalData.abilities[i].ability.name}</span>
      `;
  }
}

function disableNavButtons(index) {
  if (index == 1) {
    document.getElementById("btn-prev").disabled = true;
  }
  if (index == 151) {
    document.getElementById("btn-next").disabled = true;
  }
}

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

function updateFocus(button) {
  document.getElementById("btnAbout").classList.remove("focus");
  document.getElementById("btnBase").classList.remove("focus");
  document.getElementById("btnShiny").classList.remove("focus");
  document.getElementById(button).classList.add("focus");
}

function closeModal() {
  let overlayRef = document.getElementById("modal-wrapper");
  overlayRef.classList.add("d-none");
  document.body.classList.remove("no-scroll");
  document.body.style.paddingRight = "0";
  let modalRef = document.getElementById("modal-card");
  modalRef.innerHTML = "";
}
