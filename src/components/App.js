import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvide } from '../contexts/AuthContext';
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Signup from './pages/Signup';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import './styles/App.css';

function App() {
    return (
        <Router>
            <AuthProvide>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <PublicRoute exact path="/login" component={Login} />
                        <PublicRoute exact path="/signup" component={Signup} />
                        <PrivateRoute exact path="/quiz/:id" component={Quiz} />
                        <PrivateRoute
                            exact
                            path="/result/:id"
                            component={Result}
                        />
                    </Switch>
                </Layout>
            </AuthProvide>
        </Router>
    );
}

export default App;
