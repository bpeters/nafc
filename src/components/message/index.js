import React from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import StatBarComponent from '../../components/stat-bar';
import WordsComponent from '../../components/words';

import {
  INPUT_DEFAULT
} from '../../constants/strings';

import {
  newMessage,
  updateMessage,
  analyzeMessage,
} from '../../actions/app';

import styles from './styles.js';

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

class Message extends React.Component{

  static propTypes = {
    message: PropTypes.object.isRequired,
    index: PropTypes.number,
    editable: PropTypes.bool,
    loading: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      isEdit: false,
    };
  }

  componentDidMount() {
    if (this._textInput) {
      this._textInput.focus();
    }
  }

  render() {
    let message = this.props.message;

    return (
      <View style={styles.container}>
        <StatBarComponent 
          timestamp={message.timestamp}
          sentiment={message.sentiment}
          loading={this.props.loading}
        />
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps={false}
          keyboardDismissMode='interactive'
          onKeyboardWillHide={this._onKeyboardWillHide.bind(this)}
          onKeyboardWillShow={this._onKeyboardWillShow.bind(this)}
        >
          {this.state.isEdit || (!this.state.isEdit && !message.text) ? this._renderTextInput(message.text) : this._renderText(message)}
        </ScrollView>
        {!this.state.isEdit && message.text && !this.props.loading ? this._renderButtons() : null}
      </View>
    );
  }

  _renderTextInput(text) {
    return (
      <TextInput
        ref={(textInput) => this._textInput = textInput}
        style={styles.textInput}
        placeholder={INPUT_DEFAULT}
        onChangeText={this._onChangeText.bind(this)}
        value={text}
        autoFocus={false}
        returnKeyType='default'
        blurOnSubmit={false}
        autoCorrect={true}
        multiline={true}
        placeholderTextColor={GRAY}
        editable={this.props.editable}
      />
    );
  }

  _renderText(message) {
    return (
      <WordsComponent message={message} />
    );
  }

  _renderButtons() {
    return (
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={this._onEdit.bind(this)}
          >
            <Text style={styles.buttonText}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={this._onSend.bind(this)}
          >
            <Text style={styles.buttonText}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={this._onNew.bind(this)}
          >
            <Text style={styles.buttonText}>
              New
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _onChangeText(text) {
    this.props.dispatch(
      updateMessage(text)
    );
  }

  _onEdit() {
    this.setState({
      isEdit: true
    });

    this._textInput.focus();
  }

  _onSend() {
    console.log('send');
  }

  _onNew() {
    this.props.dispatch(newMessage());
  }

  _onKeyboardWillShow() {
    this.setState({
      isEdit: true
    });
  }

  _onKeyboardWillHide() {
    this.setState({
      isEdit: false,
    });

    if (this.props.message.text && this.props.message.index === this.props.index) {
      this.props.dispatch(analyzeMessage(this.props.message.text));
    }
  }
}

export default connect()(Message);