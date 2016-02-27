import React from 'react-native';

import {
  WHITE,
  BLACK,
  Y_OFFSET,
  X_OFFSET,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  YELLOW,
} from '../../theme';

let {
  StyleSheet,
} = React;

let Styles = StyleSheet.create({
  stats: {
    height: 60,
    width: SCREEN_WIDTH - (X_OFFSET * 2),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  timeContainer : {
    flex: 2,
    justifyContent: 'center',
  },
  timestamp: {
    color: 'gray',
    fontSize: 12,
    fontFamily: 'AvenirNext-Regular',
    letterSpacing: 2,
  },
  chartContainer : {
    flex: 1,
    justifyContent: 'center',
  },
  chart: {
    height: 70,
    width: 80,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  overlay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    top: 7,
    right: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOverlay: {
    fontSize: 12,
    color: YELLOW,
    fontFamily: 'AvenirNext-Bold',
  },
});

export default Styles;