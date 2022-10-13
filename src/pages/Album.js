import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    tracks: [],
    favMusics: [],
    loading: false,
  };

  componentDidMount() {
    this.response();
    this.updateFav();
  }

  updateFav = async () => {
    this.setState({
      favMusics: await getFavoriteSongs(),
    });
  };

  ifChecked = (music) => {
    const { favMusics } = this.state;
    console.log('favMusics: ', favMusics);

    const validateFav = favMusics.some((song) => music.trackId === song.trackId);
    return validateFav;
  };

  handleAddFavorite = async (music) => {
    const { favMusics } = this.state;
    const validateFav = favMusics.some((song) => music.trackId === song.trackId);

    this.setState({
      loading: true,
    });
    if (validateFav) {
      console.log('if remove');
      await removeSong(music);
      this.setState({
        loading: false,
        favMusics: await getFavoriteSongs(),
      });
    } else {
      console.log('if add');
      await addSong(music);
      this.setState({
        favMusics: await getFavoriteSongs(),
        loading: false,
      });
    }
  };

  response = async () => {
    const { match: { params: { id } } } = this.props;
    const requestOk = await getMusics(id);
    // console.log(requestOk);
    this.setState({
      tracks: requestOk,
    });
  };

  render() {
    const { tracks, loading } = this.state;
    // console.log(favMusics);
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <ul>
          {
            loading
              ? <Loading />
              : null
          }

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
                  <MusicCard
                    musics={ music }
                    handleAddFavorite={ () => this.handleAddFavorite(music) }
                    ifChecked={ this.ifChecked(music) }
                  />
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

// Requisito concluido com auxilio da Ligia Bicalho!
