import { HashRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";

function App() {
    return (
        <Router>
			      <Switch>
                <Route path="/" component={HomePage} />
			      </Switch>
		    </Router>
  );
}

export default App;
