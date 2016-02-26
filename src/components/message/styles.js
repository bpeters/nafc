import React from 'react-native';

import {
  WHITE,
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
    flex: 1,
    backgroundColor: WHITE,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  stats: {
    top: Y_OFFSET,
    left: X_OFFSET,
    height: 60,
    width: SCREEN_WIDTH - (X_OFFSET * 2),
  },
  chart: {
    height: 60,
    width: 60,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    transform: [
      {scaleX: 2}
    ]
  },
  triangle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red'
  },
  scrollView: {
    top: Y_OFFSET,
    left: X_OFFSET,
  },
  textInput: {
    fontSize: 26,
    height: SCREEN_HEIGHT - 320,
    width: SCREEN_WIDTH - (X_OFFSET * 2),
    color: BLACK,
  },
  textContainer: {
    width: SCREEN_WIDTH - (X_OFFSET * 2),
  },
  text: {
    fontSize: 26,
    color: BLACK,
  },
  buttonContainer: {
    height: 20,
    paddingTop: 1,
    width: SCREEN_WIDTH - (X_OFFSET * 2),
    left: X_OFFSET,
    marginBottom: Y_OFFSET,
    marginTop: Y_OFFSET,
  },
  button: {
    fontSize: 18,
  },
});

export default Styles;