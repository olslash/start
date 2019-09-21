import { intervalChan } from '../helpers';
import { call, put, takeEvery } from 'redux-saga/effects';
import { GlobalState } from './globalState';

enum Actions {
  ClockTick = 'CLOCK_TICK'
}

const initialState = {
  currentDate: new Date()
};

export type State = typeof initialState;
type Action = ReturnType<typeof clockTick>;

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case Actions.ClockTick:
      return { ...state, currentDate: action.payload.date };
    default:
      return state;
  }
}

export function* saga() {
  const tick = yield call(intervalChan, 5000);

  yield takeEvery(tick, function*() {
    yield put(clockTick(new Date()));
  });
}

export function clockTick(date: Date) {
  return {
    type: Actions.ClockTick,
    payload: { date }
  };
}

function local(state: GlobalState): State {
  return state.clock;
}

export function currentDate(state: GlobalState) {
  return local(state).currentDate;
}
