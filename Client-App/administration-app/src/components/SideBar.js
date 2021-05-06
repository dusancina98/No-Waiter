import { Link } from "react-router-dom";

const SideBar = () => {
	return (
		<nav className="sidebar sidebar-offcanvas" id="sidebar">
			<div className="text-center sidebar-brand-wrapper d-flex align-items-center">
				<a className="sidebar-brand brand-logo" href="index.html">
					<img src="assets/images/logo.svg" alt="logo" />
				</a>
				<a className="sidebar-brand brand-logo-mini pl-4 pt-3" href="index.html">
					<img src="assets/images/logo-mini.svg" alt="logo" />
				</a>
			</div>
			<ul className="nav">
				<li className="nav-item nav-profile">
					<a href="index.html" className="nav-link">
						<div className="nav-profile-image">
							<img src="assets/images/faces/face1.jpg" alt="profile" />
							<span className="login-status online"></span>
						</div>
						<div className="nav-profile-text d-flex flex-column pr-3">
							<span className="font-weight-medium mb-2">Henry Klein</span>
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
					<a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
						<i className="mdi mdi-crosshairs-gps menu-icon"></i>
						<span className="menu-title">Basic UI Elements</span>
						<i className="menu-arrow"></i>
					</a>
					<div className="collapse" id="ui-basic">
						<ul className="nav flex-column sub-menu">
							<li className="nav-item">
								<a className="nav-link" href="pages/ui-features/buttons.html">
									Buttons
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="pages/ui-features/dropdowns.html">
									Dropdowns
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="pages/ui-features/typography.html">
									Typography
								</a>
							</li>
						</ul>
					</div>
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
								<li>Sign Out</li>
							</ul>
						</div>
					</div>
				</li>
			</ul>
		</nav>
	);
};

export default SideBar;
