import axios from 'axios';

import handleHttpError, { API_URL, displaySuccessMessage } from '../../utils/helper';

export const sendForgetRequestEmail = (postData = {}) => {
    return async dispatch => {
        dispatch({ type: 'FORGOT_PASSWORD_REQUEST' });
        try {
            const response = await axios.post(API_URL + 'forgotpassword', postData);
            if (response.success) {
                dispatch({ type : 'FORGOT_PASSWORD_SUCCESS', payload : response.data.data});
                displaySuccessMessage('OTP sent to your email');
            }
        } catch (err) {
            handleHttpError(err.response);
            dispatch({ type: 'FORGOT_PASSWORD_FAILURE' });
        }
    }
}

/* action resetting data */
export const resetForgetPasswordData = () => {
    return async dispatch => {
        dispatch({ type: 'RESET_FORGET_PASSWORD' });
    }
}