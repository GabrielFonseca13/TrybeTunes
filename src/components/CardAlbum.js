import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardAlbum extends React.Component {
  render() {
    const { albuns, artistName } = this.props;

    return (
      <div>
        <h3>{`Resultado de álbuns de: ${artistName}`}</h3>
        <div>
          {albuns.map((album) => (
            <div key={ album.collectionId }>
              <div>
                <img src={ album.artworkUrl100 } alt={ album.artistName } />
              </div>
              <div>
                <h4>{`Artista :${album.artistName}`}</h4>
                <h5>{`coleção :${album.collectionName}`}</h5>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  {' '}
                  Link para Album
                  {' '}

                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

CardAlbum.propTypes = {
  albuns: PropTypes.arrayOf,
}.isRequired;

export default CardAlbum;
