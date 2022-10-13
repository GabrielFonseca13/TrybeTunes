import React from 'react';
import CardAlbum from '../components/CardAlbum';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    bandArtist: '',
    inputSearch: '',
    btnDisabled: true,
    loading: false,
    albuns: [],
    callApi: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState(
      {
        [name]: value,
      },
      () => this.buttonValidation(),
    );
  };

  buttonValidation = () => {
    const { bandArtist } = this.state;
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

  clickHandleSearch = async () => {
    const { bandArtist } = this.state;
    this.setState({
      inputSearch: bandArtist,
      bandArtist: '',
      loading: true,
    });
    const response = await searchAlbumsAPI(bandArtist);
    this.setState({
      albuns: response,
      btnDisabled: true,
      callApi: true,
      loading: false,
    });
  };

  render() {
    const { bandArtist, btnDisabled, loading, albuns, callApi, inputSearch } = this.state;
    return (
      <div data-testid="page-search">
        <h1>SEARCH</h1>
        <Header />
        {
          loading
            ? <Loading />
            : (
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
                    onClick={ this.clickHandleSearch }
                  >
                    Pesquisar
                  </button>
                </label>
              </form>
            )
        }

        {callApi && albuns.length > 0
          ? <CardAlbum albuns={ albuns } artistName={ inputSearch } />
          : (
            <div>
              <h3>Nenhum álbum foi encontrado</h3>
            </div>
          )}
      </div>
    );
  }
}

export default Search;
