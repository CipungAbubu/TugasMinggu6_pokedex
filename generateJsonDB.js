import fs from 'fs';
import fetch from 'node-fetch';

async function generateJsonDB() {
  try {
    const pokemonApiURL = 'https://pokeapi.co/api/v2/pokemon?limit=100';
    const pokemonListResponse = await fetch(pokemonApiURL);
    const pokemonList = await pokemonListResponse.json();
    
    const payload = [];

    for (const pokemon of pokemonList.results) {
      // Ambil detail Pokémon dari URL
      const detailResponse = await fetch(pokemon.url);
      const detail = await detailResponse.json();

      // Ambil data evolusi
      const speciesResponse = await fetch(detail.species.url);
      const species = await speciesResponse.json();
      const evolutionChainResponse = await fetch(species.evolution_chain.url);
      const evolutionChain = await evolutionChainResponse.json();

      const evolutionChains = [];
      let currentEvo = evolutionChain.chain;

      // Ambil chain evolusi
      while (currentEvo) {
        evolutionChains.push(currentEvo.species.name);
        currentEvo = currentEvo.evolves_to[0];
      }

      // Tambahkan data Pokémon ke payload
      const item = {
        id: detail.id,
        name: detail.name,
        types: detail.types.map((type) => type.type.name),
        abilities: detail.abilities.map((ability) => ability.ability.name),
        height: detail.height,
        weight: detail.weight,
        cries: {
          latest: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${detail.id}.ogg`,
          legacy: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/${detail.id}.ogg`,
        },
        evolutionChains: evolutionChains,
      };

      payload.push(item);
    }

    // Simpan hasil ke dalam db.json
    fs.writeFileSync('db.json', JSON.stringify(payload, null, 2));
    
    // Menampilkan output di console
    console.log('Database created with Pokémon data in db.json');
    console.log(JSON.stringify(payload, null, 2)); // Menampilkan data yang dihasilkan
  } catch (error) {
    console.error('Error:', error);
  }
}

generateJsonDB();
