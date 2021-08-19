import React from 'react';
import FirstActivationPasswordChangeForm from '../components/authorizations/FirstActivationPasswordChangeForm';
import UserContextProvider from "../contexts/UserContext";

const FirstActivationPasswordChangePage = (props) => {
    return(
        <React.Fragment>
			<div className="limiter">
		        <div className="container-login100">
			        <div className="wrap-login100">
                        <UserContextProvider>
                            <FirstActivationPasswordChangeForm id={props.match.params.id} token={props.match.params.token}/>
                        </UserContextProvider>
			        </div>
		        </div>
	        </div>
		</React.Fragment>
    );
};

export default FirstActivationPasswordChangePage;
