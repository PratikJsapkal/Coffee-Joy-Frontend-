"use client";

import { ToastContainer , Bounce } from "react-toastify";
import React from 'react'

const ToastProvider = () => {
  return (
    <div>
         <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>

    </div>
  )
}

export default ToastProvider