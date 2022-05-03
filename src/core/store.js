import { configureStore } from '@reduxjs/toolkit'
import {tokenReducer,likesReducer} from './reducers'

export default store = configureStore({
  reducer: {
    token: tokenReducer,
    likes: likesReducer
  }
});
