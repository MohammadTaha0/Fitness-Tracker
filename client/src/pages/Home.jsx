import React from 'react'
import Auth from '../services/authServices'
import section1 from '../../public/home.jpg';
import calories from '../../public/profile.jpg';
import macros from '../../public/login.jpg';
import strength from '../../public/muscular-young-man-lifting-weights-black-background.jpg';
import cardio from '../../public/black-white-photo-muscular-build-man-using-sports-chalk-hands-while-weightlifting-gym.jpg';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

export default function Home() {

    const { isAuthenticated } = Auth();
    return (
        <>
            <div style={{ "height": "90vh" }} className='position-relative overflow-hidden section-1'>
                <img src={section1} className='w-100 d-block h-100 object-fit-cover' alt="" />
                <div className=' position-fixed start-0 text-center w-100 z-1ndex--1 light-light-bg' style={{ "top": "40%" }}>
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
            <div style={{ "height": "90vh" }} className='position-relative overflow-hidden section-2'>
                <img src={calories} className='w-100 d-block h-100 object-fit-cover' alt="" />
                <div className=' position-absolute start-0 text-center w-100' style={{ "top": "38%" }}>
                    <h1 className='m-0 p-0 text-white col-md-12 mx-auto fw-bold p-4  shadow light-light-bg'>Track Your Calories.
                        <br />
                        <NavLink to="/nutrition" className="btn btn-outline-light btn-lg my-3">
                            Let's Track
                        </NavLink>
                    </h1>
                </div>
            </div>

            <div style={{ "height": "90vh" }} className='position-relative overflow-hidden section-2'>
                <img src={strength} className='w-100 d-block h-100 object-fit-cover' alt="" />
                <div className=' position-absolute start-0 text-center w-100' style={{ "top": "38%" }}>
                    <h1 className='m-0 p-0 text-white col-md-12 mx-auto fw-bold p-4  shadow light-light-bg'>Track Your Strength.
                        <br />
                        <NavLink to="/workout" className="btn btn-outline-light btn-lg my-3">
                            Let's Track
                        </NavLink>
                    </h1>
                </div>
            </div>
            <div style={{ "height": "90vh" }} className='position-relative overflow-hidden section-2'>
                <img src={macros} className='w-100 d-block h-100 object-fit-cover' alt="" />
                <div className=' position-absolute start-0 text-center w-100' style={{ "top": "38%" }}>
                    <h1 className='m-0 p-0 text-white col-md-12 mx-auto fw-bold p-4  shadow light-light-bg'>Track Your Macros.
                        <br />
                        <NavLink to="/nutrition" className="btn btn-outline-light btn-lg my-3">
                            Let's Track
                        </NavLink>
                    </h1>
                </div>
            </div>
            <div style={{ "height": "90vh" }} className='position-relative overflow-hidden section-2'>
                <img src={cardio} className='w-100 d-block h-100 object-fit-cover' alt="" />
                <div className=' position-absolute start-0 text-center w-100' style={{ "top": "38%" }}>
                    <h1 className='m-0 p-0 text-white col-md-12 mx-auto fw-bold p-4  shadow light-light-bg'>Track Your Cardio.
                        <br />
                        <NavLink to="/workout" className="btn btn-outline-light btn-lg my-3">
                            Let's Track
                        </NavLink>
                    </h1>
                </div>
            </div>

        </>

    )
}
