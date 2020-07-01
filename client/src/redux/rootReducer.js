import { combineReducers } from 'redux';

import userReducer from './user/userReducer';
import chatReducer from './chat/chatReducer';
import postReducer from './post/postReducer';

const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
    post: postReducer,
});

export default rootReducer;
