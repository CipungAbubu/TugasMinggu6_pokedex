const fs = require("fs");
const fetch = require("node-fetch"); // Pastikan untuk mengimpor fetch jika kamu menggunakan Node.js

async function generateJsonDB() {
  try {
    // URL untuk mengambil daftar Pokémon dengan limit 100
    const pokemonApiURL = "https://pokeapi.co/api/v2/pokemon/?limit=100";
    const pokemonList = await fetch(pokemonApiURL).then((res) => res.json());

    const payload = []; // Array untuk menyimpan data Pokémon

    // Loop untuk mengambil detail dari setiap Pokémon
    for (let index = 0; index < pokemonList.results.length; index++) {
      const pokemon = pokemonList.results[index];

      // Ambil detail Pokémon dari URL
      const detailResponse = await fetch(pokemon.url);
      const detail = await detailResponse.json();

      // Ambil species untuk evolution chain
      const speciesResponse = await fetch(detail.species.url);
      const species = await speciesResponse.json();

      // Ambil evolution chain
      const evolutionChainResponse = await fetch(species.evolution_chain.url);
      const evolutionChainData = await evolutionChainResponse.json();

      // Membangun evolution chain
      const evolutionChains = [];
      let current = evolutionChainData.chain;

      // Loop untuk mendapatkan seluruh rantai evolusi
      do {
        evolutionChains.push(current.species.name);
        current = current.evolves_to[0]; // Ambil evolusi berikutnya
      } while (current && current.evolves_to.length > 0);

      // Struktur data sesuai dengan requirement
      const item = {
        id: detail.id,
        name: detail.name,
        types: detail.types.map((typeInfo) => typeInfo.type.name), // Menambahkan types di sini
        height: detail.height,
        weight: detail.weight,
        cries: {
          latest: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${detail.id}.ogg`,
          legacy: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${detail.id}.ogg`,
        },
        abilities: detail.abilities.map((abilityInfo) => abilityInfo.ability.name),
        evolutionChains: evolutionChains,
      };

      payload.push(item); // Tambahkan item ke array payload
    }

    // Simpan data ke file db.json
    fs.writeFileSync("db.json", JSON.stringify(payload, null, 2));
    console.log("Database created with Pokémon data in db.json");
  } catch (error) {
    console.error(error);
  }
}

generateJsonDB();
