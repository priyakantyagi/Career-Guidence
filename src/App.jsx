import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { ScoreProvider } from "./Context/ScoreContext";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import CareerSelection from "./Components/CareerSelection/CareerSelection";
import LocationSelection from "./Components/LocationSelection/LocationSelection";
import CollegeList from "./Components/CollegeList/CollegeList";
import CollegeSelection from "./Components/CollegeSelection/CollegeSelection";
import CollegeRegistration from "./Components/CollegeRegistration/CollegeRegistration";
import StudentDetails from "./Components/StudentDetails/StudentDetails";
import Aptitude from "./Components/Aptitude Test/Aptitude";
import QuantitativeTest from "./Components/Aptitude Test/QuantitativeTest/QuantitativeTest";
import VerbalTest from "./Components/Aptitude Test/Verbal Test/VerbalTest";
import GeneralKnowledgeTest from "./Components/Aptitude Test/GeneralKnow Test/GkTest";
import TestCompletion from "./Components/TestCompletion/TestCompletion";
import CheckEligibility from "./Components/CheckEligibility/CheckEligibility";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
// import "./AppDescription.css";

function Layout({ children, session }) {
  const location = useLocation();

  const hideFooterRoutes = [
    "/college-selection",
    "/college-register",
    "/student-details",
    "/aptitude-test",
    "/quantitative-test",
    "/verbal-test",
    "/generalKnowledge-test",
    "/test-completion",
    "/check-eligibility"
  ];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Navbar session={session} />

      {/* {session && (
        // <div className="app-description">
        //   Career Guidance helps students explore opportunities & make informed choices based on their interests, location, and aptitude performance.
        // </div>
      )} */}

      {children}

      {!shouldHideFooter && <Footer />}
    </>
  );
}

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <ScoreProvider>
      <Router>
        <Layout session={session}>
          <Routes>
            {!session ? (
              <>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/career-selection" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/career-selection" />} />
                <Route path="/career-selection" element={<CareerSelection />} />
                <Route path="/location-selection" element={<LocationSelection />} />
                <Route path="/college-list" element={<CollegeList />} />
                <Route path="/college-selection" element={<CollegeSelection />} />
                <Route path="/college-register" element={<CollegeRegistration />} />
                <Route path="/student-details" element={<StudentDetails />} />
                <Route path="/aptitude-test" element={<Aptitude />} />
                <Route path="/quantitative-test" element={<QuantitativeTest />} />
                <Route path="/verbal-test" element={<VerbalTest />} />
                <Route path="/generalKnowledge-test" element={<GeneralKnowledgeTest />} />
                <Route path="/test-completion" element={<TestCompletion />} />
                <Route path="/check-eligibility" element={<CheckEligibility />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Navigate to="/login" />} />
                <Route path="/signup" element={<Navigate to="/signup" />} />
              </>
            )}
          </Routes>
        </Layout>
      </Router>
    </ScoreProvider>
  );
}

export default App;
