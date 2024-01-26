import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
export default function Navbar() {
    useEffect(() => {
        const currentPath = window.location.pathname;

        console.log(currentPath)
        document.querySelector(".nav-link").classList.remove("active");
        const activeLink = document.querySelector(`.nav-link[href='${currentPath}']`);

        console.log(activeLink)
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
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
                <div className="container-fluid">
                    <NavLink className="navbar-brand text-center text-info" to="/">
                        <h4 className="p-0 m-0">
                            FT
                        </h4>
                        <h6 className='p-0 m-0'>FitnessTracker</h6>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                            <li>
                                <div className="input-group m-0 p-0 p-2">
                                    <NavLink to="/login" className='btn btn-outline-info my-0 text-capitalize px-4 btn-sm'>login</NavLink>
                                    <NavLink to="/register" className='btn btn-outline-info my-0 text-capitalize px-4 btn-sm'>Register</NavLink>

                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
