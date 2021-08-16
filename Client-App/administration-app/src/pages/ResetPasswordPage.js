import React from 'react';
import ResetPasswordForm from '../components/authorizations/ResetPasswordForm';
import UserContextProvider from "../contexts/UserContext";

const ResetPasswordPage = (props) => {
    return(
        <React.Fragment>
			<div className="limiter">
		        <div className="container-login100">
			        <div className="wrap-login100">
                        <UserContextProvider>
                            <ResetPasswordForm id={props.match.params.id} token={props.match.params.token} />
                        </UserContextProvider>
			        </div>
		        </div>
	        </div>
		</React.Fragment>
    );
};

export default ResetPasswordPage;
