import React from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

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

class StatBar extends React.Component{

  static propTypes = {
    timestamp: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let color = LIGHT_GRAY;
    let compliment = 96 - this.props.score;
    let data;
    let sliceColors;

    if(this.props.score >= 96) {
      data = [this.props.score, 100 - this.props.score];
      sliceColors = [YELLOW, WHITE];
      color = YELLOW;
    } else {
      if(this.props.score >= 75) {
        color = YELLOW;
      } else if (this.props.score < 75 && this.props.score >= 50) {
        color = PURPLE;
      }  else {
        color = RED;
      }
      data = [this.props.score, 2, compliment, 2],
      sliceColors = [color, WHITE, LIGHT_GRAY, WHITE]
    }
    

    const chartData = [{
      name: 'BarChart',
      type: 'pie',
      data: data,
      sliceColors: sliceColors
    }];

    return (
      <View style={styles.stats}>
        <View style={styles.timeContainer}>
          <Text style={styles.timestamp}>
            {moment(this.props.timestamp).format("MMM. D, YYYY @ h:mm a")}
          </Text>
        </View>
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
              {this.props.score}
             </Text>
           </View>
        </View>
      </View>
    );
  }

}

function select(state) {
  return {};
}

export default connect(select)(StatBar);