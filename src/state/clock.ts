import { createReducer, intervalChan } from '../helpers';
import { call, put, takeEvery } from 'redux-saga/effects';

const CLOCK_TICK = 'CLOCK_TICK';

export const reducer = createReducer(
  {
    currentDate: new Date()
  },
  {
    [CLOCK_TICK](state, action) {
      return {
        ...state,
        currentDate: action.payload.date
      };
    }
  }
);

export function* saga() {
  const tick = yield call(intervalChan, 5000);

  yield takeEvery(tick, function*() {
    yield put(clockTick(new Date()));
  });
}

export function clockTick(date) {
  return {
    type: CLOCK_TICK,
    payload: { date }
  };
}

function local(state) {
  return state.clock;
}

export function currentDate(state) {
  return local(state).currentDate;
}
