import * as types from '../constants/action-types';

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
  return async dispatch => {

    try {
      // let sentiment = await fetch('https://apiv2.indico.io/sentimenthq?key=8ca88bff5804bbf9e4aaf511a5c16a32', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     data : text
      //   }),
      // });

      // sentiment = JSON.parse(sentiment._bodyText).results;

      // this.setState({
      //   sentiment: sentiment
      // });

      // let keywords = await fetch('https://apiv2.indico.io/keywords?key=8ca88bff5804bbf9e4aaf511a5c16a32&version=2&top_n=8', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     data : text
      //   }),
      // });

      // keywords = _.map(JSON.parse(keywords._bodyText).results, (value, key) => {
      //   return key;
      // });

      // console.log(sentiment, keywords);

      // let kewordSentiment = await fetch('https://apiv2.indico.io/sentiment/batch?key=8ca88bff5804bbf9e4aaf511a5c16a32', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     data : keywords
      //   }),
      // });

      // kewordSentiment = JSON.parse(kewordSentiment._bodyText).results;

      // console.log(kewordSentiment);

      // let thesaurus = await fetch(`http://words.bighugelabs.com/api/2/899ba2d37f3a99c8e40440e13a0c7d8f/${keywords[0]}/json`, {
      //   method: 'GET',
      // });

      // console.log(JSON.parse(thesaurus._bodyText));

      dispatch({
        type: types.UPDATE_MESSAGE,
        message: {
          text: text,
        },
      });
    } catch (err) {

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