import React, { Component } from 'react';

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
      })
    }
  }

  render () {
    if (this.state.beers) {
      return (
        <section>
          <article>
            {this.state.beers.map((beer, key) => {
              return (
                <article key={ beer.id } onClick={() => this.props.onClick(beer)}>
                  <img src={ beer.image_url }/>
                  <p>{ beer.name }</p>
                </article>
              )
            })}
          </article>
        </section>
      )
    } else {
      return (
        <section>
          <p>No Results</p>
        </section>
      )
    }
  }
}