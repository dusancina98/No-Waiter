import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";
import CreateOrderPage from "./pages/CreateOrderPage";
import FinishedOrderPage from "./pages/FinishedOrderPage";
import FailureOrderPage from "./pages/FailureOrderPage";

function App() {
    return (
        <Router>
			      <Switch>
                <Route path="/home" component={HomePage} />
                <Route path="/create-order" component={CreateOrderPage} />
                <Route path="/finished" component={FinishedOrderPage} />
                <Route path="/failure" component={FailureOrderPage} />

                <Redirect from="/" to="home" />
			      </Switch>
		    </Router>
  );
}

export default App;
