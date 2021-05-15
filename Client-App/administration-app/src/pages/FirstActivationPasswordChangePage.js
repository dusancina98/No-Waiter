import React from 'react';
import FirstActivationPasswordChangeForm from '../components/FirstActivationPasswordChangeForm';
import UserContextProvider from "../contexts/UserContext";

const FirstActivationPasswordChangePage = (props) => {
    return(
        <React.Fragment>
			<div className="limiter">
		        <div className="container-login100">
			        <div className="wrap-login100">
                        <UserContextProvider>
                            <FirstActivationPasswordChangeForm id={props.match.params.id}/>
                        </UserContextProvider>
			        </div>
		        </div>
	        </div>
		</React.Fragment>
    );
};

export default FirstActivationPasswordChangePage;
