import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import CreateObjectAdminPage from "./pages/CreateObjectAdminPage";
import CreateObjectPage from "./pages/CreateObjectPage";
import FirstActivationPasswordChangePage from "./pages/FirstActivationPasswordChangePage";
import CreateWaiterPage from "./pages/CreateWaiterPage";
import HomePage from "./pages/HomePage";
import ListObjectAdminsPage from "./pages/ListObjectAdminsPage";
import ListWaitersPage from "./pages/ListWaitersPage";
import ListObjectPage from "./pages/ListObjectsPage";
import LoginPage from "./pages/Login";
import UserActivateRequestPage from "./pages/UserActivateRequestPage";
import { ProtectedRoute } from "./router/ProtectedRouter";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PageNotFoundPage from "./pages/PageNotFoundPage";
import ListTablesPage from "./pages/ListTablesPage";

function App() {
	return (
		<Router>
			<Switch>
				<ProtectedRoute roles={""} redirectTo="/" path="/login" component={LoginPage} />
				<ProtectedRoute roles={""} exact path="/" redirectTo="/unauthorized" component={HomePage} />
				<Route path="/add-object" component={CreateObjectPage} />
				<Route path="/objects" component={ListObjectPage} />
				<Route path="/tables" component={ListTablesPage} />

				<Route path="/add-object-admin" component={CreateObjectAdminPage} />
				<Route path="/object-admins" component={ListObjectAdminsPage} />
				<ProtectedRoute roles={""} redirectTo="/" path="/inactive-user/:id" component={UserActivateRequestPage} />
				<ProtectedRoute roles={""} redirectTo="/" path="/first-login-password/:id/:token" component={FirstActivationPasswordChangePage} />
				<Route path="/employees/add-waiter" component={CreateWaiterPage} />
				<Route path="/employees/waiter" component={ListWaitersPage} />

				<ProtectedRoute roles={""} exact path="/reset-password-request" redirectTo="/unauthorized" component={ForgotPasswordPage} />
				<ProtectedRoute roles={""} exact path="/reset-password/:id/:token" redirectTo="/unauthorized" component={ResetPasswordPage} />

				<Route path="/404" component={PageNotFoundPage} />
				<Redirect to="/404" />
			</Switch>
		</Router>
	);
}

export default App;
