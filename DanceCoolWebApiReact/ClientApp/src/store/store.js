import rootReducer from './reducers/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const logger = store =>{
    return next =>{
      return action=>{
        console.log('[Middleware] Dispatching ', action);
        const result = next(action);
        console.log('[Middleware] Dispatching ', store.getState());
        return result;
      }
    }
  }

const store = createStore(
    rootReducer,
    applyMiddleware(
        logger,
        thunk
    )
);

export default store;
