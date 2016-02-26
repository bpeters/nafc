import React from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import styles from './styles.js';

import {
  GRAY,
  WHITE,
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

  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      text: null,
      isEdit: true,
      sentiment: null,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.stats}>
          <View style={styles.circle}>
          </View>

        </View>
        <ScrollView
          ref={(scrollView) => { this._scrollView = scrollView; }}
          style={styles.scrollView}
          keyboardShouldPersistTaps={false}
          keyboardDismissMode='interactive'
          onKeyboardWillHide={this._onKeyboardWillHide.bind(this)}
          onKeyboardWillShow={this._onKeyboardWillShow.bind(this)}
        >
          {this.state.isEdit || (!this.state.isEdit && !this.state.text) ? this._renderTextInput() : this._renderText()}
        </ScrollView>
        {!this.state.isEdit ? this._renderButtons() : null}
      </View>
    );
  }

  _renderTextInput() {
    return (
      <TextInput
        style={styles.textInput}
        placeholder='Write something...'
        ref='textInput'
        onChangeText={this._onChangeText.bind(this)}
        value={this.state.text}
        autoFocus={true}
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
          {this.state.text}
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

    if (this.state.text) {
      this._getSentiment(this.state.text);
    }
  }

  _onChangeText(text) {
    this.setState({
      text: text
    });
  }

  async _getSentiment(text) {

    try {
      let sentiment = await fetch('https://apiv2.indico.io/sentimenthq?key=8ca88bff5804bbf9e4aaf511a5c16a32', {
        method: 'POST',
        body: JSON.stringify({
          data : text
        }),
      });

      sentiment = JSON.parse(sentiment._bodyText).results;

      this.setState({
        sentiment: sentiment
      });

      let keywords = await fetch('https://apiv2.indico.io/keywords?key=8ca88bff5804bbf9e4aaf511a5c16a32&version=2&top_n=8', {
        method: 'POST',
        body: JSON.stringify({
          data : text
        }),
      });

      keywords = _.map(JSON.parse(keywords._bodyText).results, (value, key) => {
        return key;
      });

      console.log(sentiment, keywords);

      let kewordSentiment = await fetch('https://apiv2.indico.io/sentiment/batch?key=8ca88bff5804bbf9e4aaf511a5c16a32', {
        method: 'POST',
        body: JSON.stringify({
          data : keywords
        }),
      });

      kewordSentiment = JSON.parse(kewordSentiment._bodyText).results;

      console.log(kewordSentiment);

      // let thesaurus = await fetch(`http://words.bighugelabs.com/api/2/899ba2d37f3a99c8e40440e13a0c7d8f/${keywords[0]}/json`, {
      //   method: 'GET',
      // });

      // console.log(JSON.parse(thesaurus._bodyText));

    } catch (err) {
      console.log('Error', err);
    }

  }

}

function select(state) {
  return {};
}

export default connect(select)(Message);