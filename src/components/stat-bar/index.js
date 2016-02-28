import React from 'react-native';
import _ from 'lodash';
import moment from 'moment';

import Icon from 'react-native-vector-icons/MaterialIcons';

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
  TouchableOpacity,
} = React;

import RNChart from 'react-native-chart';

class StatBar extends React.Component{

  static propTypes = {
    timestamp: PropTypes.number.isRequired,
    sentiment: PropTypes.number.isRequired,
    loading: PropTypes.bool,
    isEdit: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.stats}>
        <View style={styles.timeContainer}>
          <Text style={styles.timestamp}>
            {moment(this.props.timestamp).format("MMM. D, YYYY @ h:mm a").toUpperCase()}
          </Text>
        </View>
        {this.props.isEdit ? this._renderRefresh() : this._renderChat()}
      </View>
    );
  }

  _renderRefresh() {
    return (
      <View style={styles.chartContainer}>
        <TouchableOpacity
          style={styles.refresh}
        >
          <Icon
            name={'cached'}
            size={40}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }

  _renderChat() {

    let score = Math.round(this.props.sentiment * 100);

    let color = LIGHT_GRAY;
    let compliment = 96 - score;
    let data;
    let sliceColors;

    if (score >= 96) {
      data = [score, 100 - score];
      sliceColors = [YELLOW, WHITE];
      color = YELLOW;
    } else {
      if (score >= 75) {
        color = YELLOW;
      } else if (score < 75 && score >= 50) {
        color = PURPLE;
      } else {
        color = RED;
      }

      data = [score, 2, compliment, 2],
      sliceColors = [color, WHITE, LIGHT_GRAY, WHITE]
    }

    const chartData = [{
      name: 'BarChart',
      type: 'pie',
      data: data,
      sliceColors: sliceColors
    }];

    return (
      <View style={styles.chartContainer}>
        <RNChart 
          style={styles.chart}
          chartData={chartData}
          xLabels={['0','1']}
        />
        <View style={styles.overlay}>
          <Text style={[styles.textOverlay, {
            color: color,
          }]}>
          {score}
          </Text>
        </View>
      </View>
    );
  }
 
}

export default StatBar;