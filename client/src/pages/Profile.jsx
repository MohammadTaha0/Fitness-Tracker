import React, { useEffect, useState } from 'react'
import AuthUtils from '../Utils/AuthUtils';
import Auth from '../services/authServices';

export default function Profile({ handleUpdateProfile, name, email, password, setName, setEmail, setPassword, loader, setLoader }) {
  const { authAxios } = Auth();
  useEffect(() => {
    const fetching_data = async () => {
      const res = await authAxios.get("get-user");
      if (res.data.status === 200) {
        setName(res.data.data.name);
        setEmail(res.data.data.email);
        setPassword("");
        setLoader(false);
      }
    }
    fetching_data();
  }, []);

  return (
    <>
      <div className="row justify-content-center align-items-center mx-auto" style={{ "minHeight": "90vh" }} >
        <div className="col-md-4 col-12 border rounded-3 shadow row p-3 ">
          <form onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }} className="input-group mx-0 px-0 gap-3">
            <h2 className='text-center fw-bold w-100 text-primary'>Update Profile</h2>

            {
              !loader ?
                <>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='form-control w-100' placeholder='Name' />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='form-control w-100' placeholder='Email' />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='form-control w-100 mb-0`' placeholder='Password' />
                  <span className='text-bg-primary text-center fs-7 p-0 m-0 rounded-1  w-100 text-wrap fw-normal py-1'>Leave the password field empty if you do not wish to update your password</span>
                  <button type='submit' className='btn btn-outline-primary w-100'><i className='fa-light fa-check-circle'></i> Update</button></> : <>
                  <div className="col text-center d-flex  gap-2 justify-content-center align-items-center">
                    <span className='spinner-border border-1 '></span> Please Wait
                  </div>
                </>
            }
          </form>
        </div>
      </div>
    </>
  )
}
