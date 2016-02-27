import React from 'react-native';

import {
  BLACK,
  Y_OFFSET,
  X_OFFSET,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../theme';

let {
  StyleSheet,
} = React;

let Styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - (X_OFFSET * 2),
    paddingTop: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    color: BLACK,
    fontSize: 26,
    fontFamily: 'AvenirNext-Regular',
    lineHeight: 36,
    margin: 3,
  },
});

export default Styles;