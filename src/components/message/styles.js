import React from 'react-native';

import {
  WHITE,
  BLACK,
  Y_OFFSET,
  X_OFFSET,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  LIGHT_GRAY,
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
  replacementContainer: {
    top: 200,
    left: X_OFFSET * 2,
    position: 'absolute',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  replacement: {
    padding: 8,
    width: SCREEN_WIDTH - (X_OFFSET * 4),
    marginBottom: 1,
  },
  replacementText: {
    fontSize: 26,
    fontFamily: 'AvenirNext-Regular',
    color: WHITE,
    textAlign: 'center',
  },
  replacementScrollView: {
    height: 160,
  },
  deleteContainer: {
    top: 200,
    left: X_OFFSET * 2,
    position: 'absolute',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  deleteTitle: {
    padding: 16,
    width: SCREEN_WIDTH - (X_OFFSET * 4),
    backgroundColor: WHITE,
    borderColor: LIGHT_GRAY,
    borderWidth: 1,
  },
  deleteButtons: {
    width: SCREEN_WIDTH - (X_OFFSET * 4),
    flexDirection: 'row',
  },
  deleteButton: {
    width: (SCREEN_WIDTH - (X_OFFSET * 4)) / 2,
    padding: 8,
    borderColor: LIGHT_GRAY,
    borderWidth: 1,
  },
  deleteText: {
    fontSize: 26,
    fontFamily: 'AvenirNext-Regular',
    color: BLACK,
    textAlign: 'center',
  },
});

export default Styles;