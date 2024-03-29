import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../assets/register.css';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [types, setTypes] = useState([]);
  const [showAlert, setShowAlert] = useState({
    show: true,
    msg: msgs,
    type: types
  });

  const alert_ = (msg, type) => {
    setMsgs(prevMsgs => [...prevMsgs, msg]);
    setTypes(prevTypes => [...prevTypes, type]);
    setShowAlert(prevShowAlert => ({
      ...prevShowAlert,
      show: true,
      msg: [...prevShowAlert.msg, msg],
      type: [...prevShowAlert.type, type]
    }));
  };
  const [btn, setBtn] = useState({
    loading: false,
    disabled: false,
  });

  const emptyForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setBtnDisabled(false);
  }


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let formData = {
        name: name,
        email: email,
        password: password
      };
      setMsgs([]);
      setTypes([]);

      if (name == "") {
        alert_("name Is required", 'danger');
      }
      if (email == "") {
        alert_("email Is required", 'danger');

      }
      if (password == "") {
        alert_("password Is required", 'danger');
      }
      if (name == "" || email == "" || password == "") {
        return false;
      };
      setBtn({
        loading: true,
        disabled: true,
      });

      let response = await axios.post("http://localhost:5000/api/auth/register", formData);
      setBtn({
        loading: false,
        disabled: false,
      }); if (response.data.status === 200) {
        emptyForm();
        alert_(response.data.msg, 'success');
      } else if (response.data.status === 443) {
        alert_(response.data.msg, 'danger');
      }
      else {
        alert_("Something Went Wrong!", 'danger');
      }

    } catch (error) {
      alert_("Something Went Wrong!", 'danger');
      setBtn({
        loading: false,
        disabled: false,
      });
    }
  }
  return (
    <div className='min-h-100-vh row mx-0 px-0 align-items-center' id='register-body'>
      <div className='row mx-0 row-cols-1 position-fixed col-md-4 col-12 end-0 gy-0' style={{ "bottom": "0%" }}>
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
      <form className='row row-cols-1 mx-0 col-md-4 col-sm-7 col-11 mx-auto shadow border rounded-3 light-bg gy-3 p-0 pb-4' onSubmit={handleRegister}>
        <div className="col w-100 bg-dark text-light text-center py-3 mt-0">
          <h1 className='p-0 my-0 mb-1 text-uppercase'>Register</h1>
          <p className='py-0 my-0 fs-8 col-md-7 col-11 m-auto text-light'>
            Elevate your fitness journey! Register now and start tracking your progress with us. Your path to a healthier, stronger you begins here.
          </p>
        </div>

        <div className="col px-4">
          <label htmlFor="">Name:</label>
          <input type="text" placeholder='Name' name='name' value={name} onChange={(e) => setName(e.target.value)} className='form-control' />
        </div>
        <div className="col px-4">
          <label htmlFor="">Email:</label>
          <input type="text" placeholder='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' />
        </div>
        <div className="col px-4">
          <label htmlFor="">Password:</label>
          <input type="password" placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' />
        </div>
        <div className="col px-4">
          <button type='submit' className='btn btn-dark w-100' disabled={btn.disabled && "disabled"}>Let's Go <i className='fa-light fa-check-circle'></i> {btn.loading && <span className='spinner-border spinner-border-sm border-1 ms-1'></span>} </button>
        </div>
      </form>
    </div>
  )
}
