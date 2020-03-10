import React, { Component } from 'react';
import ReactDom from 'react-dom';
import * as Toastr from 'toastr';
import Model from './Model.js';

import Beer from './components/Beer.jsx'
import List from './components/List.jsx'

class Nav extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filtersTop: "-90px",
      search: {
        name: '',
        yeast: '',
        malt: '',
        food: '',
        abv_lower: '',
        abv_upper: '',
        ibu_lower: '',
        ibu_upper: '',
        ebc_lower: '',
        ebc_upper: '',
        brewed_before: '',
        brewed_after: ''
      },
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFiltersClick () {
    if (this.state.filtersTop !== "40px") {
      this.setState({ filtersTop: "40px" })
    } else {
      this.setState({ filtersTop: "-90px" })
    }
  }

  handleInputChange (event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const search = this.state.search;
    search[name] = value;

    this.setState({
      search: search
    });
  }

  handleSubmit (event) {
    this.props.onClick(this.state.search);
    event.preventDefault();
  }

  render () {
    return (
      <div>
        <nav>
          <a id="random" href="#">Get a Random beer!</a>
          <form id="search" onSubmit={this.handleSubmit}>
            <input type="text" name="name" onChange={this.handleInputChange} value={this.state.search.name} placeholder="beername"/>
            <button>Search</button>
          </form>
          <a id="open_filter" onClick={() => this.handleFiltersClick()}>Filters</a>
        </nav>
        <form id="search_with_filter" style={{top: this.state.filtersTop}}>
          <div>
            <label>yeast </label><input type="text" name="yeast" onChange={this.handleInputChange} value={this.state.search.yeast} placeholder="yeast"/>
            <label>malt </label><input type="text" name="malt" onChange={this.handleInputChange} value={this.state.search.malt} placeholder="malt"/>
            <label>food </label><input type="text" name="food" onChange={this.handleInputChange} value={this.state.search.food} placeholder="food"/>
          </div>
          <div>
            <label>ABV </label><input type="number" name="abv_lower" onChange={this.handleInputChange} value={this.state.search.abv_lower} placeholder="min" min="0" max="100"/><input type="number" name="abv_upper" onChange={this.handleInputChange} value={this.state.search.abv_upper} placeholder="max" min="0" max="100"/>
            <label>IBU </label><input type="number" name="ibu_lower" onChange={this.handleInputChange} value={this.state.search.ibu_lower} placeholder="min" min="1" max="1200"/><input type="number" name="ibu_upper" onChange={this.handleInputChange} value={this.state.search.ibu_upper} placeholder="max" min="1" max="1200"/>
            <label>EBC </label><input type="number" name="ebc_lower" onChange={this.handleInputChange} value={this.state.search.ebc_lower} placeholder="min" min="1" max="600"/><input type="number" name="ebc_upper" onChange={this.handleInputChange} value={this.state.search.ebc_upper} placeholder="max" min="1" max="600"/>
          </div>
          <div>
            <label>Brewed before </label><input type="text" name="brewed_before" onChange={this.handleInputChange} value={this.state.search.brewed_before} placeholder="mm-yyyy"/>
            <label>Brewed after </label><input type="text" name="brewed_after" onChange={this.handleInputChange} value={this.state.search.brewed_after} placeholder="mm-yyyy"/>
          </div>
          <input type="submit" id="submit" />
        </form>
      </div>
    )
  }
}

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      beer: null,
      beers: null,
      search: {},
      toastr_error_options: {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }
    }
  }

  handleClick (beer) {
    this.setState({beer: beer});
  }

  handleSearch (search) {
    this.setState({search: search});
  }

  async componentDidMount () {
    try {
      let beer = await Model.getRandomBeer();
      let beers = await Model.getBeersFilter(this.state.search, 10);
      this.setState({beer: beer, beers: beers});
    }
    catch (e) {
      Toastr.error(e, "Error:", this.state.toastr_error_options);
    }
  }

  async componentWillUpdate (nextProps, nextState) {
    if (this.state.search !== nextState.search) {
      try {
        let beers = await Model.getBeersFilter(nextState.search, 10);
        this.setState({beers: beers});
      }
      catch (e) {
        Toastr.error(e, "Error:", this.state.toastr_error_options);
      }
    }
  }
 
  render () {
    return (
      <div>
        <Nav onClick={(i) => this.handleSearch(i)} />
        <List beers={ this.state.beers } onClick={(i) => this.handleClick(i)} />
        <Beer { ...this.state.beer } />
      </div>
    )
  }
}

