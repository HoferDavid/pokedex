function generateRenderPokemonsHTML(pokemon, pokemonName, typesHTML, bgColor) {
    return /*html*/ `
    <div class="pokemonCardContainer ${bgColor}">
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