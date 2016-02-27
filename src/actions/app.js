import moment from 'moment';
import * as types from '../constants/action-types';
import {
  INDICO_KEY
} from '../config';

export function newMessage() {
  return dispatch => {
    dispatch({
      type: types.NEW_MESSAGE,
    });
  };
}

export function paginateMessages(index) {
  return dispatch => {
    dispatch({
      type: types.PAGINATE_MESSAGES,
      index: index,
    });
  };
}

export function updateMessage(text) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_MESSAGE,
      text: text,
      timestamp: moment.now(),
    });
  };
}

export function analyzeMessage(text) {
  return async dispatch => {

    dispatch({
      type: types.LOADING,
      loading: true,
    });

    try {

      let sentiment = await fetch(`https://apiv2.indico.io/sentimenthq?key=${INDICO_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
          data : text
        }),
      });

      sentiment = JSON.parse(sentiment._bodyText).results;

      let keywords = await fetch(`https://apiv2.indico.io/keywords?key=${INDICO_KEY}&version=2&top_n=8`, {
        method: 'POST',
        body: JSON.stringify({
          data : text
        }),
      });

      keywords = _.map(JSON.parse(keywords._bodyText).results, (value, key) => {
        return key;
      });

      let kewordSentiment = await fetch(`https://apiv2.indico.io/sentimenthq/batch?key=${INDICO_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
          data : keywords
        }),
      });

      kewordSentiment = JSON.parse(kewordSentiment._bodyText).results;

      keywords = _.map(keywords, (keyword, key) => {
        return {
          text: keyword,
          sentiment: kewordSentiment[key],
        };
      });

      dispatch({
        type: types.ANALYZE_MESSAGE,
        sentiment: sentiment,
        keywords: keywords,
      });

      // let thesaurus = await fetch(`http://words.bighugelabs.com/api/2/899ba2d37f3a99c8e40440e13a0c7d8f/${keywords[0]}/json`, {
      //   method: 'GET',
      // });

      // console.log(JSON.parse(thesaurus._bodyText));
    } catch (err) {
      console.log(err);
    }
  };
}

export function isLoading(loading) {
  return dispatch => {
    dispatch({
      type: types.LOADING,
      loading: loading,
    });
  };
}

export function isSuccess(success) {
  return dispatch => {
    dispatch({
      type: types.SUCESS,
      success: success,
    });
  };
}

export function sendError(error) {
  return dispatch => {
    dispatch({
      type: types.ERROR,
      error: error,
    });
  };
}

export function clearError() {
  return dispatch => {
    dispatch({
      type: types.ERROR,
      clear: true,
    });
  };
}