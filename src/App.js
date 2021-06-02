import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Routes from "./constants/routes";
import useAuthListner from "./hooks/use-auth-listner";
import UserContext from "./context/user";
import ProtectedRoute from "./helpers/protected-route";
import IsUserLoggedIn from "./helpers/is-userlogged-in";

const Login = lazy(() => import("./pages/login"));
const Profile = lazy(() => import("./pages/Profile"));
const Signup = lazy(() => import("./pages/signup"));
const NotFound = lazy(() => import("./pages/notfound"));
const Dashboard = lazy(() => import("./pages/dashboard"));

function App() {
  const { user } = useAuthListner();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <ProtectedRoute user={user} path={Routes.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <IsUserLoggedIn
              user={user}
              loggedInPath={Routes.DASHBOARD}
              path={Routes.LOGIN}
            >
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn
              user={user}
              loggedInPath={Routes.DASHBOARD}
              path={Routes.SIGN_UP}
            >
              <Signup />
            </IsUserLoggedIn>
            <Route path={Routes.PROFILE} component={Profile} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
