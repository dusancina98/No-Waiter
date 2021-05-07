import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import CreateObjectAdminPage from "./pages/CreateObjectAdminPage";
import CreateObjectPage from "./pages/CreateObjectPage";
import HomePage from "./pages/HomePage";
import ListObjectAdminsPage from "./pages/ListObjectAdminsPage";
import ListObjectPage from "./pages/ListObjectsPage";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/add-object" component={CreateObjectPage} />
				<Route path="/objects" component={ListObjectPage} />
				<Route path="/add-object-admin" component={CreateObjectAdminPage} />
				<Route path="/object-admins" component={ListObjectAdminsPage} />
			</Switch>
		</Router>
	);
}

export default App;