ReactDom.render(
  <App />,
  document.querySelector('#app')
)

/*import Model from "./Model.js"

import main_tpl from "./tpl/main.tpl.html"
import beers_list_tpl from "./tpl/beers_list.tpl.html"
import beer_tpl from "./tpl/beer.tpl.html"
import beer_similar_tpl from "./tpl/beerSimilar.tpl.html"
import no_img from "../images/no_beer_img.png"

class App {

  constructor() {
    document.querySelector("body").innerHTML = main_tpl();
    document.querySelector("#random").addEventListener('click', this.random.bind(this));
    document.querySelector("#search").addEventListener('submit', this.formSubmit.bind(this));
    document.querySelector("#search_with_filter").addEventListener('submit', this.formSubmit.bind(this));
    document.querySelector("#open_filter").addEventListener('click', this.showFilter.bind(this));
    this.random();
  }
  
  showFilter() {
    let filters_menu = document.querySelector("#search_with_filter");

    if (filters_menu.style.top !== "40px")
      filters_menu.style.top = "40px";
    else
      filters_menu.style.top = "-90px";
  }

  formSubmit(e) {
    e.preventDefault();
    this.searchWithFilters();
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

  async showSimilarAbv(beer) {
    let minimum = beer.abv - 0.2;
    let maximum = beer.abv + 0.2;

    let similar_beers = await Model.getBeersByABV({lower: minimum, upper: maximum}, 80);

    let div = document.querySelector('#similar_abv');

    if (similar_beers.length > 2) {
      for (let i = 0; i < 2; i++) {
        let index = Math.floor(Math.random() * (similar_beers.length - 1));
        similar_beers[index].value = similar_beers[index].abv;
        div.innerHTML += beer_similar_tpl(similar_beers[index]);
        similar_beers.splice(index, 1);
      }
    } else {
      for (let i = 0; i < 2; i++) {
        if (similar_beers[i]) {
          similar_beers[i].value = similar_beers[i].abv;
          div.innerHTML += beer_similar_tpl(similar_beers[i]);
        } else {
          div.innerHTML += '<tr><td>--</td><td>--</td></tr>';
        }
      }
    }
  }

  async showSimilarFood(beer) {
    let similar_beers = [];

    if (beer.food_pairing.length > 0) {
      let i = 0;

      for (let i = 0; i < beer.food_pairing.length; i++) {
        let temp_beers = await Model.getBeersByFood(beer.food_pairing[i], 80);

        temp_beers.forEach(temp_beer => {
          if ((beer.id !== temp_beer.id) && (similar_beers.indexOf(temp_beer) === -1)) {
            temp_beer.value = beer.food_pairing[i];
            similar_beers.push(temp_beer);
          }
        })
      }
    }

    let div = document.querySelector('#similar_food');

    if (similar_beers.length > 2) {
      for (let i = 0; i < 2; i++) {
        let index = Math.floor(Math.random() * (similar_beers.length - 1));
        div.innerHTML += beer_similar_tpl(similar_beers[index]);
        similar_beers.splice(index, 1);
      }
    } else {
      for (let i = 0; i < 2; i++) {
        if (similar_beers[i]) {
          div.innerHTML += beer_similar_tpl(similar_beers[i]);
        } else {
          div.innerHTML += '<tr><td>--</td><td>--</td></tr>';
        }
      }
    }
  }

  showBeer(beer, from_list) {
    if(from_list)
      this.hideListBeers();
    else
      this.resetAll();

    let section = document.querySelector("#beer");
    beer.no_img = no_img;
    section.innerHTML = beer_tpl(beer);
    

    if(beer.from_list) {
      section.querySelector("#return2list").addEventListener('click', function() {
        this.resetBeer();
        document.querySelector("#list_beers").style.display = "block";
      }.bind(this));
    }

    this.showSimilarAbv(beer);
    this.showSimilarFood(beer);
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

  resetAll() {
    this.resetBeer();
    this.resetListBeers();
  }
}

export default App;*/
