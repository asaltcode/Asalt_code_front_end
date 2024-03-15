import React from "react";
import AppRouters from "./utils/AppRouters";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./animation/Loading";
const App = () => {
  const router = createBrowserRouter(AppRouters);
  const Loader = useSelector(state => state.loading)
  return (
    <>
      {Loader && <Loading/>}
      <div className="mainContainer">
        <RouterProvider router={router} />
      </div>
    </>
  );
};
export default App;