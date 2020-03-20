import React, { Component } from 'react';
import { Link } from '@reach/router';
import List from './List.jsx'
import Model from '../Model'
import no_img from "../../images/no_beer_img.png"

export default class Beer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: props.id,
      name: props.name,
      tagline: props.tagline,
      description: props.description,
      abv: props.abv,
      ibu: props.ibu,
      ebc: props.ebc,
      srm: props.srm,
      ph: props.ph,
      attenuation_level: props.attenuation_level,
      first_brewed: props.first_brewed,
      food_pairing: props.food_pairing,
      image_url: props.image_url,
      volume: props.volume,
      boil_volume: props.boil_volume,
      ingredients: props.ingredients,
      brewers_tips: props.brewers_tips,
      similars: {
        abv: new Array(),
        food: new Array()
      }
    }

    if(this.props.name) {
      this.getSimilar();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props !== nextProps) {
      this.setState({
        id: nextProps.id,
        name: nextProps.name,
        tagline: nextProps.tagline,
        description: nextProps.description,
        abv: nextProps.abv,
        ibu: nextProps.ibu,
        ebc: nextProps.ebc,
        srm: nextProps.srm,
        ph: nextProps.ph,
        attenuation_level: nextProps.attenuation_level,
        first_brewed: nextProps.first_brewed,
        food_pairing: nextProps.food_pairing,
        image_url: nextProps.image_url,
        volume: nextProps.volume,
        boil_volume: nextProps.boil_volume,
        ingredients: nextProps.ingredients,
        brewers_tips: nextProps.brewers_tips,
        similars: {
          abv: new Array(),
          food: new Array()
        }
      }, this.getSimilar);
    }
  }

  getSimilar() {
    this.similarAbv();
    this.similarFood();
  }

  async similarAbv() {
    const min = this.state.abv - 0.2;
    const max = this.state.abv + 0.2;

    let similar_beers = await Model.getBeersByABV({lower: min, upper: max}, 5);

    const sameId = (element) => element.id === this.state.id;

    similar_beers.splice(similar_beers.findIndex(sameId), 1);

    this.setState({similars: {abv: similar_beers} });
  }

  async similarFood() {
    let similar_beers = new Array();
    const sameId = (element) => element.id === this.state.id;

    for(let i = 0; i < this.state.food_pairing.length; i++) {
      const beers = await Model.getBeersByFood(this.state.food_pairing[i], 5);
      similar_beers.splice(similar_beers.findIndex(sameId), 1);
      similar_beers.push(beers);
    }
    this.setState({similars: {food: similar_beers} });
  }

  render () {
    if(this.state.food_pairing && this.state.ingredients ) {
      return (
        <article className="beer">
          <Link to="/" className="return_list">Retour</Link>
          <header>
            <div className="img_container">
              <img src={this.state.image_url ? `${this.state.image_url}` : `${no_img}` } height="200vh"/>
            </div>
            <div className="title_container">
              <h1>{this.state.name}</h1>
              <h2>"{this.state.tagline}"</h2>
            </div>
          </header>
          <p><b>Description:</b><br/>
            <span>{this.state.description}</span>
          </p>
          <br/>
          <div>
            <span><abbr title="Alcohol By Volume">abv</abbr>: {this.state.abv}</span>,
            <span><abbr title="International Bittering Unit">ibu</abbr>: {this.state.ibu}</span>,
            <span><abbr title="European Brewery Convention">ebc</abbr>: {this.state.ebc}</span>,
            <span><abbr title="Standard Reference Method">srm</abbr>: {this.state.srm}</span>,
            <span>ph: {this.state.ph}</span>,
            <span>attenuation level: {this.state.attenuation_level}</span>
          </div>
          <br/>
          <p><b>First brewed:</b> {this.state.first_brewed}</p>
          <br/>
          <div>
            <b>Food pairing:</b>
            <ul>
              {this.state.food_pairing.map((value, key) => {
                  return (
                    <li key={key}>{value}</li>
                  )
                })}
            </ul>
          </div>
          <div className="similar_beer">
            <b>Similar beers</b>
            <div>
              <h3>Similar Abv</h3>
              <List beers={this.state.similars.abv} onClick={this.props.onClick} />
            </div>
            <div>
              <h3>Similar Food</h3>
              <List beers={this.state.similars.food} onClick={this.props.onClick} />
            </div>
          </div>
          <div>
            <b>Method:</b>
            <ul>
              <li>Volume: {this.state.volume.value} {this.state.volume.unit}</li>
              <li>Boil Volume: {this.state.boil_volume.value} {this.state.boil_volume.unit}</li>
              <li>Ingredients:
                <ul>
                  <li>malt:<ul>{this.state.ingredients.malt.map( (malt, key) => {
                    return (
                    <li key={key}>{malt.amount.value} {malt.amount.unit} of {malt.name}</li>
                    )
                  })}</ul></li>
                  <li>malt:<ul>{this.state.ingredients.hops.map( (hops, key) => {
                    return (
                    <li key={key}>{hops.amount.value} {hops.amount.unit} of {hops.name} added at {hops.add} ({hops.attribute})</li>
                    )
                  })}</ul></li>
                  <li>yeast: {this.state.ingredients.yeast}</li>
                  {this.state.food_pairing.map((value, key) => {
                  return (
                    <li key={key}>{value}</li>
                  )
                })}
                </ul>
              </li>
              <li>Brewers tips:<br/>{this.state.brewers_tips}</li>
            </ul>
          </div>
        </article>
      )
    }
    else {
      return (
        <article>
          <p>No beer</p>
        </article>
      )
    }
    
  }
}
