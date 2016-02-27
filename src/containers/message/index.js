import React from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Swiper from 'react-native-swiper'

import MessageComponent from '../../components/message';

import {
  paginateMessages,
} from '../../actions/app';

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
    let messages = _.map(this.props.messages, (message, key) => {
      return (
        <MessageComponent
          key={key}
          message={message}
        />
      );
    });

    return (
      <Swiper
        index={this.props.index}
        loop={false}
        showsButtons={false}
        showsPagination={false}
        autoplay={false}
        autoplayDirection={false}
        onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
      >
        {messages}
      </Swiper>
    );
  }

  _onMomentumScrollEnd(e, state, context) {
    console.log(state);
    this.props.dispatch(paginateMessages(state.index));
  }

}

function select(state) {
  return {
    index: state.app.index,
    messages: state.app.messages,
  };
}

export default connect(select)(Message);