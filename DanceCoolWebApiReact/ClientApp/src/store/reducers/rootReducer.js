import { combineReducers } from 'redux';
import logInReducer from './logIn.reducer';

const rootReducer = combineReducers({
    authReducer: logInReducer
});

export default rootReducer;