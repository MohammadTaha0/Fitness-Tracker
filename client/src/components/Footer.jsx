import React, { useEffect } from 'react'

export default function Footer({setLoader}) {
    useEffect(()=>{
        setTimeout(() => {            
            setLoader(false);
        }, 1000);
    }, []);
  return (
    <div>
      
    </div>
  )
}
