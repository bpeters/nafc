import React from 'react-native';
import * as types from '../constants/action-types';
import _ from 'lodash';
import moment from 'moment';

import {
  STORAGE_KEY,
} from '../config';

import {
  ERROR_DEFAULT
} from '../constants/strings';

let {
  AsyncStorage,
} = React;

function newMessage(index) {
  return {
    index: index,
    text: null,
    timestamp: moment.now(),
    didSend: false,
    sentiment: 1,
    keywords: null,
  };
};

const initialState = {
  index: 0,
  messages: null,
  loading: false,
  success: false,
  error: null,
};

export default function app(state = initialState, action) {
  let messages = _.cloneDeep(state.messages);

  switch (action.type) {

    case types.LOAD_MESSAGES:

      let initialMessages = action.messages || [newMessage(0)];
      let initialIndex = action.messages ? action.messages.length - 1 : state.index;

      return Object.assign({}, state, {
        messages: initialMessages,
        index: initialIndex,
      });

    case types.NEW_MESSAGE:
      let index = messages.length;

      messages.push(newMessage(index));

      return Object.assign({}, state, {
        messages: messages,
        index: index,
      });

    case types.UPDATE_MESSAGE:

      messages[state.index].text = action.text;
      messages[state.index].timestamp = action.timestamp;

      return Object.assign({}, state, {
        messages: messages,
      });

    case types.ANALYZE_MESSAGE:

      messages[state.index].sentiment = action.sentiment;
      messages[state.index].keywords = action.keywords;

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages));

      return Object.assign({}, state, {
        messages: messages,
        loading: false,
      });

    case types.REMOVE_MESSAGE:

      _.forEach(messages, (message) => {
        if (message.index > state.index) {
          message.index = message.index - 1;
        }
      });

      messages.splice(state.index, 1);

      if (!messages.length) {
        messages = [newMessage(0)]
      }

      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages));

      return Object.assign({}, state, {
        messages: messages,
        index: (state.index === 0) ? 0 : state.index - 1,
      });

    case types.PAGINATE_MESSAGES:
      return Object.assign({}, state, {
        index: action.index,
      });

    case types.LOADING:
      return Object.assign({}, state, {
        loading: action.loading,
      });

    case types.SUCCESS:
      return Object.assign({}, state, {
        success: action.success,
      });

    case types.ERROR:
      return Object.assign({}, state, {
        error: !action.clear ? (action.error || ERROR_DEFAULT) : null,
      });

    default:
      return state;
  }
}