let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("http call failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

// Card component
function PokemonCard(props) {
  return React.createElement(
    "div",
    {
      className: "bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
    },
    React.createElement("img", { 
      src: props.image, 
      alt: props.name, 
      className: "w-full h-48 object-cover transition-transform duration-300 transform hover:scale-110" // Menambahkan efek hover pada gambar
    }),
    React.createElement(
      "div",
      { className: "p-4" },
      React.createElement("h2", { className: "font-semibold text-lg text-green-600 text-center" }, props.name), // Mengganti warna nama Pokémon
      React.createElement("p", { className: "text-sm text-gray-600 text-center" }, `Type: ${props.types}`)
    )
  );
}

// List component
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center text-xl text-gray-700 mt-4" },
      "Loading Pokemon data..."
    );
  }

  return React.createElement(
    "div",
    { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4" }, // Responsive grid
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.join("/"),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      })
    )
  );
}

// App component wrap header and list
function App() {
  return React.createElement(
    "div",
    { className: "max-w-6xl mx-auto" },
    React.createElement(
      "header",
      { className: "mb-6 text-center bg-blue-300 p-6 rounded-md shadow-lg" },
      React.createElement(
        "h1",
        { className: "text-5xl text-blue-800 font-bold font-poppins transition-all duration-300 hover:text-blue-600 uppercase" }, // Menambahkan uppercase
        "Pokedex"
      )
    ),
    React.createElement(PokemonList, null)
  );
}

// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();
