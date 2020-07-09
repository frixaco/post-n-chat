import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/userReducer';
import chatReducer from './chat/chatReducer';
import postsReducer from './posts/postsReducer';
import UserActionTypes from './user/userTypes';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'chat', 'posts']
};

const appReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
    posts: postsReducer
})
const rootReducer = (state, action) => {
    // LOGOUT
    if (action.type === UserActionTypes.LOGOUT) {
        storage.removeItem('persist:root')
        state = undefined;
    }
    return appReducer(state, action);
}

export default persistReducer(persistConfig, rootReducer);


// import userReducer from './user/userReducer';
// import chatReducer from './chat/chatReducer';
// import postsReducer from './posts/postsReducer';

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['user', 'chat', 'posts']
// };

// const rootReducer = combineReducers({
//     user: userReducer,
//     chat: chatReducer,
//     posts: postsReducer
// })

// export default persistReducer(persistConfig, rootReducer);
