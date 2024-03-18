import React from 'react'
import Auth from '../services/authServices'
import section1 from '../../public/home.jpg';
import { NavLink } from 'react-router-dom';
export default function Home() {
    const { isAuthenticated } = Auth();

    return (
        <div style={{ "height": "90vh" }} className='position-relative'>
            <img src={section1} className='w-100 d-block h-100 object-fit-cover' alt="" />
            <div className=' position-fixed start-0 text-center w-100' style={{ "top": "40%" }}>
                <h1 className='m-0 p-0 text-white col-md-8 mx-auto fw-bold p-5 rounded-pill'>Train hard, track progress, transform yourself.</h1>
                <div className="input-group p-0 m-0 my-0 justify-content-center col-md-8 mx-auto">
                    <NavLink to="/workout" className="btn btn-outline-light">
                        Start Workout
                    </NavLink>
                    <NavLink to="/nutrition" className="btn btn-outline-light">
                        Track Nutritions
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
