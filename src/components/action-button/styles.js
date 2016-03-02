import React from 'react-native';

import {
  BLACK,
  WHITE,
} from '../../theme';

let {
  StyleSheet,
} = React;

let Styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  mainButton: {
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: WHITE,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 66,
    right: 8,
  },
  button: {
    position: 'relative',
    height: 40,
    width: 40,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5,
    marginBottom: 10,
  },
  icon: {
    color: BLACK,
  },
});

export default Styles;