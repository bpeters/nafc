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
    justifyContent: 'center',
    alignItems: 'center',
  },
  stats: {
    top: Y_OFFSET,
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
    fontSize: 16,
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