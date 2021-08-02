import { HashRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import ChooseOrderTypePage from "./pages/ChooseOrderTypePage";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <Router>
			      <Switch>
                <Route path="/home" component={HomePage} />
                <Route path="/choose" component={ChooseOrderTypePage} />
			      </Switch>
		    </Router>
  );
}

export default App;
