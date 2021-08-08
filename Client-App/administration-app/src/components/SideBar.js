import React, {useEffect, useContext} from 'react';
import { Link } from "react-router-dom";
import { userConstants } from '../constants/UserConstants';
import { UserContext } from '../contexts/UserContext';
import { hasRoles } from "../helpers/auth-header";
import { userService } from "../services/UserService";

const SideBar = () => {
	const {userState, dispatch} = useContext(UserContext)
	const handleLogout = () => {
		userService.logout();
	};

	useEffect(() => {
		dispatch({type: userConstants.SET_NAME_AND_SURNAME_AFTER_LOGIN })
	} ,[userState.loggedUserInfo, dispatch]);


	return (
		<nav className="sidebar sidebar-offcanvas" id="sidebar">
			<div className="text-center sidebar-brand-wrapper d-flex align-items-center">
				<Link className="sidebar-brand brand-logo" to="/">
					<img src="assets/images/logo.svg" alt="logo" />
				</Link>
				<Link className="sidebar-brand brand-logo-mini pl-4 pt-3" to="/">
					<img src="assets/images/logo-mini.svg" alt="logo" />
				</Link>
			</div>
			<ul className="nav">
				<li className="nav-item nav-profile">
					<a href="#/" className="nav-link">
						<div className="nav-profile-image">
							<img src="assets/images/faces/face1.jpg" alt="profile" />
							<span className="login-status online"></span>
						</div>
						<div className="nav-profile-text d-flex flex-column pr-3">
							<span className="font-weight-medium mb-2">{userState.loggedUserInfo.name}  {userState.loggedUserInfo.surname}</span>
						</div>
						{/*<span className="badge badge-danger text-white ml-3 rounded">3</span>  - Broj posle imena,za notify*/}
					</a>
				</li>
				<li className="nav-item">
					<a hidden={!hasRoles("ROLE_SYSADMIN")} className="nav-link" data-toggle="collapse" href="#object-menu" aria-expanded="false" aria-controls="ui-basic">
						<i className="mdi mdi-home menu-icon"></i>
						<span className="menu-title">Objects</span>
						<i className="menu-arrow"></i>
					</a>
					<div className="collapse" id="object-menu">
						<ul className="nav flex-column sub-menu">
							<li className="nav-item">
								<Link className="nav-link" to="/objects" hidden={!hasRoles("ROLE_OBJADMIN") && !hasRoles("ROLE_SYSADMIN")}>
									All Objects
								</Link>
							</li>
							<li className="nav-item" hidden={!hasRoles("ROLE_SYSADMIN")}>
								<Link className="nav-link" to="/add-object">
									Add Object
								</Link>
							</li>
						</ul>
					</div>
				</li>
				<li className="nav-item" hidden={!hasRoles("ROLE_SYSADMIN")}>
					<a className="nav-link" data-toggle="collapse" href="#admins" aria-expanded="false" aria-controls="admins">
						<i className="mdi mdi-account-plus menu-icon"></i>
						<span className="menu-title">Object Admins</span>
						<i className="menu-arrow"></i>
					</a>
					<div className="collapse" id="admins" >
						<ul className="nav flex-column sub-menu">
							<li className="nav-item" hidden={!hasRoles("ROLE_SYSADMIN")}>
								<Link className="nav-link" to="/object-admins">
									All Object Admins
								</Link>
							</li>
							<li className="nav-item" hidden={!hasRoles("ROLE_SYSADMIN")}>
								<Link className="nav-link" to="/add-object-admin">
									Add Object Admin
								</Link>
							</li>
						</ul>
					</div>
				</li>
				<li className="nav-item" hidden={!hasRoles("ROLE_OBJADMIN")}>
					<a className="nav-link" data-toggle="collapse" href="#employees" aria-expanded="false" aria-controls="employees">
						<i className="mdi mdi-account-plus menu-icon"></i>
						<span className="menu-title">Employees</span>
						<i className="menu-arrow"></i>
					</a>
					<div className="collapse" id="employees">
						<ul className="nav flex-column sub-menu">
							<li className="nav-item">
								<Link className="nav-link" to="/employees/waiter">
									All Employees
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/employees/add-waiter">
									Add Employee
								</Link>
							</li>
						</ul>
					</div>
				</li>
				<li className="nav-item" hidden={!hasRoles("ROLE_SYSADMIN")}>
					<a className="nav-link" data-toggle="collapse" href="#deliverers" aria-expanded="false" aria-controls="deliverers">
						<i className="mdi mdi-account-plus menu-icon"></i>
						<span className="menu-title">Deliverer</span>
						<i className="menu-arrow"></i>
					</a>
					<div className="collapse" id="deliverers">
						<ul className="nav flex-column sub-menu">
							<li className="nav-item">
								<Link className="nav-link" to="/deliverers">
									All Deliverer
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/deliverer/requests">
									Deliverer requests
								</Link>
							</li>
						</ul>
					</div>
				</li>
				<li className="nav-item" hidden={!hasRoles("ROLE_OBJADMIN")}>
					<Link className="nav-link" to="/tables">
						<i>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-align-top" viewBox="0 0 16 16">
								<rect width="4" height="12" rx="1" transform="matrix(1 0 0 -1 6 15)"/>
								<path d="M1.5 2a.5.5 0 0 1 0-1v1zm13-1a.5.5 0 0 1 0 1V1zm-13 0h13v1h-13V1z"/>
							</svg>
						</i>
						<span className="menu-title ml-3">Tables</span>
					</Link>
				</li>
				<li className="nav-item" hidden={!hasRoles("ROLE_OBJADMIN")}>
					<Link className="nav-link" to="/object-details">
						<i >
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layout-text-sidebar-reverse" viewBox="0 0 16 16">
 							<path d="M12.5 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5zm0 3a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5zm.5 3.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5z"/>
  							<path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2zM4 1v14H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h2zm1 0h9a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5V1z"/>
						</svg>
						</i>
						<span className="menu-title ml-3">Object Details</span>
					</Link>
				</li>
				<li className="nav-item" hidden={!hasRoles("ROLE_WAITER")}>
					<Link className="nav-link" to="/create-order">
						<i className="mdi mdi-contacts menu-icon">
							
						</i>
						<span className="menu-title">Create-Order</span>
					</Link>
				</li>
				<li className="nav-item" hidden={!hasRoles("ROLE_WAITER")}>
					<Link className="nav-link" to="/waiter-orders">
						<i className="mdi mdi-contacts menu-icon"></i>
						<span className="menu-title">Orders</span>
					</Link>
				</li>
				<li className="nav-item"  hidden={!hasRoles("ROLE_OBJADMIN")}>
					<Link className="nav-link" to="/self-ordering-token">
						<i className="mdi mdi-contacts menu-icon"></i>
						<span className="menu-title">Self-ordering token</span>
					</Link>
				</li>

				<li className="nav-item sidebar-actions">
					<div className="nav-link">
						<div className="mt-4">
							<ul className="mt-4 pl-0">
								<li onClick={() => handleLogout()}>Log Out</li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</nav>
	);
};

export default SideBar;
