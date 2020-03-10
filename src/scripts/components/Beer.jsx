import React, { Component } from 'react';
import no_img from "../../images/no_beer_img.png"

export default class Beer extends Component {
  constructor (props) {
    super(props)

    this.state = {
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
      brewers_tips: props.brewers_tips
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props !== nextProps) {
      this.setState({
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
        brewers_tips: nextProps.brewers_tips
      })
    }
  }

  render () {
    return (
      <article>
        <div>{/* Return Buttun */}</div>
        <header>
          <div className="img_container">
            <img src={this.state.image_url ? `${this.state.image_url}` : `${no_img}` } height="200vh"/>
          </div>
          <div className="title_container">
            <h1>{this.state.name}</h1>
            <h2>"{this.state.tagline}"</h2>
          </div>
        </header>
      </article>
    )
  }
}