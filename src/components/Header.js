import React from 'react';
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
      </header>
    );
  }
}

export default Header;
