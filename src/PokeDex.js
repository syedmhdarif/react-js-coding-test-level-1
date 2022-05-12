import "./App.css";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Modal from "react-modal";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

function PokeDex() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState([]);
  const [pokemonchart, setPokemonchart] = useState([]);

  const data = [
    { year: "1950", population: 2.525 },
    { year: "1960", population: 3.018 },
    { year: "1970", population: 3.682 },
    { year: "1980", population: 4.44 },
    { year: "1990", population: 5.31 },
    { year: "2000", population: 6.127 },
    { year: "2010", population: 6.93 },
  ];

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "black",
      color: "white",
    },
    overlay: { backgroundColor: "grey" },
  };

  const getpokemon = () => {
    setTimeout(function () {
      fetch("https://pokeapi.co/api/v2/pokemon")
        .then((response) => response.json())
        .then((data) => {
          setPokemons(data.results);
          console.log(data.results);
          console.log(data);
        });
    }, 3000);
  };

  useEffect(() => {
    if (pokemons.length === 0) {
      setIsLoading(true);
      getpokemon();
    } else {
      setIsLoading(false);
    }
  }, [pokemons]);
  useEffect(() => {
    if (pokemonDetail) {
      var pokemonstat = [];
      pokemonDetail.stats.map((stat) =>
        pokemonstat.push({
          stat: stat.stat["name"],
          percentage: parseInt(stat.base_stat),
        })
      );
      console.log(pokemonstat);
      setPokemonchart(pokemonstat);
    }
  }, [pokemonDetail]);

  function getCurrentPokemon(param) {
    axios.get(param.url).then((res) => {
      setPokemonDetail(res.data);
      setCurrentPokemon(res.data.stats);
    });
  }

  console.log("here", pokemonDetail);

  if (!isLoading && pokemons.length === 0) {
    return (
      <div>
        <header className="App-header">
          <h1>Welcome to pokedex !</h1>
          <h2>Requirement:</h2>
          <ul>
            <li>
              Call this api:https://pokeapi.co/api/v2/pokemon to get pokedex,
              and show a list of pokemon name.
            </li>
            <li>Implement React Loading and show it during API call</li>
            <li>
              when hover on the list item , change the item color to yellow.
            </li>
            <li>when clicked the list item, show the modal below</li>
            <li>
              Add a search bar on top of the bar for searching, search will run
              on keyup event
            </li>
            <li>Implement sorting and pagingation</li>
            <li>Commit your codes after done</li>
            <li>
              If you do more than expected (E.g redesign the page / create a
              chat feature at the bottom right). it would be good.
            </li>
          </ul>
        </header>
      </div>
    );
  }
  // else {
  console.log(pokemonDetail);
  return (
    <div>
      <header className="App-header">
        {isLoading ? (
          <>
            <div className="App">
              <header className="App-header">
                <ReactLoading type="cylon" height={667} width={375} />
              </header>
            </div>
          </>
        ) : (
          <>
            <h1>Welcome to pokedex !</h1>
            <b>Implement Pokedex list here</b>
            <ul>
              {pokemons.map((pokemon) => (
                <li>
                  <button
                    // onClick={() => setPokemonDetail(pokemon)}
                    onClick={() => getCurrentPokemon(pokemon)}
                    className="pokemonlist"
                  >
                    {pokemon.name}{" "}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </header>

      {pokemonDetail && (
        <Modal
          isOpen={pokemonDetail}
          contentLabel={pokemonDetail?.name || ""}
          onRequestClose={() => {
            setPokemonDetail(null);
          }}
          style={customStyles}
        >
          <div className="modalstyle">
            <div className="headermodal">
              <h1>{pokemonDetail.name}</h1>
              <img src={pokemonDetail.sprites["front_default"]}></img>
            </div>
            <div className="pokemonstat">
              {pokemonDetail.stats.map((stat) => (
                <div>
                  <a>
                    {" "}
                    {stat.stat["name"]}
                    {": "}
                  </a>
                  <a>
                    {"  "}
                    {stat.base_stat}
                  </a>
                </div>
              ))}
            </div>
            <div>
              {pokemonchart && (
                <Chart style={{ color: "white" }} data={pokemonchart}>
                  <ArgumentAxis showTicks="white" />
                  <ValueAxis max={7} />

                  <BarSeries valueField="percentage" argumentField="stat" />
                  <Title text="Stats" />
                  <Animation />
                </Chart>
              )}
            </div>

            <ul>
              {/* <li> {pokemonDetail.stats["base_stat"]} </li> */}

              {/* <ul>
                {pokemonDetail.map((spokemon) => (
                  <li>{spokemon.stats['base_stat']} </li>
                ))}
              </ul> */}

              <li>
                Create a buttton to download the information generated in this
                modal as pdf. (images and chart must be included)
              </li>
            </ul>
          </div>
        </Modal>
      )}
    </div>
  );
}

// }

export default PokeDex;
