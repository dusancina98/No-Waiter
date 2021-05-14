import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import CreateObjectAdminPage from "./pages/CreateObjectAdminPage";
import CreateObjectPage from "./pages/CreateObjectPage";
import FirstActivationPasswordChangePage from "./pages/FirstActivationPasswordChangePage";
import HomePage from "./pages/HomePage";
import ListObjectAdminsPage from "./pages/ListObjectAdminsPage";
import ListObjectPage from "./pages/ListObjectsPage";
import LoginPage from "./pages/Login";
import UserActivateRequestPage from "./pages/UserActivateRequestPage";
import { ProtectedRoute } from "./router/ProtectedRouter";

function App() {
	return (
		<Router>
			<Switch>
				<ProtectedRoute roles={""} redirectTo="/" path="/login" component={LoginPage} />
				<ProtectedRoute roles={"ROLE_SYSADMIN"} exact path="/" redirectTo="/unauthorized" component={HomePage} />
				<Route path="/add-object" component={CreateObjectPage} />
				<Route path="/objects" component={ListObjectPage} />
				<Route path="/add-object-admin" component={CreateObjectAdminPage} />
				<Route path="/object-admins" component={ListObjectAdminsPage} />

				<ProtectedRoute roles={""} redirectTo="/" path="/inactive-user/:id" component={UserActivateRequestPage} />
				<ProtectedRoute roles={""} redirectTo="/" path="/first-login-password/:id" component={FirstActivationPasswordChangePage} />


			</Switch>
		</Router>
	);
}

export default App;
