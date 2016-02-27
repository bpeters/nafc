import * as types from '../constants/action-types';
import _ from 'lodash';

import {
  ERROR_DEFAULT
} from '../constants/strings';

const newMessage = {
  text: null,
  didSend: false,
  sentiment: null,
  keywords: null,
};

const initialState = {
  messages: [_.cloneDeep(newMessage)],
  loading: false,
  success: false,
  error: null,
};

export default function app(state = initialState, action) {
  let messages = _.cloneDeep(state.messages);

  switch (action.type) {

    case types.NEW_MESSAGE:

      messages.push(_.cloneDeep(newMessage));

      return Object.assign({}, state, {
        messages: messages,
      });

    case types.UPDATE_MESSAGE:

      messages = _.map(messages, (message, key) => {
        console.log(key === action.message.key);
        if (key === action.message.key) {
          return action.message;
        } else {
          return message;
        }
      });

      console.log(messages);

      return Object.assign({}, state, {
        messages: messages,
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