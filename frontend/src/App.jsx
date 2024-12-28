import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import CreateUpdateCourseForm from "./components/CreateUpdateCourseForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/edit-course/:courseId" element={<CreateUpdateCourseForm />} />

      </Routes>
    </Router>
  );
};

export default App;
