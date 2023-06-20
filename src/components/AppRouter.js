import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Products from "./pages/Products";
import SideBar from "./common/SideBar";
import Login from "./login";

function AppRouter() {
  const profile = sessionStorage.getItem("profile");

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
  } else {
    return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route element={<SideBar />}>
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
