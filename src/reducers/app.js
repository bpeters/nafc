import * as types from '../constants/action-types';

import {
  ERROR_DEFAULT
} from '../constants/strings';

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export default function app(state = initialState, action) {
  switch (action.type) {

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