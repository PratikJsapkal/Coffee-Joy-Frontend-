"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoMail } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { forgotpassThunk } from "@/redux/features/authSlice";
import { useDispatch , useSelector } from "react-redux";
import ResetPasswordPage from "@/components/ResetPassword";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const {forgotSteps} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()

  const handleSendOtp = () => {
    dispatch(forgotpassThunk({email}))
  };

 console.log(email)

  if(forgotSteps === "OTP"){
    return <ResetPasswordPage/>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen flex items-center justify-center px-4"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://cdns.barecms.com/images/login-bg.webp"
          alt="background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1a120e]/80" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-3xl bg-[#2a211c]/80
                   backdrop-blur-xl px-6 sm:px-10 py-10
                   text-white shadow-2xl"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-amber-600/20 flex items-center justify-center">
            <IoMail size={26} className="text-amber-500" />
          </div>
        </div>

        <h2 className="text-3xl font-cinzel text-center mb-2">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-300 text-center mb-8">
          Enter your email and we’ll send you an OTP
        </p>
          <>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-6 bg-transparent border-b border-white/60
                         focus:border-amber-500 focus:outline-none py-2"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              // onClick={handleSendOtp}
              onClick={handleSendOtp}
              className="w-full py-3 rounded-full
                         bg-gradient-to-r hover:from-amber-600 to-orange-800
                         font-bold font-playfair disabled:opacity-50"
            >
              Send OTP
            </motion.button>
          </>
        <div className="mt-8 text-center">
          <Link
            href="/Auth/login"
            className="text-sm text-gray-300 hover:text-amber-400 hover:underline"
          >
            ← Back to Sign In
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
