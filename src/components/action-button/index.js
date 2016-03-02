import React from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles.js';

import {
  WHITE,
  BLACK,
} from '../../theme';

let {
  View,
  PropTypes,
  TouchableOpacity,
  Navigator,
} = React;

class ActionButton extends React.Component{

  static propTypes = {
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onSend: PropTypes.func,
    onNew: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._toggleButton()}
          style={styles.mainButton}
        >
          <Icon
            name={this.state.show ? 'more-vert' : 'more-horiz'}
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
        {this.state.show ? this._renderButtons() : null}
      </View>
    );
  }

  _renderButtons() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button,
            {backgroundColor: WHITE}
          ]}
          onPress={this.props.onSend}
        >
          <Icon
            name='send'
            size={24}
            color={BLACK}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button,
            {backgroundColor: WHITE}
          ]}
          onPress={this.props.onNew}
        >
          <Icon
            name='add-circle'
            size={24}
            color={BLACK}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button,
            {backgroundColor: WHITE}
          ]}
          onPress={this.props.onDelete}
        >
          <Icon
            name='delete'
            size={24}
            color={BLACK}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button,
            {backgroundColor: WHITE}
          ]}
          onPress={this.props.onEdit}
        >
          <Icon
            name='edit'
            size={24}
            color={BLACK}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }

  _toggleButton() {
    this.setState({
      show: !this.state.show,
    });
  }
}

export default connect()(ActionButton);