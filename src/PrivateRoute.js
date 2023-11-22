import { Navigate, Outlet } from "react-router-dom";
import authStore from "./AuthStore.js";
import { observer } from "mobx-react-lite";

const PrivateRoute = () => {
  if (authStore.isAuthInProgress) {
    console.log("checking auth");
    return <div>Checking auth...</div>;
  }
  if (authStore.isAuth) {
    console.log("authorized");
    return <Outlet/>
  } else {
    console.log("non authorized");
    return <Navigate to="/login" />;
  }
};

export default observer(PrivateRoute);
