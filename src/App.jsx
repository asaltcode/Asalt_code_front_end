import React from "react";
import AppRouters from "./utils/AppRouters";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const App = () => {
  const router = createBrowserRouter(AppRouters);
  return (
    <>
      <div className="mainContainer">
        <RouterProvider router={router} />
      </div>
    </>
  );
};
export default App;