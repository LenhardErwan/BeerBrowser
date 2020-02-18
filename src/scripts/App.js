import fetch from "node-fetch";
import Model from "./Model.js"

import main_tpl from "./tpl/main.tpl.html"
import beer_tpl from "./tpl/beer.tpl.html"
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
		this.showBeers(rand_beer);
	}

	async search() {
		let input = document.querySelector("#search_beer_name");
		let search_beers = await Model.getBeersByName(input.value, 5);
		input.value = "";
		this.showBeers(search_beers);
	}

	showBeers(beers) {
		let section = document.querySelector("#beers");
		section.innerHTML = "";
		beers.forEach(beer => {
			beer.no_img = no_img
			section.innerHTML += beer_tpl(beer);
		});
	}
}

export default App;