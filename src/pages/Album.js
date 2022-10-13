import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    tracks: [],

  };

  componentDidMount() {
    this.response();
  }

  response = async () => {
    const { match: { params: { id } } } = this.props;
    const requestOk = await getMusics(id);
    console.log(requestOk);
    this.setState({
      tracks: requestOk,
    });
  };

  render() {
    const { tracks } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <ul>
          {tracks.map((music, index) => (
            index === 0
              ? (
                <li key={ index }>
                  <p data-testid="artist-name">{music.artistName}</p>
                  <p data-testid="album-name">{music.collectionName}</p>
                  <img src={ music.collectionViewUrl } alt={ music.collectionName } />
                </li>
              )
              : (
                <li key={ index }>
                  <MusicCard musics={ music } />
                </li>
              )
          ))}
        </ul>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
