// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Contact from "./pages/contact";
import FAQPage from "./pages/faq";
import StatusPage from "./pages/StatusPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQPage />} />

        {/* Status Pages */}
        <Route
          path="/maintenance"
          element={<StatusPage type="maintenance" />}
        />
        <Route
          path="/coming-soon"
          element={<StatusPage type="coming-soon" />}
        />
        <Route path="/success" element={<StatusPage type="success" />} />
        <Route
          path="/unauthorized"
          element={<StatusPage type="unauthorized" />}
        />
        <Route path="/error" element={<StatusPage type="500" />} />

        {/* 404 catch-all route */}
        <Route path="*" element={<StatusPage type="404" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
