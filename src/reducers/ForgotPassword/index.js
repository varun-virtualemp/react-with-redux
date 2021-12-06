export function forgotPassword(state = [], action) {
    switch (action.type) {
        case 'FORGOT_PASSWORD_REQUEST':
            return {
                blocking                    : true,
                forgetPasswordChange        : {},
            }
        
        case 'FORGOT_PASSWORD_SUCCESS':
            return {
                blocking                    : false,
                forgetPasswordChange        : action.payload,
            }
        
        case 'FORGOT_PASSWORD_FAILURE':
            return {
                blocking                    : false,
                forgetPasswordChange        : {},
                isOtpScreen                 : false
            };

        case 'RESET_FORGET_PASSWORD':
            return [];

        default:
            return state
    }
}