import { createSelector } from 'reselect';
import _get from 'lodash/get';
import { combineReducers } from 'redux';
import loginReducer from '../Login/viewState';

export const viewStates = combineReducers({
    loginState: loginReducer
});

export const getViewStates = createSelector(
  state => state,
  state => _get(state, 'viewStates')
);

export const getViewStateByName = createSelector(
  getViewStates,
  (state, name) => name,
  (viewStates, name) => _get(viewStates, name)
);
