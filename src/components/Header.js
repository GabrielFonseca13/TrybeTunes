import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  state = {
    userName: '',
  };

  async componentDidMount() {
    this.setState({
      userName: await getUser(),
    });
  }

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component">
        <h2>HEADER</h2>
        {
          !userName ? (
            <Loading />
          ) : (
            <h3 data-testid="header-user-name">{userName.name}</h3>
          )
        }
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
