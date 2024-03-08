import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Auth from '../services/authServices';
export default function Navbar({ isAuthenticated, loader }) {
    // const { isAuthenticated } = Auth();
    useEffect(() => {
        const currentPath = window.location.pathname;

        document.querySelector(".nav-link").classList.remove("active");
        const activeLink = document.querySelector(`.nav-link[href='${currentPath}']`);

        if (activeLink) {
            activeLink.classList.add('active');
        }

        return () => {
            if (activeLink) {
                activeLink.classList.remove('active');
            }
        };
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 sticky-top">
                <div className="container-fluid">
                    <NavLink className="navbar-brand text-center text-info" to="/">
                        <h4 className="p-0 m-0 d-flex align-items-center justify-content-center gap-1">
                            FT
                            {
                                loader &&
                                <span className='spinner-border spinner-border-sm border-1'></span>
                            }
                        </h4>
                        <h6 className='p-0 m-0'>
                            FitnessTracker
                        </h6>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto align-items-center">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            {
                                isAuthenticated() &&
                                <>
                                    <li className='nav-item'>
                                        <NavLink to='/profile' className='nav-link'><i className='fa-light fa-user-circle '></i> Profile</NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to='/workout' className='nav-link'><i className='fa-light fa-dumbbell '></i> Workout</NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to='/nutrition' className='nav-link'><i className='fa-light fa-dumbbell '></i> Nutrition</NavLink>
                                    </li>
                                </>
                            }
                            <li>
                                <div className="input-group m-0 p-0 p-2">
                                    {!isAuthenticated() ?
                                        <>
                                            <NavLink to="/register" className='btn btn-outline-info my-0 text-capitalize px-4 btn-sm'>Register</NavLink>
                                            <NavLink to="/login" className='btn btn-outline-info my-0 text-capitalize px-4 btn-sm'>login</NavLink>
                                        </> :
                                        <NavLink to="/logout" className='btn btn-outline-danger my-0 text-capitalize px-4 btn-sm'>logout</NavLink>
                                    }
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
