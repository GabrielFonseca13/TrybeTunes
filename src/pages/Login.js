import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    userName: '',
    btnDisabled: true,
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.buttonValidation());
  };

  buttonValidation = () => {
    const { userName } = this.state;
    const minNameSize = 3;
    if (userName.length >= minNameSize) {
      this.setState({
        btnDisabled: false,
      });
    } else {
      this.setState({
        btnDisabled: true,
      });
    }
  };

  handleClick = async () => {
    const { history: { push } } = this.props;
    const { userName } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: userName });
    push('/search');
  };

  render() {
    const { userName, btnDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        <h1>TRYBETUNES</h1>
        <form action="">
          <label htmlFor="name">
            Name:
            <input
              id="name"
              name="userName"
              type="text"
              data-testid="login-name-input"
              valeu={ userName }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ btnDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
          {loading && <Loading />}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
