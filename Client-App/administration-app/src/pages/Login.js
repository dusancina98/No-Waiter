import React from 'react';
import LoginForm from '../components/LoginForm';
import UserContextProvider from "../contexts/UserContext";

const LoginPage = () => {
    return(
        <React.Fragment>
			<div className="limiter">
		        <div className="container-login100">
			        <div className="wrap-login100">
                        <UserContextProvider>
                            <LoginForm/>
                        </UserContextProvider>
			        </div>
		        </div>
	        </div>
		</React.Fragment>
    );
};

export default LoginPage;
