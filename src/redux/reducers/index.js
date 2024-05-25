import { combineReducers } from 'redux';
import userReducer from './userReducer';
import postReducer from './postReducer';
import categoryReducer from './categoryReducer';
import languageReducer from './languageReducer';

export default combineReducers({
  user: userReducer,
  posts: postReducer,
  categories: categoryReducer,
  language: languageReducer,
});
