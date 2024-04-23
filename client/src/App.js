import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Passwordpage from "./Pages/Passwordpage";
import PasswordVault from "./Pages/PasswordVault";
import LoginPage from "./Pages/Loginpage";
import SignupPage from "./Pages/Signuppage";
import Footer from "./Components/Footer";
import { GlobalProvider } from "./GlobalContext";

const App = () => {
  return (
    <>
      <Router>
        <GlobalProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/password-manager" element={<Passwordpage />} />
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/password-vault" element={<PasswordVault />} />
          </Routes>
          <Footer /> {/* Include the Footer component */}
        </GlobalProvider>
      </Router>
    </>
  );
};

export default App;
