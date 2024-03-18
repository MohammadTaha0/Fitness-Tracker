import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthUtils from '../Utils/AuthUtils';
import '../assets/login.css';
export default function Login({ handleLogin, btn, email, setEmail, password, setPassword }) {

  return (
    <div className='min-h-100-vh row mx-0 px-0 align-items-center' id='login-body'>
      
      <form className='row row-cols-1 mx-0 col-md-4 col-sm-7 col-11 mx-auto shadow border lught-bg border-secondary rounded-3 gy-3 p-0 pb-4' onSubmit={(e) => {e.preventDefault();handleLogin(email, password);}}>
        <div className="col w-100 bg-dark text-light text-center py-3 mt-0">
          <h1 className='p-0 my-0 mb-1 text-uppercase'>Login</h1>
          <p className='py-0 my-0 fs-8 col-md-7 col-11 m-auto text-light'>
            Elevate your fitness journey! Register now and start tracking your progress with us. Your path to a healthier, stronger you begins here.
          </p>
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
