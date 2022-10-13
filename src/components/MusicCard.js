import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musics, handleAddFavorite } = this.props;
    console.log(musics);
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
    trackId: PropTypes.string,
  }).isRequired,
  handleAddFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
