import { Switch, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Protected from "./pages/protected/Protected";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import Register from "./pages/register/Register";
import UpdateUser from "./pages/updateUser/UpdateUser";
import Users from "./pages/users/Users";
import Favorites from "./pages/favorites/Favorites";
import UserStats from "./pages/userStats/UserStats";
import Categories from "./pages/categories/categories";
import GlobalStats from "./pages/globalStats/GlobalStats";
import Questions from "./pages/questions/questions";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          component={Home}
        />
        <Route
          exact
          path="/login"
          component={Login}
        />
        <Route
          exact
          path="/register"
          component={Register}
        />
        <Route
          exact
          path="/updateuser/:email"
          component={UpdateUser}
        />
        <Route
          exact
          path="/protected"
          component={Protected}
        />
        <Route
          exact
          path="/users"
          component={Users}
        />
        <Route
            exact
            path="/categories"
            component={Categories}
        />
        <Route
            exact
            path="/questions/:category"
            component={Questions}
        />
        <Route
          exact
          path="/stats/:email"
          component={UserStats}
        />
        <Route
          exact
          path="/stats/:email"
          component={UserStats}
        />
        <Route
          exact
          path="/favorites"
          component={Favorites}
        />
        <Route
          exact
          path="*"
          component={NotFound}
        />

      </Switch>
    </div>
  );
}

export default App;
