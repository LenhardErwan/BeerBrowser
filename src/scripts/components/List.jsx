import React, { Component } from 'react';
import { navigate } from '@reach/router';

import noImg from '../../images/no_beer_img.png';

export default class List extends Component {
  constructor (props) {
    super(props)

    this.state = {
      beers: props.beers
    }
  }

  componentWillUpdate (nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        beers: nextProps.beers
      });
    }
  }

  render () {
    if (this.state.beers && this.state.beers.length > 0) {
      return (
        <section className="list_beers">
          {this.state.beers.map((beer, key) => {
            return (
              <article key={beer.id} onClick={() => { this.props.onClick(beer); navigate('/beer'); }}>
                <div className="img_container">
                  <img src={beer.image_url ? `${beer.image_url}` : `${noImg}`} />
                </div>
                <div>
                  <h1>Name: {beer.name}</h1>
                  <span><abbr title="International Bittering Unit">abv</abbr>: {beer.abv}, </span>
                  <span><abbr title="International Bittering Unit">ibu</abbr>: {beer.ibu}, </span>
                  <span><abbr title="European Brewery Convention">ebc</abbr>: {beer.ebc}, </span>
                  <span>ph: {beer.ph}, </span>
                  <span>attenuation level: {beer.attenuation_level}</span>
                </div>
              </article>
            )
          })}
        </section>
      )
    } else if (this.state.beers && this.state.beers.length <= 0) {
      return (
        <section className="no_result">
          <p>No Results</p>
        </section>
      )
    } else {
      return (null)
    }
  }
}
