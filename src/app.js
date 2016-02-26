import React from 'react-native';
import { connect } from 'react-redux';

import MessageContainer from './containers/message';

import {
  MESSAGE,
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

    return (
      <Navigator
        configureScene={this._configureScene}
        renderScene={this._renderScene}
        initialRoute={{
          component: MessageContainer,
          type: MESSAGE,
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