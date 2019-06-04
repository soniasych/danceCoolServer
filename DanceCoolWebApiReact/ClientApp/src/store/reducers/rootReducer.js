import { combineReducers } from 'redux';
import logInReducer from './logIn.reducer';

const rootReducer = combineReducers({
    logInReducer: logInReducer
});

export default rootReducer;