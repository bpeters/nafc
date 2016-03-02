import React from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import codePush from "react-native-code-push";

import App from './app';

const store = configureStore();
console.disableYellowBox = true;

class Root extends React.Component {

  componentDidMount() {
    codePush.sync();
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Root;