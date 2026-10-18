import { Routes, Route } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import RedirectIfAuthed from "./routes/RedirectIfAuthed";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorRegister from "./pages/DoctorRegister";
import Dashboard from "./pages/Dashboard";
import Query from "./pages/Query";
import Results from "./pages/Results";
import DoctorProfile from "./pages/DoctorProfile";
import Appointments from "./pages/Appointments";
import AppointmentDetail from "./pages/AppointmentDetail";
import Nurse from "./pages/Nurse";
import NurseVisits from "./pages/NurseVisits";
import Notifications from "./pages/Notifications";
import DoctorDashboard from "./pages/DoctorDashboard";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<RedirectIfAuthed><Login /></RedirectIfAuthed>} />
        <Route path="/register" element={<RedirectIfAuthed><Register /></RedirectIfAuthed>} />
        <Route path="/doctor/register" element={<RedirectIfAuthed><DoctorRegister /></RedirectIfAuthed>} />

        {/* Patient */}
        <Route element={<ProtectedRoute role="PATIENT" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/query" element={<Query />} />
          <Route path="/results/:queryId" element={<Results />} />
          <Route path="/doctors/:id" element={<DoctorProfile />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/nurse" element={<Nurse />} />
          <Route path="/nurse/visits" element={<NurseVisits />} />
        </Route>

        {/* Doctor */}
        <Route element={<ProtectedRoute role="DOCTOR" />}>
          <Route path="/doctor" element={<DoctorDashboard />} />
        </Route>

        {/* Both */}
        <Route element={<ProtectedRoute />}>
          <Route path="/appointments/:id" element={<AppointmentDetail />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}