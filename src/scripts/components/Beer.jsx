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
    if(this.state.food_pairing && this.state.ingredients ) {
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
              <table className="similar_abv">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Abv</th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
            <div>
              <h3>Similar Food</h3>
              <table className="similar_food">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Food</th>
                  </tr>
                </thead>
                <tbody>
                  
                </tbody>
              </table>
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
