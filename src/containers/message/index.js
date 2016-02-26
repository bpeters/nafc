import React from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Swiper from 'react-native-swiper'

import MessageComponent from '../../components/message';

import styles from './styles.js';

let {
  PropTypes,
  Navigator,
} = React;

class Message extends React.Component{

  static propTypes = {
    navigator: PropTypes.instanceOf(Navigator).isRequired,
    route: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Swiper
        showsButtons={true}
      >
        <MessageComponent />
        <MessageComponent />
      </Swiper>
    );
  }

}

function select(state) {
  return {};
}

export default connect(select)(Message);