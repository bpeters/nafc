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
  scrollView: {
    top: Y_OFFSET,
    left: X_OFFSET,
  },
  textInput: {
    fontSize: 26,
    fontFamily: 'AvenirNext-Regular',
    lineHeight: 36,
    height: SCREEN_HEIGHT - 320,
    width: SCREEN_WIDTH - (X_OFFSET * 2),
    color: BLACK,
  },
  textContainer: {
    width: SCREEN_WIDTH - (X_OFFSET * 2),
    paddingTop: 5,
  },
  text: {
    color: BLACK,
    fontSize: 26,
    fontFamily: 'AvenirNext-Regular',
    lineHeight: 36,
  },
  buttonContainer: {
    height: 60,
    paddingTop: 1,
    width: SCREEN_WIDTH - (X_OFFSET * 2),
    left: X_OFFSET,
    marginBottom: Y_OFFSET,
    marginTop: Y_OFFSET,
    flexDirection: 'row',
  },
  button: {
    marginTop: Y_OFFSET,
    marginRight: 40,
  },
  buttonText: {
    fontSize: 12,
    letterSpacing: 2,
    fontFamily: 'AvenirNext-Medium',
  },
});

export default Styles;