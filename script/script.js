let limit = 25;
let offset = 0;
let pokeapiUrl = `https://pokeapi.co/api/v2/pokemon`;
let pokemons = [];


async function init() {
  await loadPokemons();
  await loadPokemonDetails();
  console.log(pokemons);
  renderPokemons();
}


// // Load name and url for limit Pokemon on main page
async function loadPokemons() {
  try {
    let response = await fetch(`${pokeapiUrl}?limit=${limit}&offset=${offset}`);
    let responseAsJson = await response.json();
    pokemons.push(...responseAsJson.results);
  } catch (error) {
    console.error("dh Fetch error:", error);
  }
}


// Load details for each limit Pokemon on main page
async function loadPokemonDetails() {
  const start = offset;
  const end = pokemons.length;

  for (let i = start; i < end; i++) {
    if (!pokemons[i].details) {
      try {
        let response = await fetch(pokemons[i].url);
        let details = await response.json();
        pokemons[i].details = details;
      } catch (error) {
        console.error("dh Fetch details error:", error);
      }
    }
  }
}


async function renderPokemons(filteredPokemons = pokemons) {
  const content = document.getElementById("content");
  content.innerHTML = "";

  filteredPokemons.forEach((pokemon, index) => {
    if (pokemon.details) {
      let typesHTML = pokemon.details.types.map(typeInfo => `<div class="pokemonCardTypesSingle">${typeInfo.type.name}</div>`).join('');
  
      content.innerHTML += generateRenderPokemonsHTML(pokemon, index, typesHTML);
    }
    });
    content.innerHTML += `<div class="loadMoreCard" onclick="loadMorePokemons()"><button id="loadMoreBtn">Load More</button></div`;
  }


async function loadMorePokemons() {
  disableLoadMoreButton();
  offset += limit;
  limit = 20;
  await loadPokemons();
  await loadPokemonDetails();
  renderPokemons();
  enableLoadMoreButton();
  console.log(pokemons);
}


function disableLoadMoreButton() {
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.innerText = 'Loading...';
  }
}


function enableLoadMoreButton() {
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.disabled = false;
    loadMoreBtn.innerText = 'Load More';
  }
}


function openOverlay(index) {
  let overlay = document.getElementById('overlay');

  overlay.innerHTML = generateOpenOverlayHTML(pokemons[index], index);

  overlay.style.display = "block";
  document.body.classList.add('modalOpen');

  updateProgressBar()
}


function left(index) {
  openOverlay((index - 1 + pokemons.length) % pokemons.length);
}


function right(index) {
  openOverlay((index + 1) % pokemons.length);
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == overlay) {
    overlay.style.display = "none";
    document.body.classList.remove('modalOpen');
  }
}


function searchNames() {
  const input = document.getElementById("inputField").value.toLowerCase();
  
  if (input.length > 2) {
    const filteredPokemons = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(input));
    renderPokemons(filteredPokemons);
  } else {
    renderPokemons();
  }
}
