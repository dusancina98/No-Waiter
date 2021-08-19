import React from 'react';
import ForgotPasswordForm from '../components/authorizations/ForgotPasswordForm';
import UserContextProvider from "../contexts/UserContext";

const ForgotPasswordPage = () => {
    return(
        <React.Fragment>
			<div className="limiter">
		        <div className="container-login100">
			        <div className="wrap-login100">
                        <UserContextProvider>
                            <ForgotPasswordForm/>
                        </UserContextProvider>
			        </div>
		        </div>
	        </div>
		</React.Fragment>
    );
};

export default ForgotPasswordPage;
