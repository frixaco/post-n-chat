import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/userReducer';
import chatReducer from './chat/chatReducer';
import postReducer from './post/postReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'chat', 'post']
};

const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
    post: postReducer
})

export default persistReducer(persistConfig, rootReducer);
