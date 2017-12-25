import addSubMultDivAsyncSaga, {
  getNumberFromRandomORG,
  ADD_SUB_MULT_DIV_ASYNC,
  GET_RANDOM_NUMBER,
  ADD_SUB_MULT_DIV_ASYNC_SUCCESS,
  ADD_SUB_MULT_DIV_ASYNC_FAILURE,
  addSubMultDivAsync,
  getRandomNumber,
  addSubMultDivAsyncSuccess,
  addSubMultDivAsyncFailure,
  getRandomNumberSideEffect,
  addSubMultDivAsyncSideEffect
} from '../src/async-saga';

import axios from 'axios';

import {
  put,
  call,
  take,
  race,
  takeEvery
} from 'redux-saga/effects';

const randInt = () => Math.floor(Math.random() * 3 + 1);

test("add sub mult div action", () => {
  expect(addSubMultDivAsync(1, 3)).toEqual({
    type: ADD_SUB_MULT_DIV_ASYNC,
    payload: {
      a: 1,
      mult: 3
    }
  });
});

test("get random number action", () => {
  expect(getRandomNumber('foo')).toEqual({
    type: GET_RANDOM_NUMBER,
    payload: 'foo'
  });
});

test("add sub mult div async success", () => {
  expect(addSubMultDivAsyncSuccess(5)).toEqual({
    type: ADD_SUB_MULT_DIV_ASYNC_SUCCESS,
    payload: 5
  });
});

test("add sub mult div async failure", () => {
  const error = new Error('foo');
  expect(addSubMultDivAsyncFailure(error)).toEqual({
    type: ADD_SUB_MULT_DIV_ASYNC_FAILURE,
    error
  });
});

test("get random number side effect", () => {
  const gen = getRandomNumberSideEffect({
    type: GET_RANDOM_NUMBER,
    payload: 'foo'
  });
  expect(gen.next().value).toEqual(call(axios, getNumberFromRandomORG));
  expect(gen.next({
    data: '2'
  }).value).toEqual(put({
    type: 'fooSuccess',
    payload: 2
  }));
});

test("get random number side effect failure", () => {
  const error = new Error('foo');
  const gen = getRandomNumberSideEffect({
    type: GET_RANDOM_NUMBER,
    payload: 'foo'
  });
  gen.next();
  expect(gen.throw(error).value).toEqual(put({
    type: 'fooFailure',
    error
  }));
});

test("add sub mult div async side effect", () => {
  const gen = addSubMultDivAsyncSideEffect({
    type: ADD_SUB_MULT_DIV_ASYNC,
    payload: {
      a: 1,
      mult: 5
    }
  });
  expect(gen.next().value).toEqual(put(getRandomNumber('add')));
  expect(gen.next().value).toEqual(put(getRandomNumber('sub')));
  expect(gen.next().value).toEqual(put(getRandomNumber('div')));
  const raceObj = race({
    add: take('addSuccess'),
    sub: take('subSuccess'),
    div: take('divSuccess'),
    addFailure: take('addFailure'),
    subFailure: take('subFailure'),
    divFailure: take('divFailure'),
  });
  expect(gen.next().value).toEqual(raceObj);
  expect(gen.next({
    add: {
      type: 'addSuccess',
      payload: 1
    }
  }).value).toEqual(raceObj);
  expect(gen.next({
    div: {
      type: 'divSuccess',
      payload: 2
    }
  }).value).toEqual(raceObj);
  expect(gen.next({
    sub: {
      type: 'subSuccess',
      payload: 3
    }
  }).value).toEqual(put(addSubMultDivAsyncSuccess((1 + 1 - 3) * 5 / 2)));
  expect(gen.next().done).toBe(true);
});

test("add sub mult div async side effect failure", () => {
  const error = new Error('foo');
  const gen = addSubMultDivAsyncSideEffect({
    type: ADD_SUB_MULT_DIV_ASYNC,
    payload: {
      a: 1,
      mult: 5
    }
  });
  gen.next();
  expect(gen.throw(error).value).toEqual(put(addSubMultDivAsyncFailure(error)));
  expect(gen.next().done).toBe(true);
});

test("add sub mult saga", () => {
  const gen = addSubMultDivAsyncSaga();
  expect(gen.next().value).toEqual(takeEvery(GET_RANDOM_NUMBER, getRandomNumberSideEffect));
  expect(gen.next().value).toEqual(takeEvery(ADD_SUB_MULT_DIV_ASYNC, addSubMultDivAsyncSideEffect));
  expect(gen.next().done).toBe(true);
});
