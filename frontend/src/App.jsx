import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Contact from './pages/Contact';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Admin
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import ManageMessages from './pages/Admin/ManageMessages';
import ManageStats from './pages/Admin/ManageStats';
import ManageProjects from './pages/Admin/ManageProjects';
import ManageExperience from './pages/Admin/ManageExperience';
import ManageEducation from './pages/Admin/ManageEducation';
import ManageTechStack from './pages/Admin/ManageTechStack';
import ManageContent from './pages/Admin/ManageContent';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="messages" element={<ManageMessages />} />
              <Route path="stats" element={<ManageStats />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="experience" element={<ManageExperience />} />
              <Route path="education" element={<ManageEducation />} />
              <Route path="tech-stack" element={<ManageTechStack />} />
              <Route path="content" element={<ManageContent />} />
            </Route>
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
