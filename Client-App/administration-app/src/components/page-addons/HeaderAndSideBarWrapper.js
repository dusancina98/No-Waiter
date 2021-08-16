import React from 'react'
import UserContextProvider from "../../contexts/UserContext";
import Header from "./Header";
import SideBar from "./SideBar";

const HeaderAndSideBarWrapper = (props) => {

	return (
        <React.Fragment>
            <UserContextProvider>
                <div className="container-scroller">
                        <SideBar />
                    <div className="container-fluid page-body-wrapper">
                        <Header />
                        {props.children}
                    </div>
                </div>
            </UserContextProvider>
        </React.Fragment>
    )};

export default HeaderAndSideBarWrapper;
