import Model from "./Model.js"

import main_tpl from "./tpl/main.tpl.html"
import beer_main_tpl from "./tpl/beerMain.tpl.html"
import beer_similar_abv_tpl from "./tpl/beerSimilarAbv.tpl.html"
import no_img from "../images/no_beer_img.png"

class App {

	constructor() {
		document.querySelector("body").innerHTML = main_tpl();
		document.querySelector("#random").addEventListener('click', this.random.bind(this));
		document.querySelector("#search").addEventListener('submit', (e) => {
			e.preventDefault();
			this.search();
		});
		this.random();
	}

	async random() {
		let rand_beer = await Model.getRandomBeer();
		this.showMainBeers(rand_beer);
    this.similarAbv(rand_beer[0]);
	}

	async search() {
		let input = document.querySelector("#search_beer_name");
		let search_beers = await Model.getBeersByName(input.value, 5);
		input.value = "";
		this.showMainBeers(search_beers);
    this.similarAbv(search_beers[0]);
	}

  async similarAbv(beer) {
    let upper_abv = await Model.getBeersByABV({lower: beer.abv}, 80);
    upper_abv.sort(function(a, b) {
      return a.abv - b.abv;
    })

    let lower_abv = await Model.getBeersByABV({upper: beer.abv}, 80);
    lower_abv.sort(function(a, b) {
      return b.abv - a.abv;
    })

    let similar_beers = [beer];

    for(let j = 0; j < 3; j++) {
      similar_beers.unshift(upper_abv[j] ? upper_abv[j] : null);
    }

    for(let j = 0; j < 3; j++) {
      similar_beers.push(lower_abv[j] ? lower_abv[j] : null);
    }

    this.showSimilarAbvBeers(similar_beers);
  }

	showMainBeers(beers) {
		let section = document.querySelector("#main_beers");
		section.innerHTML = "";
		beers.forEach(beer => {
			beer.no_img = no_img
			section.innerHTML += beer_main_tpl(beer);
		});
	}

  showSimilarAbvBeers(beers) {
    let section = document.querySelector("#similar_abv_beers")
    section.innerHTML = '';
    
    beers.forEach(beer => {
      if(beer !== null)
        section.innerHTML += beer_similar_abv_tpl(beer);
      else
        section.innerHTML += '<div>Unknow</div>';
    })
  }
}

export default App;