import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { TeamPage } from './pages/teampage';
import { MatchPage } from './pages/matchPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/teams/:teamName/matches/:year">
            <MatchPage />
          </Route>
          <Route path="/teams/:teamName">
            <TeamPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
//Lets Use the TeamPage Component for the Heading