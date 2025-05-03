import React, { ReactElement } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthLayout from "./layouts/authLayout";
import DashboardLayout from "./layouts/dashboardLayout";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import DashboardPage from "./pages/dashboard";
import ForgotPasswordPage from "./pages/auth/forgotPassword";
import ResetPasswordPage from "./pages/auth/resetPassword";
import VehiclePage from "./pages/vehicle";
import VehicleModelPage from "./pages/vehicleModel";
import ActionsPage from "./pages/actions";
import NotFoundPage from "./pages/404";

const PrivateRoute: React.FC<{ children: ReactElement }> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/auth/register" replace />;
};

const PublicRoute: React.FC<{ children: ReactElement }> = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard/overview" replace /> : children;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route
          path="/auth/*"
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        >
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="resetPassword" element={<ResetPasswordPage />} />
          <Route path="*" element={<Navigate to="/auth/register" replace />} />
        </Route>

        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="overview" element={<DashboardPage />} />
          <Route path="vehicles" element={<VehiclePage />} />
          <Route path="vehicleModels" element={<VehicleModelPage />} />
          <Route path="actions" element={<ActionsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
