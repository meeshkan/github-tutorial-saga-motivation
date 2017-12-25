import axios from 'axios';

import {
  put,
  race,
  take,
  call,
  takeEvery
} from 'redux-saga/effects';

export const getNumberFromRandomORG = "https://www.random.org/integers/?num=1&min=1&max=3&format=plain&col=1&base=10"

export const GET_RANDOM_NUMBER = 'GET_RANDOM_NUMBER';
export const ADD_SUB_MULT_DIV_ASYNC = 'ADD_SUB_MULT_DIV_ASYNC';
export const ADD_SUB_MULT_DIV_ASYNC_SUCCESS = 'ADD_SUB_MULT_DIV_ASYNC_SUCCESS';
export const ADD_SUB_MULT_DIV_ASYNC_FAILURE = 'ADD_SUB_MULT_DIV_ASYNC_FAILURE';

export const addSubMultDivAsync = (a, mult) => ({
  type: ADD_SUB_MULT_DIV_ASYNC,
  payload: {
    a,
    mult
  }
});

export const getRandomNumber = payload => ({
  type: GET_RANDOM_NUMBER,
  payload
});

export const addSubMultDivAsyncSuccess = payload => ({
  type: ADD_SUB_MULT_DIV_ASYNC_SUCCESS,
  payload
});

export const addSubMultDivAsyncFailure = error => ({
  type: ADD_SUB_MULT_DIV_ASYNC_FAILURE,
  error
});

export function* getRandomNumberSideEffect(action) {
  const {
    payload
  } = action;
  try {
    const result = yield call(axios, getNumberFromRandomORG);
    yield put({
      type: `${payload}Success`,
      payload: parseInt(result.data)
    });
  } catch(error) {
    yield put({
      type: `${payload}Failure`,
      error
    });
  }
}

export function* addSubMultDivAsyncSideEffect(action) {
  const {
    a,
    mult
  } = action.payload;
  try {
    yield put(getRandomNumber('add'));
    yield put(getRandomNumber('sub'));
    yield put(getRandomNumber('div'));
    let res = {};
    let i = 0;
    for (; i < 3; i++) {
      const fromApi = yield race({
        add: take('addSuccess'),
        sub: take('subSuccess'),
        div: take('divSuccess'),
        addFailure: take('addFailure'),
        subFailure: take('subFailure'),
        divFailure: take('divFailure'),
      });
      const {
        addFailure,
        subFailure,
        divFailure
      } = fromApi;
      const error = addFailure || subFailure || divFailure;
      if (error) {
        throw error.error;
      }
      res = {
        ...res,
        ...Object.entries(fromApi).map(x => [x[0], x[1].payload]).reduce((a, b) => ({
          ...a,
          ...{[b[0]] : b[1]}
        }), {})
      }
    }
    const {
      add,
      sub,
      div
    } = res;
    yield(put(addSubMultDivAsyncSuccess((a + add - sub) * mult / div)));
  } catch (e) {
    yield(put(addSubMultDivAsyncFailure(e)));
  }
}

export default function*() {
  yield takeEvery(GET_RANDOM_NUMBER, getRandomNumberSideEffect);
  yield takeEvery(ADD_SUB_MULT_DIV_ASYNC, addSubMultDivAsyncSideEffect);
}