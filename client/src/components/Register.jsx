import React, { useState } from 'react'
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    msg: "",
    type: "success"
  });
  const alert_ = (msg, type) => {
    setShowAlert({
      show: true,
      msg: msg,
      type: type
    });
  }
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
      if (name == "") {
        alert_("name Is required", 'danger');
        return false;
      }
      if (email == "") {
        alert_("email Is required", 'danger');
        return false;
      } if (password == "") {
        alert_("password Is required", 'danger');
        return false;
      }
      setBtnDisabled(true);

      let response = await axios.post("http://localhost:5000/api/register", formData);
      setBtnDisabled(false);
      if (response.status === 200) {
        emptyForm();
        alert_(response.data.msg, 'success');
      } else if (response.status === 400) {
        alert_(response.data.msg, 'danger');
      }
      else {
        alert_("Something Went Wrong!", 'danger');
      }

    } catch (error) {
      if (error.response.status == 400) {
        alert_(error.response.data.msg, 'danger');
      }else{
        alert_("Something Went Wrong!", 'danger');
      }
      setBtnDisabled(false)
    }
  }
  return (
    <div className='min-h-100-vh row mx-0 px-0 align-items-center'>
      <form className='row row-cols-1 mx-0 col-md-6 col-11 mx-auto shadow border rounded-3 gy-3 p-0 pb-4' onSubmit={handleRegister}>
        <div className="col w-100 bg-dark text-light text-center py-3 mt-0">
          <h1 className='p-0 my-0 mb-1 text-uppercase'>Register</h1>
          <p className='py-0 my-0 fs-8 col-md-7 col-11 m-auto text-light'>
            Elevate your fitness journey! Register now and start tracking your progress with us. Your path to a healthier, stronger you begins here.
          </p>
        </div>
        {
          showAlert.show &&
          <div className="col">
            <div className={`alert alert-${showAlert.type} text-center text-capitalize`}>
              {showAlert.msg}
            </div>
          </div>
        }
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
          <button type='submit' className='btn btn-dark w-100' disabled={btnDisabled}>Let's Go <i className='fa-light fa-check-circle'></i></button>
        </div>
      </form>
    </div>
  )
}
