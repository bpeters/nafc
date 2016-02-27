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

    this.state = {
      editable: true,
    };
  }

  render() {
    let messages = _.map(this.props.messages, (message, key) => {
      return (
        <MessageComponent
          key={key}
          message={message}
          editable={this.state.editable}
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
        onScrollBeginDrag={this._onScrollBeginDrag.bind(this)}
        onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
      >
        {messages}
      </Swiper>
    );
  }

  _onScrollBeginDrag(e, state, context) {
    this.setState({
      editable: false,
    });
  }

  _onMomentumScrollEnd(e, state, context) {
    this.props.dispatch(paginateMessages(state.index));
    this.setState({
      editable: true,
    });
  }

}

function select(state) {
  return {
    index: state.app.index,
    messages: state.app.messages,
  };
}

export default connect(select)(Message);