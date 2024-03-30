import React, { useEffect } from "react";
import AppRouters from "./utils/AppRouters";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./animation/Loading";
import { HelmetProvider } from "react-helmet-async";
import { loadUser } from "./Redux/Actions/UserActions";

const App = () => {
  const router = createBrowserRouter(AppRouters);
  const dispatch = useDispatch();
  // const { loading, error, isAuthenticated } = useSelector((state) => state.authState);
  const Loader = useSelector((state) => state.loading);

  useEffect(() => {   
    dispatch(loadUser);
  }, []);

  return (
    <>
      {Loader && <Loading />}
      <div className="mainContainer">
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </div>
    </>
  );
};

export default App;
