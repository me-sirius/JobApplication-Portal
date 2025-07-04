import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/Apply_Job'
import AuthPage from './pages/AuthPage';
import AppliedJobs from './pages/AppliedJobs'
import RecruiterLogin from './components/RecruiterLogin';

const App = () => {
  return (
    <div>
      <RecruiterLogin />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        {/* Add other routes here */}
      </Routes>
    </div>
  )
}

export default App