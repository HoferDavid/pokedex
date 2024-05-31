let limit = 6;
let offset = 0;
let pokeapiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
let pokemons = [];


async function init() {
  console.log(pokemons);
  await loadPokemons();
  await loadPokemonDetails();
  renderPokemons();
}


// // Load name and url for limit Pokemon on main page
async function loadPokemons() {
  try {
    let response = await fetch(pokeapiUrl);
    let responseAsJson = await response.json();
    pokemons = responseAsJson.results;
  } catch (error) {
    console.error("dh Fetch error:", error);
  }
}


// Load details for each limit Pokemon on main page
async function loadPokemonDetails() {
  for (let i = 0; i < pokemons.length; i++) {
    try {
      let response = await fetch(pokemons[i].url);
      let details = await response.json();
      pokemons[i].details = details;
    } catch (error) {
      console.error("dh Fetch details error:", error);
    }
  }
}


async function renderPokemons() {
  const content = document.getElementById("content");
  content.innerHTML = "";

  pokemons.forEach((pokemon) => {
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    let typesHTML = pokemon.details.types.map(typeInfo => `<div>${typeInfo.type.name}</div>`).join('');
    let bgColor = pokemon.details.types[0].type['name'];

    content.innerHTML += generateRenderPokemonsHTML(pokemon, pokemonName, typesHTML, bgColor);
  });
}


init();