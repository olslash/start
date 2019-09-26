import { ThunkAction } from 'redux-thunk';
import { FetchingStatus } from 'start/types';
import { GlobalState } from './globalState';

const FETCH_FILE = 'Fetch a remote file';
const FETCH_FILE_SUCCESS = 'Successfully fetched a remote file';
const FETCH_FILE_FAILURE = 'Failed to fetch a remote file';

export interface State {
  fileDataByContentUrl: { [url: string]: string };
  fileFetchingStatusByContentUrl: { [url: string]: FetchingStatus };
}

const initialState: State = {
  fileDataByContentUrl: {},
  fileFetchingStatusByContentUrl: {}
};

type Action = ReturnType<
  typeof fetchRequest | typeof fetchSuccess | typeof fetchFailure
>;

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case FETCH_FILE: {
      return {
        ...state,

        fileFetchingStatusByContentUrl: {
          ...state.fileFetchingStatusByContentUrl,
          [action.meta.contentUrl]: FetchingStatus.Fetching
        }
      };
    }

    case FETCH_FILE_SUCCESS: {
      return {
        ...state,

        fileFetchingStatusByContentUrl: {
          ...state.fileFetchingStatusByContentUrl,
          [action.meta.contentUrl]: FetchingStatus.Success
        },

        fileDataByContentUrl: {
          ...state.fileDataByContentUrl,
          [action.meta.contentUrl]: action.payload.fileData
        }
      };
    }

    case FETCH_FILE_FAILURE: {
      return {
        ...state,

        fileFetchingStatusByContentUrl: {
          ...state.fileFetchingStatusByContentUrl,
          [action.meta.contentUrl]: FetchingStatus.Failure
        }
      };
    }

    default:
      return state;
  }
}

function local(state: GlobalState): State {
  return state.remoteFile;
}

export const fetchTextFile = (
  contentUrl: string
): ThunkAction<
  Promise<any>,
  GlobalState,
  null,
  ReturnType<typeof fetchRequest | typeof fetchSuccess | typeof fetchFailure>
> => {
  return async function(dispatch) {
    dispatch(fetchRequest(contentUrl));

    let fileData;

    try {
      const response = await fetch(contentUrl);
      fileData = await response.text();
    } catch (e) {
      dispatch(fetchFailure(contentUrl));
      return;
    }

    dispatch(fetchSuccess(contentUrl, fileData));
  };
};

function fetchRequest(contentUrl: string) {
  return <const>{
    type: FETCH_FILE,
    meta: { contentUrl }
  };
}

function fetchSuccess(contentUrl: string, fileData: string) {
  return <const>{
    type: FETCH_FILE_SUCCESS,
    meta: { contentUrl },
    payload: { fileData }
  };
}

function fetchFailure(contentUrl: string) {
  return <const>{
    type: FETCH_FILE_FAILURE,
    meta: { contentUrl }
  };
}

export function fileData(state: GlobalState, contentUrl: string) {
  return local(state).fileDataByContentUrl[contentUrl];
}

export function fileDataFetchingStatus(
  state: GlobalState,
  contentUrl: string
): FetchingStatus {
  return (
    local(state).fileFetchingStatusByContentUrl[contentUrl] ||
    FetchingStatus.Default
  );
}
