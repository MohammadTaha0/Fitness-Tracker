import React from 'react'
import Auth from '../services/authServices'

export default function Home() {
    const { isAuthenticated } = Auth();

    return (
        <div>
            {isAuthenticated()?(<>login</>):(<>Logout</>)}
        </div>
    )
}
