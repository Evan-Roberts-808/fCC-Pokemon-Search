const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-button")
const pokeName = document.getElementById("pokemon-name")
const pokeId = document.getElementById("pokemon-id")
const spriteContainer = document.getElementById("sprite-container")
const weight = document.getElementById("weight")
const height = document.getElementById("height")
const types = document.getElementById("types")
const hp = document.getElementById("hp")
const attack = document.getElementById("attack")
const defense = document.getElementById("defense")
const specialAttack = document.getElementById("special-attack")
const specialDefense = document.getElementById("special-defense")
const speed = document.getElementById("speed")

const clearData = () => {
  pokeName.textContent = "";
  pokeId.textContent = "";
  spriteContainer.innerHTML = ``
  weight.textContent = "";
  height.textContent = "";
  types.innerHTML = ``;
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
}

const fetchPokemon = (searchTerm) => {
  const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchTerm}`
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    clearData()
    console.log(data)
    pokeName.textContent = data.name
    pokeId.textContent = data.id
    spriteContainer.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" />`
    weight.textContent = data.weight
    height.textContent = data.height
    hp.textContent = data.stats[0].base_stat
    attack.textContent = data.stats[1].base_stat
    defense.textContent = data.stats[2].base_stat
    specialAttack.textContent = data.stats[3].base_stat
    specialDefense.textContent = data.stats[4].base_stat
    speed.textContent = data.stats[5].base_stat
    if (data.types.length === 1) {
      const typeText = data.types[0].type.name
      types.innerHTML = `<span>${typeText.toUpperCase()}</span>`
    } else {
      data.types.forEach((type)=>{
        const typeText = type.type.name
        types.innerHTML += `<span>${typeText.toUpperCase()} </span>`
      })
    }
  })
  .catch((error) => {
    alert("Pokémon not found")
  })
}

searchBtn.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase().trim()
  if(!searchTerm){
    alert("Please enter a valid Pokemon name or ID")
    return;
  }
  fetchPokemon(searchTerm)
})