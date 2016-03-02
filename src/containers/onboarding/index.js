import React from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Swiper from 'react-native-swiper';

import OnboardingScreen1 from '../../assets/1-onboard.png';
import OnboardingScreen2 from '../../assets/2-onboard.png';
import OnboardingScreen3 from '../../assets/3-onboard.png';
import OnboardingScreen4 from '../../assets/4-onboard.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MessageContainer from '../../containers/message';

import {
  loadMessages,
  paginateMessages,
} from '../../actions/app';

import {
  MESSAGE,
} from '../../constants/routes';

import {
  ONBOARD_KEY,
} from '../../config';

import styles from './styles.js';

let {
  PropTypes,
  Navigator,
  Image,
  TouchableWithoutFeedback,
  View,
  AsyncStorage,
} = React;

class Onboarding extends React.Component{

  static propTypes = {
    navigator: PropTypes.instanceOf(Navigator).isRequired,
    route: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let images = [OnboardingScreen1, OnboardingScreen2, OnboardingScreen3, OnboardingScreen4];
    let screens = _.map(images, (image, key) => {
      return (
        <TouchableWithoutFeedback 
          onLongPress={() => this._dismissScreen()}
          delayLongPress={500}
          key={key}
        >
          <Image
            style={styles.onboardingScreen}
            source={image}
            index={this.props.index}
          />
        </TouchableWithoutFeedback>
      );
    });

    return (
      <Swiper
        index={this.props.index}
        style={styles.swiper}
        showsButtons={false}
        showsPagination={true}
        autoplay={false}
        autoplayDirection={false}
        loop={false}
        scrollEnabled={true}
        dot={<View style={{backgroundColor:'rgba(0,0,0,.5)', width: 10, height: 10,borderRadius: 5, marginLeft: 7, marginRight: 7, marginTop: 7, marginBottom: 7,}} />}
        activeDot={<View style={{backgroundColor: '#fff', width: 14, height: 14, borderRadius: 7, marginLeft: 7, marginRight: 7, marginTop: 7, marginBottom: 7,}} />}
      >
        {screens}
      </Swiper>
    );
  }

  _dismissScreen() {
    this.props.navigator.replace({
      component: MessageContainer,
      type: MESSAGE,
    });

    AsyncStorage.setItem(ONBOARD_KEY, JSON.stringify(true));
  }
}

function select(state) {
  return {
    index: state.app.index,
    messages: state.app.messages,
    loading: state.app.loading,
  };
}

export default connect(select)(Onboarding);