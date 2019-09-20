import { createReducer } from '../helpers';
import fetchingStatus from '../helpers/fetchingStatus';

const FETCH_FILE = 'Fetch a remote file';
const FETCH_FILE_SUCCESS = 'Successfully fetched a remote file';
const FETCH_FILE_FAILURE = 'Failed to fetch a remote file';

export const reducer = createReducer(
  {
    fileDataByContentUrl: {},
    fileFetchingStatusByContentUrl: {}
  },
  {
    [FETCH_FILE](state, action) {
      return {
        ...state,

        fileFetchingStatusByContentUrl: {
          ...state.fileFetchingStatusByContentUrl,
          [action.meta.contentUrl]: fetchingStatus.fetching
        }
      };
    },
    [FETCH_FILE_SUCCESS](state, action) {
      return {
        ...state,

        fileFetchingStatusByContentUrl: {
          ...state.fileFetchingStatusByContentUrl,
          [action.meta.contentUrl]: fetchingStatus.success
        },

        fileDataByContentUrl: {
          ...state.fileDataByContentUrl,
          [action.meta.contentUrl]: action.payload.fileData
        }
      };
    },
    [FETCH_FILE_FAILURE](state, action) {
      return {
        ...state,

        fileFetchingStatusByContentUrl: {
          ...state.fileFetchingStatusByContentUrl,
          [action.meta.contentUrl]: fetchingStatus.failure
        }
      };
    }
  }
);

function local(state) {
  return state.remoteFile;
}

export function fetchTextFile(contentUrl) {
  return async function(dispatch) {
    dispatch({
      type: FETCH_FILE,
      meta: { contentUrl }
    });

    let fileData;

    try {
      const response = await fetch(contentUrl);
      fileData = await response.text();
    } catch (e) {
      return dispatch({
        type: FETCH_FILE_FAILURE,
        meta: { contentUrl }
      });
    }

    dispatch({
      type: FETCH_FILE_SUCCESS,
      meta: { contentUrl },
      payload: { fileData }
    });
  };
}

export function fileData(state, contentUrl) {
  return local(state).fileDataByContentUrl[contentUrl];
}

export function fileDataFetchingStatus(state, contentUrl) {
  return (
    local(state).fileFetchingStatusByContentUrl[contentUrl] ||
    fetchingStatus.default
  );
}
