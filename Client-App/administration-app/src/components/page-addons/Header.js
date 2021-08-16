import React, {useEffect, useContext} from 'react';
import { userConstants } from '../../constants/UserConstants';
import { UserContext } from '../../contexts/UserContext';

const Header = () => {
	const {userState, dispatch} = useContext(UserContext)

	useEffect(() => {
		dispatch({type: userConstants.SET_NAME_AND_SURNAME_AFTER_LOGIN })
	} ,[userState.loggedUserInfo, dispatch]);
	
	return (
		<nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row minimize">
			<div className="navbar-menu-wrapper d-flex align-items-stretch justify-content-between">
				<a className="navbar-brand brand-logo-mini align-self-center d-lg-none" href="index.html">
					<img src="assets/images/logo-mini.svg" alt="logo" />
				</a>
				<button className="navbar-toggler navbar-toggler align-self-center mr-2" type="button" data-toggle="minimize">
					<i className="mdi mdi-menu"></i>
				</button>
				<ul className="navbar-nav">
					{/*<li className="nav-item dropdown">
						<a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="/#" data-toggle="dropdown">
							<i className="mdi mdi-bell-outline"></i>
							<span className="count count-varient1">7</span>
						</a>
						<div className="dropdown-menu navbar-dropdown navbar-dropdown-large preview-list" aria-labelledby="notificationDropdown">
							<h6 className="p-3 mb-0">Notifications</h6>
							<a className="dropdown-item preview-item" href="/#">
								<div className="preview-thumbnail">
									<img src="assets/images/faces/face1.jpg" alt="" className="profile-pic" />
								</div>
								<div className="preview-item-content">
									<p className="mb-0">
										{" "}
										Dany Miles <span className="text-small text-muted">commented on your photo</span>
									</p>
								</div>
							</a>

							<div className="dropdown-divider"></div>
							<p className="p-3 mb-0">View all activities</p>
						</div>
					</li>
					<li className="nav-item nav-search border-0 ml-1 ml-md-3 ml-lg-5 d-none d-md-flex">
						<form className="nav-link form-inline mt-2 mt-md-0">
							<div className="input-group">
								<input type="text" className="form-control" placeholder="Search" />
								<div className="input-group-append">
									<span className="input-group-text">
										<i className="mdi mdi-magnify"></i>
									</span>
								</div>
							</div>
						</form>
					</li>*/}
				</ul>
				<ul className="navbar-nav navbar-nav-right ml-lg-auto">
					<li className="nav-item nav-profile border-0">
						<a className="nav-link " id="profileDropdown" href="/#" data-toggle="dropdown">
							<img className="nav-profile-img mr-2" alt="" src="assets/images/faces/face1.jpg" />
							<span className="profile-name">{userState.loggedUserInfo.name} {userState.loggedUserInfo.surname}</span>
						</a>
					</li>
				</ul>
				<button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
					<span className="mdi mdi-menu"></span>
				</button>
			</div>
		</nav>
	);
};

export default Header;
