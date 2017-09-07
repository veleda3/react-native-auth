import React, {Component} from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { LoggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
        apiKey: 'AIzaSyAbvANJSojS36AyGeiJKLNW0qmHjcyQkCA',
        authDomain: 'auth-7a524.firebaseapp.com',
        databaseURL: 'https://auth-7a524.firebaseio.com',
        projectId: 'auth-7a524',
        storageBucket: 'auth-7a524.appspot.com',
        messagingSenderId: '554162678794'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ LoggedIn: true });
      } else {
        this.setState({ LoggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.LoggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
      );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large' />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
