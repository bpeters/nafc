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
	onboardingScreen: {
		flex: 1,
	},
	swiper: {
		flex: 1,
	},
	container: {
    position: 'absolute',
    top: 30,
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
   icon: {
    color: BLACK,
  },
});

export default Styles;