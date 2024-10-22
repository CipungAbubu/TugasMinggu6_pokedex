const fs = require("fs");

async function generateJsonDB() {
  try {
  // TODO: fetch data pokemon api dan buatlah JSON data sesuai dengan requirement.
  // json file bernama db.json. pastikan ketika kalian menjalankan npm run start
  // dan ketika akses url http://localhost:3000/pokemon akan muncul seluruh data
  // pokemon yang telah kalian parsing dari public api pokemon
  const pokemonApiURL = "https://pokeapi.co/api/v2/pokemon/";
  const pokemonList = await fetch(pokemonApiURL).then((res) => res.json());
  console.log(pokemonList);
} catch (error) {
  console.error(error);
}
}

generateJsonDB();
