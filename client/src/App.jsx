import { Navigate, Route, Routes } from "react-router-dom";
import GoogleVerify from "./pages/GoogleVerify";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import Performance from "./pages/Performance";
import Contests from "./pages/Contests";
import CustomDashboards from "./pages/CustomDashboards";
import CustomDashboard from "./pages/CustomDashboard";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
    path="/google-verify"
    element={<GoogleVerify />}
/>
            <Route
                path="/verify-email"
                element={<VerifyEmail />}
            />
            <Route
    path="/reset-password"
    element={<ResetPassword />}
/>

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/performance"
                element={
                    <ProtectedRoute>
                        <Performance />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/contests"
                element={
                    <ProtectedRoute>
                        <Contests />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboards"
                element={
                    <ProtectedRoute>
                        <CustomDashboards />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/dashboards/:dashboardId"
                element={
                    <ProtectedRoute>
                        <CustomDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
    );
}

export default App;