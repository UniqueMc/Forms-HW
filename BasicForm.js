import React from 'react';

class BasicForm extends React.Component {
  static displayName = "basic-input";

  state = {
    users: [],
    error: '',
    isNameValid: true,
    isEmailValid: true,
    isPhoneValid: true
  };

  validateName = (name) => name.trim().length > 0;
  validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  validatePhone = (phone) => /^\d{10}$/.test(phone);

  onFormSubmit = (evt) => {
    evt.preventDefault();

    const name = this.refs.name.value.trim();
    const email = this.refs.email.value.trim();
    const phone = this.refs.phone.value.trim();

    const isNameValid = this.validateName(name);
    const isEmailValid = this.validateEmail(email);
    const isPhoneValid = this.validatePhone(phone);

    this.setState({ isNameValid, isEmailValid, isPhoneValid });

    if (!isNameValid || !isEmailValid || !isPhoneValid) {
      this.setState({ error: 'Please fill out all fields correctly.' });
      return;
    }

    const users = [...this.state.users, { name, email, phone }];
    this.setState({ users, error: '' });

    this.refs.name.value = '';
    this.refs.email.value = '';
    this.refs.phone.value = '';
  };

  handleInput = () => {
    const name = this.refs.name.value;
    const email = this.refs.email.value;
    const phone = this.refs.phone.value;

    this.setState({
      isNameValid: this.validateName(name),
      isEmailValid: this.validateEmail(email),
      isPhoneValid: this.validatePhone(phone)
    });
  };

  render() {
    const { error, isNameValid, isEmailValid, isPhoneValid } = this.state;

    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form
          onSubmit={this.onFormSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}
        >
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            ref="name"
            onInput={this.handleInput}
            style={{ borderColor: isNameValid ? 'initial' : 'red' }}
          />
          {!isNameValid && <span style={{ color: 'red' }}>Name is required.</span>}

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            ref="email"
            onInput={this.handleInput}
            style={{ borderColor: isEmailValid ? 'initial' : 'red' }}
          />
          {!isEmailValid && <span style={{ color: 'red' }}>Enter a valid email.</span>}

          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            ref="phone"
            onInput={this.handleInput}
            style={{ borderColor: isPhoneValid ? 'initial' : 'red' }}
          />
          {!isPhoneValid && <span style={{ color: 'red' }}>Enter a valid 10-digit phone number.</span>}

          <button type="submit">Add</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>

        <div>
          <h3>Users</h3>
          <ul>
            {this.state.users.map((user, i) => (
              <li key={i}>
                {user.name} - {user.email} - {user.phone}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default BasicForm;
