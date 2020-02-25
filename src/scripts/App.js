import Model from "./Model.js"

import main_tpl from "./tpl/main.tpl.html"
import beers_list_tpl from "./tpl/beers_list.tpl.html"
import beer_tpl from "./tpl/beer.tpl.html"
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
		this.showBeer(rand_beer[0], false);
	}

	async search() {
		let input = document.querySelector("#search_beer_name");
		let search_beers = await Model.getBeersByName(input.value, 80);
		input.value = "";
		this.showListBeers(search_beers);
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

  showBeer(beer, from_list) {
    if(from_list)
      this.hideListBeers();
    else
      this.resetAll();

    let section = document.querySelector("#beer");
		beer.no_img = no_img;
    section.innerHTML = beer_tpl(beer);

    this.similarAbv(beer);
    
    if(beer.from_list) {
      section.querySelector("#return2list").addEventListener('click', function() {
        this.resetBeer();
        this.resetSimilarBeers();
        document.querySelector("#list_beers").style.display = "block";
      }.bind(this));
    }

    section.querySelector("#something").addEventListener('click', function() {
      console.log("todo something");
    }.bind(this))
  }

  resetBeer() {
    let section = document.querySelector("#beer");
		section.innerHTML = "";
  }

	showListBeers(beers) {
    let map_beers = new Map();

    this.resetAll();

    let list = document.querySelector("#list_beers");
    list.style.display = "block";
		beers.forEach(beer => {
      beer.no_img = no_img;
      beer.from_list = true;
      list.innerHTML += beers_list_tpl(beer);
      map_beers.set(beer.id.toString(), beer);
    });

    list.childNodes.forEach(e => {
      e.addEventListener('click', function() {
        this.showBeer(map_beers.get(e.dataset.beerId.toString()), true);
      }.bind(this));
    }, this)
  }
  
  resetListBeers() {
    let list = document.querySelector("#list_beers");
		list.innerHTML = "";
  }

  hideListBeers() {
    document.querySelector("#list_beers").style.display = "none";
  }

  showSimilarAbvBeers(beers) {
    this.resetSimilarBeers();
    let map_beers = new Map();
    
    let section = document.querySelector("#similar_abv_beers");
    beers.forEach(beer => {
      if(beer !== null) {
        section.innerHTML += beer_similar_abv_tpl(beer);
        map_beers.set(beer.id.toString(), beer);
      } else
        section.innerHTML += '<div>Unknow</div>';
    })

    section.childNodes.forEach(e => {
      e.addEventListener('click', function() {
        this.showBeer(map_beers.get(e.dataset.beerId.toString()), true);
      }.bind(this));
    }, this)
  }

  resetSimilarBeers() {
    let section = document.querySelector("#similar_abv_beers");
    section.innerHTML = '';
  }

  resetAll() {
    this.resetBeer();
    this.resetListBeers();
    this.resetSimilarBeers();
  }
}

export default App;