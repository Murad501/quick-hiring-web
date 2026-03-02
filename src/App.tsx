import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import "./App.css";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Companies from "./pages/Companies";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import AdminLayout from "./components/Admin/AdminLayout";
import Overview from "./pages/Admin/Overview";
import AdminJobs from "./pages/Admin/AdminJobs";
import JobApplications from "./pages/Admin/JobApplications";
import AllApplications from "./pages/Admin/AllApplications";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Overview />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="jobs/:id/applications" element={<JobApplications />} />
          <Route path="applications" element={<AllApplications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
