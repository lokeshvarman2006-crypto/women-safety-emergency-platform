import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import UserLogin from "./pages/Auth/UserLogin";
import Register from "./pages/Auth/Register";

import UserDashboard from "./pages/User/UserDashboard";
import Profile from "./pages/User/profile";
import Contacts from "./pages/User/Contacts";
import AddContact from "./pages/User/AddContact";
import EditContact from "./pages/User/EditContact";
import SOSHistory from "./pages/User/SOSHistory";

import VolunteerDashboard from "./pages/Volunteer/VolunteerDashboard";
import VolunteerRegister from "./pages/Volunteer/VolunteerRegister";
import VolunteerLogin from "./pages/Volunteer/VolunteerLogin";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLogin from "./pages/Admin/AdminLogin";
import SOSManagement from "./pages/Admin/SOSManagement";
import VolunteerManagement from "./pages/Admin/VolunteerManagement";

import ProtectedRoute from "./components/protected/ProtectedRoute";
import VolunteerRoute from "./components/protected/VolunteerRoute";
import AdminRoute from "./components/protected/AdminRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public */}

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/login/user"
          element={<UserLogin />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/volunteer/login"
          element={<VolunteerLogin />}
        />

        <Route
          path="/volunteer/register"
          element={<VolunteerRegister />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* User */}

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
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
          path="/contacts"
          element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-contact"
          element={
            <ProtectedRoute>
              <AddContact />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-contact/:id"
          element={
            <ProtectedRoute>
              <EditContact />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sos-history"
          element={
            <ProtectedRoute>
              <SOSHistory />
            </ProtectedRoute>
          }
        />


        {/* Volunteer */}

        <Route
          path="/volunteer/dashboard"
          element={
            <VolunteerRoute>
              <VolunteerDashboard />
            </VolunteerRoute>
          }
        />


        {/* Admin */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/sos"
          element={
            <AdminRoute>
              <SOSManagement />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/volunteers"
          element={
            <AdminRoute>
              <VolunteerManagement />
            </AdminRoute>
          }
        />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

    </BrowserRouter>
  );
}

export default App;