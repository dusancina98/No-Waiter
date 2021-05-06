import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AddObjectPage from "./pages/AddObjectPage";
import HomePage from "./pages/HomePage";
import ListObjectPage from "./pages/ListObjectsPage";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/add-object" component={AddObjectPage} />
				<Route path="/objects" component={ListObjectPage} />
			</Switch>
		</Router>
	);
}

export default App;
