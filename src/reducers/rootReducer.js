import { combineReducers } from 'redux';

import { authenticatedUser } from './Login';
import { forgotPassword } from './ForgotPassword';
import { user } from './User';

const rootReducer = combineReducers({
    authenticatedUser,
    forgotPassword,
    user,
});

export default rootReducer;