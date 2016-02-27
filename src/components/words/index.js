import React from 'react-native';
import _ from 'lodash';

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
  Text,
} = React;

import RNChart from 'react-native-chart';

class Words extends React.Component{

  static propTypes = {
    message: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let message = this.props.message;
    let words = message.text.split(/[ \t\r\n]/);

    let text = _.map(words, (word, i) => {
      let match;

      _.forEach(message.keywords, (keyword) => {
        let check = word.split(keyword.text);

        if (check.length > 1 || check === word) {
          match = keyword;
        };
      });

      if (match) {
        let score = Math.round(match.sentiment * 100);

        let highlight = {
          backgroundColor: RED,
        };

        if (score >= 75) {
          highlight.backgroundColor = YELLOW;
        } else if (score < 75 && score >= 50) {
          highlight.backgroundColor = PURPLE;
        }

        return (
          <Text key={i} style={[styles.text, highlight]}>
            {word}
          </Text>
        );
      } else {
        return (
          <Text key={i} style={styles.text}>
            {word}
          </Text>
        );
      }
    });

    return (
      <View style={styles.container}>
        {text}
      </View>
    );
  }

}

export default Words;