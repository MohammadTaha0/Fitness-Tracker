import React from 'react'
import strength from '../../public/register.jpg';

export default function About() {
  return (
    <div style={{ "height": "90vh" }} className='position-relative overflow-hidden section-2'>
      <img src={strength} className='w-100 d-block h-100 object-fit-cover' alt="" />
      <div className=' position-absolute start-0 text-center w-100  shadow light-light-bg p-4 ' style={{ "top": "18%"}}>
        <h1 className="text-center text-white fw-bold">
          About Us
        </h1>
        <p className='m-0 p-0 text-white col-md-12 mx-auto p-4 h6' style={{"lineHeight":"32px"}}>
          Welcome to Fitness Tracker, where we understand the evolving landscape of health and fitness in the digital age. In recent years, there has been a significant surge in health and fitness consciousness worldwide. With the advent of technology and the proliferation of smartphones, individuals are increasingly turning to digital solutions to manage and monitor their fitness journeys. This growing demand has paved the way for comprehensive fitness tracking applications that cater to the diverse needs of fitness enthusiasts.
          <br />
          <br />
          At Fitness Tracker, we recognize the need for an intuitive and comprehensive platform to help users track their fitness activities, including workouts, nutrition, and progress over time. Our application is designed to empower users to take control of their health and achieve their fitness goals with ease.
          <br />
          <br />
          Whether you're a seasoned athlete or just beginning your fitness journey, our goal is to provide you with the tools and support you need to succeed. From personalized workout plans to real-time progress tracking, Fitness Tracker is your partner in achieving a healthier, happier lifestyle.
          <br />
          <br />
          Join us on this journey towards better health and fitness. Start tracking your progress today with Fitness Tracker.
        </p>
      </div>
    </div>
  )
}
