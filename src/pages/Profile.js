import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loading: false,
    userInfo: {},
  };

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile = async () => {
    this.setState({
      loading: true,
    });
    const dataUser = await getUser();
    console.log(dataUser);
    this.setState({
      loading: false,
      userInfo: dataUser,
    });
  };

  render() {
    const { userInfo, loading } = this.state;
    return (
      <>
        <h1>PROFILE</h1>
        <Header />
        {loading
          ? <Loading />
          : (
            <div data-testid="page-profile">
              <h3>
                {' '}
                { userInfo.name }
              </h3>
              <h3>
                {' '}
                {userInfo.email}
              </h3>
              <p>
                {' '}
                {userInfo.description}
              </p>
              <img
                src={ userInfo.image }
                alt={ userInfo.name }
                data-testid="profile-image"
              />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </>
    );
  }
}

export default Profile;
