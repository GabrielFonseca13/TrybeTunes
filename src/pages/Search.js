import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    bandArtist: '',
    btnDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.buttonValidation());
  };

  buttonValidation = () => {
    const { bandArtist, btnDisabled } = this.state;
    const minArtistSize = 2;
    if (bandArtist.length >= minArtistSize) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  };

  render() {
    const { bandArtist, btnDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>SEARCH</h1>
        <form>
          <label htmlFor="bandArtist">
            Banda/Artista:
            <input
              id="bandArtist"
              name="bandArtist"
              type="text"
              data-testid="search-artist-input"
              value={ bandArtist }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ btnDisabled }
              // onClick={}
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
