import React from 'react';
import ResetPasswordForm from '../components/ResetPasswordForm';
import UserContextProvider from "../contexts/UserContext";

const ResetPasswordPage = (props) => {
    return(
        <React.Fragment>
			<div className="limiter">
		        <div className="container-login100">
			        <div className="wrap-login100">
                        <UserContextProvider>
                            <ResetPasswordForm id={props.match.params.id} />
                        </UserContextProvider>
			        </div>
		        </div>
	        </div>
		</React.Fragment>
    );
};

export default ResetPasswordPage;
