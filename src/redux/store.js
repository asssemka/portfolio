import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {thunk} from 'redux-thunk'; // Без фигурных скобок
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export const StoreProvider = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);
