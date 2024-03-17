import { useEffect, useRef, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';
import "bootstrap/dist/js/bootstrap.bundle.min";

import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import axios from 'axios';
import Navbar from './components/Navbar';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import PrivateRoute from './Routes/PrivateRoute';
import Profile from './pages/Profile';
import Workout from './pages/Workout';
import Nutrition from './pages/Nutrition';
import Auth from './services/authServices';
import AuthUtils from './Utils/AuthUtils';
import Footer from './components/Footer';

function App() {
  const [loader, setLoader] = useState(true);
  const { isAuthenticated, logout, setToken, getToken, authAxios } = Auth();
  const { alert_, setBtn, setMsgs, setTypes, emptyForm, showAlert, email, setEmail, password, setPassword, name, setName, btn, profile, setProfile } = AuthUtils();
  const Logout = () => {
    useEffect(() => {
      logout();
    }, []);
    return <Navigate to="/login" replace />;
  };

  const handleUpdateProfile = async () => {
    try {
      setLoader(true);
      let formData = {
        file: profile,
        name: name,
        email: email,
        password: password
      };
      setMsgs([]);
      setTypes([]);


      if (password == "") {
        alert_("password Is required", 'danger');
      }
      if (email == "" && password == "" && name == "") {
        alert_("Please Fill Atleast One Field!", 'danger');
        setLoader(false);
        return false;
      };
     

      if (profile !== null) {
        let size = 2 * 1024 * 1024;
        if (profile.size > size) {
          alert_("File size should less than 2 MB.!", "danger");
          setLoader(false);
          return;
        }
      }
      setBtn({
        loading: true,
        disabled: true,
      });
      let response = await authAxios.post("update-profile", formData,{
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setBtn({
        loading: false,
        disabled: false,
      });
      if (response.data.status === 200) {
        alert_(response.data.msg, 'success');
      } else if (response.data.status === 443) {
        alert_(response.data.msg, 'danger');
      }
      else if (response.data.status === 500) {
        alert_(response.data.msg, 'danger');
      }
      else {
        alert_("Something Went Wrong!", 'danger');
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      alert_("Something Went Wrong! ", 'danger');
      console.log(error)
      setBtn({
        loading: false,
        disabled: false,
      });
    }
  }
  const handleLogin = async (email, password) => {
    try {
      let formData = {
        email: email,
        password: password
      };
      setMsgs([]);
      setTypes([]);


      if (email == "") {
        alert_("email Is required", 'danger');

      }
      if (password == "") {
        alert_("password Is required", 'danger');
      }
      if (email == "" || password == "") {
        return false;
      };
      setBtn({
        loading: true,
        disabled: true,
      });

      let response = await axios.post("http://localhost:5000/api/auth/login", formData);
      setBtn({
        loading: false,
        disabled: false,
      });
      if (response.data.status === 200) {
        emptyForm();
        alert_(response.data.msg, 'success');
        setToken(response.data.token)
        document.querySelector(`.nav-link[href='/']`).click();
      } else if (response.data.status === 443) {
        alert_(response.data.msg, 'danger');
      }
      else if (response.data.status === 500) {
        alert_(response.data.msg, 'danger');
      }
      else {
        alert_("Something Went Wrong!", 'danger');
      }

    } catch (error) {
      alert_("Something Went Wrong! ", 'danger');
      console.log(error)
      setBtn({
        loading: false,
        disabled: false,
      });
    }
  }
  return (
    <Router>
      <Navbar loader={loader} isAuthenticated={isAuthenticated} />
      <div className='row mx-0 row-cols-1 position-fixed col-md-4 col-12 end-0 gy-0' id='alert-row' style={{ "bottom": "0%"}}>
        {
          showAlert.show &&
          showAlert.msg.map((msg, index) => (
            <div className={`alert alert-sm my-1 alert-${showAlert.type[index]} text-center text-capitalize alert-dismissible fade show`} role="alert" key={index}>
              {msg}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          ))
        }
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} showAlert={showAlert} email={email} password={password} btn={btn} setPassword={setPassword} setEmail={setEmail} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/profile"
          element={<PrivateRoute handleUpdateProfile={handleUpdateProfile} name={name} email={email} password={password} setName={setName} setEmail={setEmail} setPassword={setPassword} loader={loader} setLoader={setLoader} Component={Profile} profile={profile} setProfile={setProfile} alert_={alert_} />}
        />
        <Route
          path="/workout"
          element={<PrivateRoute loader={loader} setLoader={setLoader} Component={Workout}alert_={alert_} setMsgs={setMsgs} setTypes={setTypes} />}
        />
        <Route
          path="/nutrition"
          element={<PrivateRoute loader={loader} setLoader={setLoader} Component={Nutrition}alert_={alert_} setMsgs={setMsgs} setTypes={setTypes} />}
        />
      </Routes>
      <Footer setLoader={setLoader} />
      {/* {setLoader(false)} */}
    </Router>
  )
}

export default App
