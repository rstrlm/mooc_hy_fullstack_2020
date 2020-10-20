import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })
  test('neutral is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })
  test('zero is resets state', () => {
    const actionOk = {
      type: 'OK'
    }
    const actionBad = {
      type: 'BAD'
    }
    const actionGood = {
      type: 'GOOD'
    }
    const actionZero = {
      type: 'ZERO'
    }
      const state = initialState

    deepFreeze(state)
    let newState = counterReducer(state, actionOk)
    newState = counterReducer(newState, actionBad)
    newState = counterReducer(newState, actionGood)
    expect(newState).toEqual({
      good: 1,
      ok: 1,
      bad: 1
    })
    newState = counterReducer(newState, actionZero)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})