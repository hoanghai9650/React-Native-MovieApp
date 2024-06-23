import {combineReducers, configureStore} from '@reduxjs/toolkit';
import appReducer from './app';
import detailReducer from './detail';

const rootReducer = combineReducers({
  detail: detailReducer,
  app: appReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export {store};
