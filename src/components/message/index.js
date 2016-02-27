import React from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import styles from './styles.js';

import StatBar from '../stat-bar';

import {
  GRAY,
  WHITE,
  YELLOW,
  LIGHT_GRAY,
} from '../../theme';

let {
  View,
  PropTypes,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
} = React;


const TIMESTAMP = 'FEB. 23, 2016 @ 12:06 PM';
const SCORE = 65;


class Message extends React.Component{

  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
      sentiment: null,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <StatBar 
        	timestamp={TIMESTAMP}
        	score={SCORE}
        />
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps={false}
          keyboardDismissMode='interactive'
          onKeyboardWillHide={this._onKeyboardWillHide.bind(this)}
          onKeyboardWillShow={this._onKeyboardWillShow.bind(this)}
        >
          {this.state.isEdit || (!this.state.isEdit && !this.props.message.text) ? this._renderTextInput() : this._renderText()}
        </ScrollView>
        {!this.state.isEdit && this.props.message.text ? this._renderButtons() : null}
      </View>
    );
  }

  _renderTextInput() {
    return (
      <TextInput
        style={styles.textInput}
        placeholder={INPUT_DEFAULT}
        onChangeText={this._onChangeText.bind(this)}
        value={this.props.message.text}
        autoFocus={false}
        returnKeyType='default'
        blurOnSubmit={false}
        autoCorrect={true}
        multiline={true}
        placeholderTextColor={GRAY}
      />
    );
  }

  _renderText() {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {this.props.message.text}
        </Text>
      </View>
    );
  }

  _renderButtons() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={this._onEdit.bind(this)}
        >
          <Text style={styles.button}>
            Edit
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onEdit() {
    this.setState({
      isEdit: true
    });
  }

  _onKeyboardWillShow() {
    this.setState({
      isEdit: true
    });
  }

  _onKeyboardWillHide() {
    this.setState({
      isEdit: false
    });
  }

  _onChangeText(text) {
    if (text) {
      this.props.dispatch(
        updateMessage(this.props.message.key, text)
      );
    }
  }
}

function select(state) {
  return {};
}

export default connect(select)(Message);