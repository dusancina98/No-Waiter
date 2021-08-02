import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import ChooseOrderTypePage from "./pages/ChooseOrderTypePage";
import HomePage from "./pages/HomePage";
import CreateOrderPage from "./pages/CreateOrderPage";

function App() {
    return (
        <Router>
			      <Switch>
                <Route path="/home" component={HomePage} />
                <Route path="/choose-order-type" component={ChooseOrderTypePage} />
                <Route path="/create-order" component={CreateOrderPage} />

                <Redirect from="/" to="home" />
			      </Switch>
		    </Router>
  );
}

export default App;
