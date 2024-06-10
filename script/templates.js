function generateLoadingScreenHTML() {
  return /*html*/ `
    <div class="loadingScreen">
        <div class="loadingImg"></div>
        <div class="loadingText">Gotta catch 'em all!</div>
    </div>
    `;
}

function generateRenderPokemonsHTML(pokemon, index, typesHTML) {
  const pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  let bgColor = pokemon.details.types[0].type["name"];

  return /*html*/ `
    <div onclick="openOverlay(${index})" class="pokemonCardContainer ${bgColor}">
    <div class="pokemonCardNameContainer">
        <div class="${
          pokemon.details.types[0].type["name"]
        } pokemonCardName">${pokemonName}</div>
        <img class="overlayCardTypesSymbol ${bgColor}" src="../img/${bgColor}.png">
    </div>
        <div class="pokemonCardId">#${pokemon.details.id
          .toString()
          .padStart(3, "0")}</div>
        <div class="pokemonCardImageContainer">
            <img class="pokemonCardImage" src='${
              pokemon.details.sprites.other.showdown.front_default
            }'>
        </div>
        <div class="pokemonCardTypes">${typesHTML}</div>
    </div>
`;
}

function generateOpenOverlayHTML(pokemon, index) {
  const pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const bgColor = pokemon.details.types[0].type["name"];
  const weight = (pokemon.details.weight / 10) * 2.20462;
  const roundedWeight = weight.toFixed(1);
  const heightInFeet = (pokemon.details.height / 10) * 3.28084;
  const feet = Math.floor(heightInFeet);
  const inches = Math.round((heightInFeet - feet) * 12);

  return /*html*/ `
    <p id="leftOverlay" onclick="left(${index})"><img src="img/arrowLeftWhite.png"></p>
    <p id="rightOverlay" onclick="right(${index})"><img src="img/arrowRightWhite.png"></p>
    <div class="overlayPokemonCardContainer ${bgColor}">
        <div class="overlayCardHeader">
            <div>${pokemonName}</div>

            <div class="overlayCardHeaderRightContainer">
                <div class="overlayCardHeaderRight">
                    <div class="overlayCardHeaderHp">HP</div>
                    <div class="">${pokemon.details.stats[0].base_stat}</div>
                </div>
                <div>
                    <img class="overlayCardTypesSymbol ${bgColor}" src="../img/${bgColor}.png">
                </div>
            </div>
        </div>
        <div class="overlayImgBox tooltip">
            <img class="overlayImg" src="${pokemon.details.sprites.other["official-artwork"].front_default}">
            <div id="imgStats">NO. ${pokemon.details.id.toString().padStart(3, "0")} ${pokemon.info.genera[7].genus} HT: ${feet}'${inches < 10 ? "0" : ""}${inches}" WT: ${roundedWeight} lbs.</div>
            <div class="tooltiptext">
                <img class="tooltipImg" src="${pokemon.details.sprites.other["official-artwork"].front_default}">
                <img class="tooltipArrow" src="../img/arrow.png">
                <img class="tooltipImg" src="${pokemon.details.sprites.other["official-artwork"].front_default}">
                <img class="tooltipArrow" src="../img/arrow.png">
                <img class="tooltipImg" src="${pokemon.details.sprites.other["official-artwork"].front_default}">
            </div>
        </div>

        <div>
            <div class="overlayCardStatsHeader">Base Stats</div>
        <div>
            <div class="overlayCardBarHeader">Attack</div>
            <div class="progress">
                <div id="progressBar1" class="progress-bar bg-success" role="progressbar" style="width: 0%">0</div>
            </div>
        </div>

        <div>
            <div class="overlayCardBarHeader">Defense</div>
            <div class="progress">
                <div id="progressBar2" class="progress-bar" role="progressbar" style="width: 0%">0</div>
            </div>
        </div>

        <div>
            <div class="overlayCardBarHeader">Special Attack</div>
            <div class="progress">
                <div id="progressBar3" class="progress-bar bg-info" role="progressbar" style="width: 0%">0</div>
            </div>
        </div>

        <div>
            <div class="overlayCardBarHeader">Special Defense</div>
            <div class="progress">
                <div id="progressBar4" class="progress-bar bg-danger" role="progressbar" style="width: 0%">0</div>
            </div>
        </div>

        <div>
            <div class="overlayCardBarHeader">Speed</div>
            <div class="progress">
                <div id="progressBar5" class="progress-bar bg-warning" role="progressbar" style="width: 0%">0</div>
            </div>
        </div>

    </div>

    <div class="overlayCardAbilitiesContainer">
        <div class="overlayCardAbilities">Ability</div>
        <div class="overlayCardAbilitiesBtn ${
          pokemon.details.types[0].type["name"]
        }">${pokemon.details.abilities[0].ability["name"]
    .charAt(0)
    .toUpperCase()}${pokemon.details.abilities[0].ability["name"].slice(
    1
  )}</div>
    </div>
    `;
}
