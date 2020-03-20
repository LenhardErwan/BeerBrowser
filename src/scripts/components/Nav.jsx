import React, { Component } from 'react';
import { navigate } from '@reach/router';
import * as Toastr from 'toastr';

import Model from '../Model.js';

export default class Nav extends Component {
  constructor (props) {
    super(props);

    this.state = {
      advSearchTop: '-90px',
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
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickRandom = this.handleClickRandom.bind(this);
  }

  handleAdvSearchClick () {
    if (this.state.advSearchTop !== '40px') {
      this.setState({ advSearchTop: '40px' });
    } else {
      this.setState({ advSearchTop: '-90px' });
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
    event.preventDefault();
    this.props.onClick(this.state.search);
    navigate('/');
  }

  async handleClickRandom () {
    try {
      const beer = await Model.getRandomBeer();
      this.props.onRandom(beer);
      navigate('/beer');
    } catch (e) {
      Toastr.error(e, 'Error:', this.props.toastrErrorOptions);
    }
  }

  render () {
    return (
      <div>
        <nav>
          <a onClick={this.handleClickRandom}>Get a Random beer!</a>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="name" onChange={this.handleInputChange} value={this.state.search.name} placeholder="beername" />
            <button>Search</button>
          </form>
          <button onClick={() => this.handleAdvSearchClick()}>Advanced Search</button>
        </nav>
        <form className="adv_search" onSubmit={this.handleSubmit} style={{ top: this.state.advSearchTop }}>
          <div>
            <label>yeast </label><input type="text" name="yeast" onChange={this.handleInputChange} value={this.state.search.yeast} placeholder="yeast" />
            <label>malt </label><input type="text" name="malt" onChange={this.handleInputChange} value={this.state.search.malt} placeholder="malt" />
            <label>food </label><input type="text" name="food" onChange={this.handleInputChange} value={this.state.search.food} placeholder="food" />
          </div>
          <div>
            <label>ABV </label><input type="number" name="abv_lower" onChange={this.handleInputChange} value={this.state.search.abv_lower} placeholder="min" min="0" max="100" /><input type="number" name="abv_upper" onChange={this.handleInputChange} value={this.state.search.abv_upper} placeholder="max" min="0" max="100" />
            <label>IBU </label><input type="number" name="ibu_lower" onChange={this.handleInputChange} value={this.state.search.ibu_lower} placeholder="min" min="1" max="1200" /><input type="number" name="ibu_upper" onChange={this.handleInputChange} value={this.state.search.ibu_upper} placeholder="max" min="1" max="1200" />
            <label>EBC </label><input type="number" name="ebc_lower" onChange={this.handleInputChange} value={this.state.search.ebc_lower} placeholder="min" min="1" max="600" /><input type="number" name="ebc_upper" onChange={this.handleInputChange} value={this.state.search.ebc_upper} placeholder="max" min="1" max="600" />
          </div>
          <div>
            <label>Brewed before </label><input type="text" name="brewed_before" onChange={this.handleInputChange} value={this.state.search.brewed_before} placeholder="mm-yyyy" />
            <label>Brewed after </label><input type="text" name="brewed_after" onChange={this.handleInputChange} value={this.state.search.brewed_after} placeholder="mm-yyyy" />
          </div>
          <input type="submit" className="submit" />
        </form>
      </div>
    )
  }
}
