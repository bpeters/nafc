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

    console.log(this.props.messages);

    let messages = _.map(this.props.messages, (message, key) => {
      message.key = key;

      return (
        <MessageComponent
          key={key}
          message={message}
        />
      );
    });

    return (
      <Swiper
        showsButtons={false}
      >
        {messages}
      </Swiper>
    );
  }

}

function select(state) {
  return {
    messages: state.app.messages,
  };
}

export default connect(select)(Message);