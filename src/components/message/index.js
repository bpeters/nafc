import React from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { RNMessageComposer } from 'NativeModules';

import StatBarComponent from '../../components/stat-bar';
import WordsComponent from '../../components/words';
import ActionButtonComponent from '../../components/action-button';

import {
  INPUT_DEFAULT
} from '../../constants/strings';

import {
  newMessage,
  updateMessage,
  analyzeMessage,
  removeMessage,
  getReplacements,
  replaceMessage,
} from '../../actions/app';

import styles from './styles.js';

import {
  GRAY,
  WHITE,
  YELLOW,
  LIGHT_GRAY,
  PURPLE,
  RED,
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
      showReplacement: false,
      match: null,
      showDelete: false,
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
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps={false}
          keyboardDismissMode='interactive'
          onKeyboardWillHide={this._onKeyboardWillHide.bind(this)}
          onKeyboardWillShow={this._onKeyboardWillShow.bind(this)}
        >
          <StatBarComponent
            timestamp={message.timestamp}
            sentiment={message.sentiment}
            loading={this.props.loading}
            isEdit={this.state.isEdit}
          />
          {this.state.isEdit || (!this.state.isEdit && !message.text) ? this._renderTextInput(message.text) : this._renderText(message)}
        </ScrollView>
        {this.state.showReplacement ? this._renderReplacement() : null}
        {this.state.showDelete ? this._renderDelete() : null}
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
      <WordsComponent
        message={message}
        onPress={this._onWordPress.bind(this)}
      />
    );
  }

  _renderButtons() {
    return (
      <ActionButtonComponent
        onDelete={this._onSoftDelete.bind(this)}
        onEdit={this._onEdit.bind(this)}
        onSend={this._onSend.bind(this)}
        onNew={this._onNew.bind(this)}
      />
    );
  }

  _renderReplacement() {
    let match = this.state.match;

    let score = Math.round(match.sentiment * 100);

    let highlight = {
      backgroundColor: RED,
    };

    if (score >= 75) {
      highlight.backgroundColor = YELLOW;
    } else if (score < 75 && score >= 50) {
      highlight.backgroundColor = PURPLE;
    }

    let replacements = _.map(this.props.replacements, (replacement, key) => {
      let replacementScore = Math.round(replacement.sentiment * 100);

      let replacementHighlight = {
        backgroundColor: RED,
      };

      if (replacementScore >= 75) {
        replacementHighlight.backgroundColor = YELLOW;
      } else if (replacementScore < 75 && replacementScore >= 50) {
        replacementHighlight.backgroundColor = PURPLE;
      }

      return (
        <TouchableOpacity
          key={key}
          onPress={() => {
            this._onReplacementPress(match, replacement);
          }}
          style={[styles.replacement, replacementHighlight]}
        >
          <Text style={styles.replacementText}>
            {replacement.text}
          </Text>
        </TouchableOpacity>
      );
    });

    let notFound = (
      <TouchableOpacity
        onPress={this._onMatchPress.bind(this)}
        style={[styles.replacement, {backgroundColor: GRAY}]}
      >
        <Text style={styles.replacementText}>
          no alteratives
        </Text>
      </TouchableOpacity>
    );

    let remove = (
      <TouchableOpacity
        onPress={() => {
          this._onReplacementPress(match, {text: ''});
        }}
        style={[styles.replacement, {backgroundColor: GRAY}]}
      >
        <Text style={styles.replacementText}>
          remove word
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={styles.replacementContainer}>
        <TouchableOpacity
          onPress={this._onMatchPress.bind(this)}
          style={[styles.replacement, highlight]}
        >
          <Text style={styles.replacementText}>
            {match.text}
          </Text>
        </TouchableOpacity>
        <ScrollView
          style={styles.replacementScrollView}
        >
          {!_.isEmpty(this.props.replacements) || this.props.loading ? replacements : notFound}
        </ScrollView>
        {!_.isEmpty(this.props.replacements) || !this.props.loading ? remove : null}
      </View>
    );
  }

  _renderDelete() {
    return (
      <View style={styles.deleteContainer}>
        <View style={styles.deleteTitle}>
          <Text style={styles.deleteText}>
            delete message?
          </Text>
        </View>
        <View style={styles.deleteButtons}>
          <TouchableOpacity
            onPress={this._onSoftDelete.bind(this)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteText}>
              no
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._onDelete.bind(this)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteText}>
              yes
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

  _onDelete() {
    this.props.dispatch(removeMessage());
    this.setState({
      showDelete: !this.state.showDelete,
    });
  }

  _onSoftDelete() {
    this.setState({
      showDelete: !this.state.showDelete,
    });
  }

  _onEdit() {
    this.setState({
      isEdit: true
    });

    this._textInput.focus();
  }

  _onSend() {
    RNMessageComposer.composeMessageWithArgs(
      {
        'messageText': this.props.message.text,
      },
      (result) => {
        switch(result) {
          case RNMessageComposer.Sent:
            console.log('the message has been sent');
            break;
          case RNMessageComposer.Cancelled:
            console.log('user cancelled sending the message');
            break;
          case RNMessageComposer.Failed:
            console.log('failed to send the message');
            break;
          case RNMessageComposer.NotSupported:
            console.log('this device does not support sending texts');
            break;
          default:
            console.log('something unexpected happened');
            break;
        }
      }
    );
  }

  _onNew() {
    this.props.dispatch(newMessage());
  }

  _onWordPress(match) {
    this.props.dispatch(getReplacements(match.text));

    this.setState({
      showReplacement: true,
      match: match,
    });
  }

  _onMatchPress() {
    this.setState({
      showReplacement: false,
      match: null,
    });
  }

  _onReplacementPress(match, replacement) {

    let text = this.props.message.text;

    let message = text.split(/[ \t\r\n]/);
    message = _.map(message, (word) => {
      let check = word.split(match.text);

      if (check.length > 1 || check === match.text) {
        return (check[0] || '') + replacement.text + (check[1] || '');
      } else {
        return word;
      }
    }).join(' ');

    this.props.dispatch(replaceMessage(message));
    this.props.dispatch(analyzeMessage(message));

    this.setState({
      showReplacement: false,
      match: null,
    });
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

    console.log(this.props.message.text, this.props.message.index === this.props.index);

    if (this.props.message.text && this.props.message.index === this.props.index) {
      this.props.dispatch(analyzeMessage(this.props.message.text));
    }
  }
}

function select(state) {
  return {
    replacements: state.app.replacements,
  };
}

export default connect(select)(Message);
