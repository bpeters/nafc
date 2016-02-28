import React from 'react-native';
import { connect } from 'react-redux';

import MessageContainer from './containers/message';
import OnboardingContainer from './containers/onboarding';

import {
  MESSAGE,
  ONBOARDING,
} from './constants/routes';

import Theme from './theme';

let {
  Navigator,
  Text,
  View,
  Alert,
} = React;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.app.error) {
      Alert.alert(this.props.app.error);
    }

    let initialRoute = MessageContainer;
    let type = MESSAGE;

    if(initialRoute) {
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