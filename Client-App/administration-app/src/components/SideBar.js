import { Link } from "react-router-dom";
import { userService } from "../services/UserService";

const SideBar = () => {
	const handleLogout = () => {
		userService.logout();
	};

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
					<a href="index.html" className="nav-link">
						<div className="nav-profile-image">
							<img src="assets/images/faces/face1.jpg" alt="profile" />
							<span className="login-status online"></span>
						</div>
						<div className="nav-profile-text d-flex flex-column pr-3">
							<span className="font-weight-medium mb-2">Ime  Prezime</span>
							<span className="font-weight-normal">$8,753.00</span>
						</div>
						<span className="badge badge-danger text-white ml-3 rounded">3</span>
					</a>
				</li>
				<li className="nav-item">
					<a className="nav-link" data-toggle="collapse" href="#object-menu" aria-expanded="false" aria-controls="ui-basic">
						<i className="mdi mdi-home menu-icon"></i>
						<span className="menu-title">Objects</span>
						<i className="menu-arrow"></i>
					</a>
					<div className="collapse" id="object-menu">
						<ul className="nav flex-column sub-menu">
							<li className="nav-item">
								<Link className="nav-link" to="/objects">
									All Objects
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/add-object">
									Add Object
								</Link>
							</li>
						</ul>
					</div>
				</li>
				<li className="nav-item">
					<a className="nav-link" data-toggle="collapse" href="#admins" aria-expanded="false" aria-controls="admins">
						<i className="mdi mdi-account-plus menu-icon"></i>
						<span className="menu-title">Object Admins</span>
						<i className="menu-arrow"></i>
					</a>
					<div className="collapse" id="admins">
						<ul className="nav flex-column sub-menu">
							<li className="nav-item">
								<Link className="nav-link" to="/object-admins">
									All Object Admins
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/add-object-admin">
									Add Object Admin
								</Link>
							</li>
						</ul>
					</div>
				</li>
				<li className="nav-item">
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
				<li className="nav-item">
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
				<li className="nav-item">
					<Link className="nav-link" to="/tables">
						<i className="mdi mdi-contacts menu-icon"></i>
						<span className="menu-title">Tables</span>
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/object-details">
						<i className="mdi mdi-contacts menu-icon"></i>
						<span className="menu-title">Object Details</span>
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/waiter-orders">
						<i className="mdi mdi-contacts menu-icon"></i>
						<span className="menu-title">Orders</span>
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/self-ordering-token">
						<i className="mdi mdi-contacts menu-icon"></i>
						<span className="menu-title">Self-ordering token</span>
					</Link>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="pages/icons/mdi.html">
						<i className="mdi mdi-contacts menu-icon"></i>
						<span className="menu-title">Icons</span>
					</a>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="pages/forms/basic_elements.html">
						<i className="mdi mdi-format-list-bulleted menu-icon"></i>
						<span className="menu-title">Forms</span>
					</a>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="pages/charts/chartjs.html">
						<i className="mdi mdi-chart-bar menu-icon"></i>
						<span className="menu-title">Charts</span>
					</a>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="pages/tables/basic-table.html">
						<i className="mdi mdi-table-large menu-icon"></i>
						<span className="menu-title">Tables</span>
					</a>
				</li>
				<li className="nav-item">
					<span className="nav-link" href="index.html">
						<span className="menu-title">Docs</span>
					</span>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="index.html">
						<i className="mdi mdi-file-document-box menu-icon"></i>
						<span className="menu-title">Documentation</span>
					</a>
				</li>
				<li className="nav-item sidebar-actions">
					<div className="nav-link">
						<div className="mt-4">
							<div className="border-none">
								<p className="text-black">Notification</p>
							</div>
							<ul className="mt-4 pl-0">
								<li onClick={handleLogout}>Log Out</li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</nav>
	);
};

export default SideBar;
