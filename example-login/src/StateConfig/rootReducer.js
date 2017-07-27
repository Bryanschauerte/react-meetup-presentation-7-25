import {
  combineReducers
} from 'redux';
import { viewStates } from './viewStates';

export const rootReducer = combineReducers({
    viewStates: viewStates
});
