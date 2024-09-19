let limit = 25;
let offset = 0;
let pokeapiUrl = `https://pokeapi.co/api/v2/pokemon`;
let pokemons = [];
isLoadingMore = false;


async function init() {
  document.getElementById("content").innerHTML = generateLoadingScreenHTML();
  await loadPokemons();
  await loadPokemonDetails();
  await loadPokemonInfo();
  await loadEvoChain();
  console.log(pokemons);
  renderPokemons();
}


// Load name and url for limit Pokemon on main page
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
  for (let i = offset; i < pokemons.length; i++) {
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


// Load species for each Pokemon
async function loadPokemonInfo() {
  for (let i = offset; i < pokemons.length; i++) {
    if (!pokemons[i].species) {
      try {
        let response = await fetch(pokemons[i].details.species.url);
        let species = await response.json();
        pokemons[i].species = species;
      } catch (error) {
        console.error("dh Fetch species error:", error);
      }
    }
  }
}


// Load evochain for each Pokemon
async function loadEvoChain() {
  for (let i = offset; i < pokemons.length; i++) {
    if (!pokemons[i].evochain) {
      try {
        let response = await fetch(pokemons[i].species.evolution_chain.url);
        let evochain = await response.json();
        pokemons[i].evochain = evochain;
      } catch (error) {
        console.error("dh Fetch evochain error:", error);
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
    content.innerHTML += `<div class="loadMoreCard"><button id="loadMoreBtn">Load More</button></div`;

    document.getElementById('loadMoreBtn').addEventListener('click', loadMorePokemons);
}


async function loadMorePokemons() {
  if (isLoadingMore) return;
  isLoadingMore = true;
  disableLoadMoreButton();
  generateLoadingScreenHTML();
  offset += limit;
  await loadPokemons();
  await loadPokemonDetails();
  await loadPokemonInfo();
  await loadEvoChain();
  renderPokemons();
  enableLoadMoreButton();
  isLoadingMore = false;
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

  setTimeout(function() { updateProgressBar(index); }, 10);
}


function updateProgressBar(index) {
  for (let i = 1; i < 6; i++) {
    document.getElementById(`progressBar${i}`).innerHTML = `${pokemons[index].details.stats[i].base_stat}%`;
    document.getElementById(`progressBar${i}`).style.width = `${pokemons[index].details.stats[i].base_stat / 2}%`;
  }
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


// Helper function to get the sprite URL from the species URL
function getSpriteUrl(speciesUrl) {
  const speciesId = speciesUrl.split('/').filter(Boolean).pop();
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesId}.png`;
}
