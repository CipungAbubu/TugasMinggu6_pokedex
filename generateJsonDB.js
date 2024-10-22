const fs = require("fs");

async function generateJsonDB() {
  try {
  // TODO: fetch data pokemon api dan buatlah JSON data sesuai dengan requirement.
  // json file bernama db.json. pastikan ketika kalian menjalankan npm run start
  // dan ketika akses url http://localhost:3000/pokemon akan muncul seluruh data
  // pokemon yang telah kalian parsing dari public api pokemon
  const pokemonApiURL = "https://pokeapi.co/api/v2/pokemon/?limit=100";
  const pokemonList = await fetch(pokemonApiURL).then((res) => res.json());
  console.log(pokemonList);
  for (let index = 0; index < pokemonList.results.length; index++) {
    const pokemon = pokemonList.results[index];
    
    // Ambil detail Pokémon dari URL
    const detailResponse = await fetch(pokemon.url);
    const detail = await detailResponse.json();
    console.log(detail);
  }
} catch (error) {
  console.error(error);
}
}

generateJsonDB();
