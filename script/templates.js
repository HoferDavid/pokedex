function generateRenderPokemonsHTML(pokemon, index, typesHTML) {
  const pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  let bgColor = pokemon.details.types[0].type["name"];

  return /*html*/ `
    <div onclick="openOverlay(${index})" class="pokemonCardContainer ${bgColor}">
        <div>#${pokemon.details.id}</div>
        <div class="${pokemon.details.types[0].type["name"]}">${pokemonName}</div>
        <div class="pokemonCardImageContainer">
            <img class="pokemonCardImage" src='${pokemon.details.sprites.other.showdown.front_default}'>
        </div>
        <div class="pokemonCardTypes">
            ${typesHTML}
        </div>
    </div>
`;
}

function generateOpenOverlayHTML(pokemon, index) {
  const pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  let bgColor = pokemon.details.types[0].type["name"];
  let weight = (pokemon.details.weight / 10) * 2.20462;
  let roundedWeight = weight.toFixed(1);
  let heightInFeet = (pokemon.details.height / 10) * 3.28084;
  const feet = Math.floor(heightInFeet);
  const inches = Math.round((heightInFeet - feet) * 12);

  return /*html*/ `
    <div class="overlayPokemonCardContainer ${bgColor}">
        <div class="${
          pokemon.details.types[0].type["name"]
        }">${pokemonName}</div>
        <div>HP ${pokemon.details.stats[0].base_stat}</div>
        <div class="overlayImgBox">
            <img src="${
              pokemon.details.sprites.other["official-artwork"].front_default
            }">
            <div id="imgStats">NO. ${pokemon.details.id} HT: ${feet}'${inches < 10 ? "0" : ""}${inches}" WT: ${roundedWeight} lbs.</div>
        </div>

    </div>
        <p id="leftOverlay" onclick="left(${index})"><img src="img/arrowLeftWhite.png"></p>
        <p id="rightOverlay" onclick="right(${index})"><img src="img/arrowRightWhite.png"></p>
    `;
}
