import "./App.css";

import routes from "./routes/routes";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";

import AuthorizedLayout from "./layout/authroize.layout";
import WebsiteLayout from "./layout/website.layout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Auth } from "./context/auth.context";
import { useEffect } from "react";

import { Navigate } from 'react-router-dom';

function App() {
  const { isAuthenticated } = Auth();

  const ScrollToTop = () => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
    return null;
  };

  return (
    <div style={{ height: "100%" }}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* First, render all public routes */}
          <Route element={<WebsiteLayout><Outlet /></WebsiteLayout>}>
            {routes.map((route) => 
              route.type === "public" && (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              )
            )}
          </Route>

          {/* Then, render private routes with protection */}
          <Route element={<AuthorizedLayout><Outlet /></AuthorizedLayout>}>
            {routes.map((route) => 
              route.type === "private" && (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    isAuthenticated ? (
                      route.element
                    ) : (
                      <Navigate to="/login" state={{ from: route.path }} replace />
                    )
                  }
                />
              )
            )}
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
