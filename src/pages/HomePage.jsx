import React from 'react'
import { IoMdLock } from "react-icons/io";
import image1 from "../assets/homepage_img.png";
import SideBar from '../components/SideBar';

const HomePage = ({ groups, openModal }) => {
  return (
    <>
    <div className='container'>
      <SideBar openModal={openModal} groups={groups}/>
      <div className='right-section'>
        <div className='content'>
          <img src={image1} className='hompageImg'/>
          <h2>Pocket Notes</h2>
          <p>Send and receive messages without keeping your phone online. <br/>
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
        </div>
        <div className='encrypt-msg'>
        <p><span className='encrypt-icon'><IoMdLock /></span>end-to-end encrypted</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default HomePage
