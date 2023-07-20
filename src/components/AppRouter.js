import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Products from "./pages/Products";
import SideBar from "./common/SideBar";
import Login from "./login";
import ListUser from "./pages/ListUser";
import superAdmin from "./constants/superAdmin";
import admin from "./constants/admin";

function AppRouter() {
  const profile = JSON.parse(sessionStorage.getItem("profile"));

  if (profile === null) {
    return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Navigate to="/" />} />
            <Route path="/" element={<Login />} exact />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else if (profile.role.id === 1) {
    return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route
              element={<SideBar tab={superAdmin} title={"Admin Manager"} />}
            >
              <Route
                path="/*"
                element={<Navigate to="/manage-staff" />}
                exact
              />
              <Route
                path="/manage-staff"
                element={<ListUser data={"staffs"} />}
              />
              <Route
                path="/manage-user"
                element={<ListUser data={"users"} />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else if (profile.role.id === 2) {
    return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route element={<SideBar tab={admin} title={"Staff Manager"} />}>
              <Route path="/*" element={<Navigate to="/dashboard" />} exact />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default AppRouter;
