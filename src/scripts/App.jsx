import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Router } from '@reach/router';
import * as Toastr from 'toastr';

import Model from './Model.js';
import Nav from './components/Nav.jsx';
import Beer from './components/Beer.jsx';
import List from './components/List.jsx';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      beer: null,
      beers: null,
      toastr_error_options: {
        closeButton: true,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        preventDuplicates: false,
        onclick: null,
        showDuration: 300,
        hideDuration: 1000,
        timeOut: 5000,
        extendedTimeOut: 1000,
        showEasing: 'swing',
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
      }
    };
  }

  handleClick (beer) {
    this.setState({ beer: beer });
  }

  async handleSearch (search) {
    try {
      const beers = await Model.getBeersFilter(search, 10);
      this.setState({ beers: beers });
    } catch (e) {
      Toastr.error(e, 'Error:', this.state.toastr_error_options);
    }
  }

  async componentDidMount () {
    try {
      const beer = await Model.getRandomBeer();
      const beers = await Model.getBeersFilter(this.state.search, 10);
      this.setState({ beer: beer, beers: beers });
    } catch (e) {
      Toastr.error(e, 'Error:', this.state.toastr_error_options);
    }
  }

  render () {
    return (
      <div>
        <Nav onClick={(i) => this.handleSearch(i)} onRandom={(i) => this.handleClick(i)} toastrErrorOptions={this.state.toastr_error_options} />

        <Router className="beer_section">
          <List path="/" beers={this.state.beers} onClick={(i) => this.handleClick(i)} />
          <Beer path="/beer" {...this.state.beer} onClick={(i) => this.handleClick(i)} />
        </Router>
      </div>
    )
  }
}

ReactDom.render(
  <App />,
  document.querySelector('#app')
)
