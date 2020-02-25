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
			this.searchWithFilters();
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
		this.showListBeers(search_beers);
  }
  
  async searchWithFilters() {
    let name = document.querySelector("#search_beer_name").value;
    let yeast = document.querySelector("#filter_yeast").value;
    let malt = document.querySelector("#filter_malt").value;
    let food = document.querySelector("#filter_food").value;
    let abv_lower = document.querySelector("#filter_abv_lower").value;
    let abv_upper = document.querySelector("#filter_abv_upper").value;
    let ibu_lower = document.querySelector("#filter_ibu_lower").value;
    let ibu_upper = document.querySelector("#filter_ibu_upper").value;
    let ebc_lower = document.querySelector("#filter_ebc_lower").value;
    let ebc_upper = document.querySelector("#filter_ebc_upper").value;
    let brewed_before = document.querySelector("#filter_brewed_before").value;
    let brewed_after = document.querySelector("#filter_brewed_after").value;

    let filter = new Object();
    if(name) filter.name = name;
    if(yeast) filter.yeast = yeast;
    if(malt) filter.malt = malt;
    if(food) filter.food = food;
    if(abv_lower || abv_upper) {
      let abv = new Object();
      if(abv_lower) abv.lower = abv_lower;
      if(abv_upper) abv.upper = abv_upper;
      filter.abv = abv;
    }
    if(ibu_lower || ibu_upper) {
      let ibu = new Object();
      if(ibu_lower) ibu.lower = ibu_lower;
      if(ibu_upper) ibu.upper = ibu_upper;
      filter.ibu = ibu;
    }
    if(ebc_lower || ebc_upper) {
      let ebc = new Object();
      if(ebc_lower) ebc.lower = ebc_lower;
      if(ebc_upper) ebc.upper = ebc_upper;
      filter.ebc = ebc;
    }
    if(brewed_before || brewed_after) {
      let brewed = new Object();
      if(brewed_before) brewed.before = brewed_before;
      if(brewed_after) brewed.after = brewed_after;
      filter.brewed = brewed;
    }

    let search_beer = await Model.getBeersFilter(filter, 80);
    this.showListBeers(search_beer);
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