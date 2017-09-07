import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Input, Spinner } from './common';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  onBottonPress() {
    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(this.onLoginSuccess.bind(this))
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFailed.bind(this));
    });
  }

  onLoginFailed() {
    this.setState({
      loading: false,
      error: 'Authentication failed.'
    });
  }
  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    })
  }

  renderButton() {
    if (this.state.loading) {
      return (<Spinner size="small" />);
    }

    return (
      <Button onPress={this.onBottonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  render() {
      return (
        <Card>
          <CardSection>
            <Input
              style={{ height: 20, width: 350 }}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              editable
              label="Email"
              placeholder="user@gmail.com"
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              placeholder="password"
              label="password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </CardSection>
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>
          <CardSection>
            {this.renderButton()}
          </CardSection>

        </Card>
      );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}
export default LoginForm;
