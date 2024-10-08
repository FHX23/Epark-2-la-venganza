import { Routes, Route } from "react-router-dom";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Home from "./pages/protected/Home";
import Profile from "./pages/protected/Profile";
import Error404 from "./pages/public/Error404";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Users from "./pages/protected/Users";
import Landing from "./pages/public/Landing";
import ParkingSpots from "./pages/protected/ParkingSpots";
import MainLayout from "./components/layout/MainLayout";
import Settings from "./pages/protected/Settings";
import DashboardSupport from "./pages/protected/Support/Dashboard";
import CreateIssue from "./pages/protected/Support/CreateIssue";
import ViewIssue from "./pages/protected/Support/ViewIssue";
import VehicleDashboard from "./pages/protected/Vehicle/Dashboard";
import GetByLicensePlate from "./pages/protected/Vehicle/GetByLicensePlate";
import UpdateVehicleByLicensePlate from "./pages/protected/Vehicle/UpdateVehicleByLicensePlate";
import GetAllVehicles from "./pages/protected/Vehicle/GetAllVehicles";
import CreateQuadrants from "./pages/protected/Quadrant/CreateQuadrants";
import UpdateQuadrants from "./pages/protected/Quadrant/UpdateQuadrant";
import DashboardQuadrant from "./pages/protected/Quadrant/Dashboard";
import DashboardDocuments from "./pages/protected/Upload/Dashboard";
import SpaceManagement from "./pages/protected/ParkingSpot/SpaceManagement";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rutas protegidas con layout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/vehicle/dashboard" element={<VehicleDashboard />} />
        <Route
          path="/vehicle/GetByLicensePlate"
          element={<GetByLicensePlate />}
        />
        <Route
          path="/vehicle/UpdateVehicleByLicensePlate"
          element={<UpdateVehicleByLicensePlate />}
        />
        <Route 
        path="/vehicle/GetAllVehicles" 
        element={<GetAllVehicles/>}>
        </Route>
        <Route path="/quadrants/dashboard" element={<DashboardQuadrant />} />
        <Route path="/quadrants/create" element={<CreateQuadrants />} />
        <Route path="/quadrants/update" element={<UpdateQuadrants />} />
        <Route path="/parking-spots" element={<ParkingSpots />} />
        <Route path="/support/dashboard" element={<DashboardSupport />} />
        <Route path="/support/createissue" element={<CreateIssue />} />
        <Route path="/support/viewissue" element={<ViewIssue />} />
        <Route path="/upload/dashboard" element={<DashboardDocuments />} />
        <Route
          path="/parkingspot/spacemanagement"
          element={<SpaceManagement />}
        />
        "
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
export default AppRouter;
