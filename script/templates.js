function generateRenderPokemonsHTML(pokemon, index, pokemonName, typesHTML, bgColor) {
    return /*html*/ `
    <div onclick="openOverlay(${index})" class="pokemonCardContainer ${bgColor}">
        <div>#${pokemon.details.id}</div>
        <div class="${pokemon.details.types[0].type['name']}">${pokemonName}</div>
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
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    let bgColor = pokemon.details.types[0].type['name'];

    return /*html*/ `
    <div class="overlayPokemonCardContainer ${bgColor}">
        <div class="${pokemon.details.types[0].type['name']}">${pokemonName}</div>
        <img src="${pokemon.details.sprites.other['official-artwork'].front_default}">
        <div id="buttonContainer">
        <p id="leftOverlay" onclick="left(${index})">left</p>
        <p id="closeOverlay" onclick="closeOverlay(${index})">close</p>
        <p id="rightOverlay" onclick="right(${index})">right</p>
        </div>
    </div>
    `;
  }