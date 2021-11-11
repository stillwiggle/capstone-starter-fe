import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const mustBeAuthenticated = connectedRouterRedirect({
  // The url to redirect user to if they fail
  redirectPath: "/login",
  // If selector is true, wrapper will not redirect
  // For example let's check that state contains user data
  authenticatedSelector: state =>
    state.auth &&
    state.auth.token !== "",
  // A nice display name for this check
  wrapperDisplayName: "MustBeAuthenticated"
});

export default mustBeAuthenticated;