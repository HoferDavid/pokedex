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


async function renderPokemons() {
  const content = document.getElementById("content");
  content.innerHTML = "";

  pokemons.forEach((pokemon, index) => {
    if (pokemon.details) {
      const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      let typesHTML = pokemon.details.types.map(typeInfo => `<div>${typeInfo.type.name}</div>`).join('');
      let bgColor = pokemon.details.types[0].type['name'];
  
      content.innerHTML += generateRenderPokemonsHTML(pokemon, index, pokemonName, typesHTML, bgColor);
    }
    });
    content.innerHTML += `<div class="loadMoreCard" onclick="loadMorePokemons()"><button id="loadMoreBtn">Load More</button></div`;
  }


async function loadMorePokemons() {
  offset += limit;
  limit = 20;
  await loadPokemons();
  await loadPokemonDetails();
  renderPokemons();
  console.log(pokemons);
}


function openOverlay(index) {
  let overlay = document.getElementById('overlay');
  overlay.innerHTML = generateOpenOverlayHTML(pokemons[index], index);
  overlay.style.display = "block";
}


function left(index) {
  openOverlay((index - 1 + limit) % limit);
}


function right(index) {
  openOverlay((index + 1 + limit) % limit);
}


function closeOverlay() {
  overlay.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == overlay) {
    overlay.style.display = "none";
  }
}