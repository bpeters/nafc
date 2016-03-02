import React from 'react-native';
import moment from 'moment';
import * as types from '../constants/action-types';

import {
  INDICO_KEY,
  LABS_KEY,
  STORAGE_KEY,
} from '../config';

let {
  AsyncStorage,
} = React;

export function loadMessages() {
  return async dispatch => {

    try {
      let messages = await AsyncStorage.getItem(STORAGE_KEY);

      messages = JSON.parse(messages);

      dispatch({
        type: types.LOAD_MESSAGES,
        messages: messages,
      });
    } catch (err) {
      console.log(err);
    }

  };
}

export function removeMessage() {
  return dispatch => {
    dispatch({
      type: types.REMOVE_MESSAGE,
    });
  };
}

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

export function replaceMessage(message) {
  return dispatch => {
    dispatch({
      type: types.REPLACE_MESSAGE,
      message: message,
    });
  };
}

export function getReplacements(text) {
  return async dispatch => {

    dispatch({
      type: types.LOADING,
      loading: true,
    });

    dispatch({
      type: types.CLEAR_REPLACEMENTS,
    });

    try {

      let thesaurus = await fetch(`http://words.bighugelabs.com/api/2/${LABS_KEY}/${text}/json`, {
        method: 'GET',
      });

      let words = [];

      if (thesaurus._bodyText) {
        let object = JSON.parse(thesaurus._bodyText);

        let obj = _.forEach(object, (value, key) => {
          let int = _.forEach(value, (v, k) => {
            if (k === 'syn' || k === 'sim') {
              let vals = _.forEach(v, (val, ke) => {
                words.push(val)
              });
            }
          });
        });
      }

      let kewordSentiment = await fetch(`https://apiv2.indico.io/sentimenthq/batch?key=${INDICO_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
          data : words
        }),
      });

      kewordSentiment = JSON.parse(kewordSentiment._bodyText).results;

      let replacements = _.chain(kewordSentiment)
        .map((keyword, key) => {
          return {
            text: words[key],
            sentiment: kewordSentiment[key],
          };
        })
        .uniqBy((word) => {
          return word.text;
        })
        .sortBy((word) => { 
          return word.sentiment; 
        })
        .value()
        .reverse();

      dispatch({
        type: types.GET_REPLACEMENTS,
        replacements: replacements,
      });

    } catch (err) {
      console.log(err);

      dispatch({
        type: types.ERROR,
        err: err,
      });
    }
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

      weights = [];

      keywords = _.map(JSON.parse(keywords._bodyText).results, (value, key) => {
        weights.push(value);
        return key;
      });

      let kewordSentiment = await fetch(`https://apiv2.indico.io/sentimenthq/batch?key=${INDICO_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
          data : keywords
        }),
      });

      kewordSentiment = JSON.parse(kewordSentiment._bodyText).results;

      sentiments = [];

      keywords = _.map(keywords, (keyword, key) => {
        sentiments.push(kewordSentiment[key]);
        return {
          text: keyword,
          sentiment: kewordSentiment[key],
        };
      });

      let average = _.map(weights, (weight, key) => {
        return weight * sentiments[key];
      })

      let score = _.sum(sentiments)/sentiments.length;

      dispatch({
        type: types.ANALYZE_MESSAGE,
        sentiment: score,
        keywords: keywords,
      });

    } catch (err) {
      console.log(err);

      dispatch({
        type: types.ERROR,
        err: err,
      });
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