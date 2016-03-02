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
    width: SCREEN_WIDTH,
  },
  swiper: {
    flex: 1,
  },
});

export default Styles;