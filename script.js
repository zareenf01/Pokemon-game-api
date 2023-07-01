"use strict";

const btn = document.querySelector("button");
const Winner = document.getElementById("winner");
const body = document.querySelector("body");
let height1, weight1, height2, weight2, pokemon1, pokemon2;

const api = fetch("https://pokeapi.co/api/v2/pokemon")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    function random() {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomURL = data.results[randomIndex].url;
      const randomIndex2 = Math.floor(Math.random() * data.results.length);
      const randomURL2 = data.results[randomIndex2].url;

      fetch(randomURL)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          height1 = data.height;
          weight1 = data.weight;

          pokemon1 = data.name;
          const pokemonImg1 =
            data.sprites.versions["generation-ii"].crystal.front_default;

          document.getElementById("pokemon1").textContent = pokemon1;
          document.getElementById("img1").src = pokemonImg1;
        });

      fetch(randomURL2)
        .then((res) => res.json())
        .then((data) => {
          height2 = data.height;
          weight2 = data.weight;

          pokemon2 = data.name;
          const pokemonImg2 =
            data.sprites.versions["generation-ii"].crystal.front_default;

          document.getElementById("pokemon2").textContent = pokemon2;
          document.getElementById("img2").src = pokemonImg2;
          winner();
        });
    }

    btn.addEventListener("click", winner);
    btn.addEventListener("click", random);
    btn.addEventListener("click", function () {
      body.classList.remove("animated", "fadeIn");

      void body.offsetWidth;
      body.classList.add("animated", "fadeIn");
    });
  });

function winner() {
  if (
    height1 !== undefined &&
    weight1 !== undefined &&
    height2 !== undefined &&
    weight2 !== undefined
  ) {
    if (height1 > height2 && weight1 > weight2) {
      Winner.textContent = `Winner: ${pokemon1}`;
    } else if (height2 > height1 && weight2 > weight1) {
      Winner.textContent = `Winner: ${pokemon2}`;
    } else {
      Winner.textContent = `It's a Tie!!!`;
    }
  }
}
