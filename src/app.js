import React from 'react-native';
import { connect } from 'react-redux';

import MessageContainer from './containers/message';
import OnboardingContainer from './containers/onboarding';

import {
  MESSAGE,
  ONBOARDING,
} from './constants/routes';

import {
  ONBOARD_KEY,
} from './config';

import Theme from './theme';

let {
  Navigator,
  Text,
  View,
  Alert,
  AsyncStorage,
} = React;

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      didLoad: false,
      isOnboarded: false,
    };
  }

  componentWillMount() {
    AsyncStorage.getItem(ONBOARD_KEY)
      .then((item) => {

        this.setState({
          didLoad: true,
          isOnboarded: JSON.parse(item)
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.props.app.error) {
      Alert.alert(this.props.app.error);
    }

    if (this.state.didLoad) {

      let initialRoute = MessageContainer;
      let type = MESSAGE;

      if (!this.state.isOnboarded) {
        initialRoute = OnboardingContainer;
        type = ONBOARDING;
      }

      return (
        <Navigator
          configureScene={this._configureScene}
          renderScene={this._renderScene}
          initialRoute={{
            component: initialRoute,
            type: type,
          }}
        />
      );
    } else {
      return null;
    }
  }

  _renderScene(route, navigator) {
    const Component = route.component;

    return (
      <Component
        navigator={navigator}
        route={route}
      />
    );
  }

  _configureScene(route) {
    switch (route.type) {
      default:
        return Navigator.SceneConfigs.FloatFromRight;
    }
  }
}

function select(state) {
  return {
    app: state.app,
  };
}

export default connect(select)(App);