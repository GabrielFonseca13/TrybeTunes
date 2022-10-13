import React from 'react';
import Header from '../components/Header';
// import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        {/* <ul>
          <MusicCard tracks={ album } />
        </ul> */}
      </div>
    );
  }
}

export default Album;
