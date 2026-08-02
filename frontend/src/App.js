import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import JobsPage from "./pages/JobsPage";
import CandidatesPage from "./pages/CandidatesPage";
import PricingPage from "./pages/PricingPage";
import PostJobPage from "./pages/PostJobPage";
import CandidateSignupPage from "./pages/CandidateSignupPage";
import { Toaster } from "./components/ui/toaster";

function App() {
  useEffect(() => {
    document.title = "Vizarto \u2014 AI Skill-Based Hiring";
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/candidates" element={<CandidatesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/employers/post-job" element={<PostJobPage />} />
          <Route path="/candidates/signup" element={<CandidateSignupPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
