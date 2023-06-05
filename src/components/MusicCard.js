import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musics, handleAddFavorite, ifChecked } = this.props;
    // console.log(typeof musics.trackId);
    return (
      <div>
        <p>{musics.trackName}</p>
        <audio data-testid="audio-component" src={ musics.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ musics.trackId }>
          Favorita
          <input
            type="checkbox"
            name="favorite"
            id={ musics.trackId }
            data-testid={ `checkbox-music-${musics.trackId}` }
            checked={ ifChecked }
            onChange={ handleAddFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  handleAddFavorite: PropTypes.func.isRequired,
  ifChecked: PropTypes.func.isRequired,
};

export default MusicCard;

// Requisitos resolvidos com a ajuda da Ligia Bicalho;
