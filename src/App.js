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
        <ScrollToTop/>
        <Routes>
          <Route
            element={
              <WebsiteLayout>
                <Outlet />
              </WebsiteLayout>
            }
          >
            {isAuthenticated &&
              routes.map(
                (featu) =>
                  featu.type == "private" && (
                    <Route
                      element={featu.element}
                      path={featu.path}
                      exact={featu}
                    />
                  )
              )}
          </Route>

          <Route
            element={
              <WebsiteLayout>
                <Outlet />
              </WebsiteLayout>
            }
          >
            {routes.map(
              (featu) =>
                featu.type == "public" && (
                  <Route
                    element={featu.element}
                    path={featu.path}
                    exact={featu}
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
