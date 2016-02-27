import React from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import RNChart from 'react-native-chart';

import {
  newMessage,
  updateMessage,
} from '../../actions/app';

import {
  INPUT_DEFAULT
} from '../../constants/strings';

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

const chartData = [
  {
    type: 'pie',
    data: [75,25],
    sliceColors: ['red', 'white']
  }
];

const xLabels = ['0','1'];

class Message extends React.Component{

  static propTypes = {
    message: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: this.props.message.text,
      isEdit: true,
      sentiment: null,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.stats}>
        <View style={styles.timeContainer}>
          <Text style={styles.timestamp}>
            Feb. 23, 2016 @ 12:01 PM
          </Text>
        </View>
          <View style={styles.chartContainer}>
            <RNChart 
              style={styles.chart}
              chartData={chartData}
             />
             <View style={styles.overlay}>
             </View>
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
        {!this.state.isEdit && this.state.text ? this._renderButtons() : null}
      </View>
    );
  }

  _renderTextInput() {
    return (
      <TextInput
        style={styles.textInput}
        placeholder={INPUT_DEFAULT}
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
        <View style={styles.button}>
          <TouchableOpacity
            onPress={this._onEdit.bind(this)}
          >
            <Text style={styles.buttonText}>
              EDIT
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={this._onSend.bind(this)}
          >
            <Text style={styles.buttonText}>
              SEND
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={this._onNew.bind(this)}
          >
            <Text style={styles.buttonText}>
              NEW
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _onEdit() {
    this.setState({
      isEdit: true
    });
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
      isEdit: false
    });

    if (this.state.text) {
      this.props.dispatch(
        updateMessage(this.props.message.key, this.state.text)
      );
    }
  }

  _onChangeText(text) {
    this.setState({
      text: text
    });
  }

}

function select(state) {
  return {};
}

export default connect(select)(Message);