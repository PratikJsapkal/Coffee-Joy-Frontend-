"use client";

import { useState ,useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Mailbox } from "lucide-react";
import { useDispatch , useSelector  } from "react-redux";
import { resetPasswordThunk } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [userInfo, setUserInfo] = useState({
    email : "",
    newPassword :""
  });
  const [showPass, setShowPass] = useState(false);
  const [otp , setOtp] = useState(Array(6).fill(""))
  const dispatch = useDispatch()
  const router = useRouter()
  const {isResetPass} = useSelector((state)=>state.auth)

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").trim();
    if (!/^\d{1,6}$/.test(paste)) return;
    const pasteDigits = paste.split("").slice(0, 6);
    const newOtp = [...otp];
    pasteDigits.forEach((digit, i) => (newOtp[i] = digit));
    setOtp(newOtp);
    const nextIndex = pasteDigits.length < 6 ? pasteDigits.length : 5;
    document.getElementById(`otp-${nextIndex}`)?.focus();
  };

console.log(userInfo , otp)

const handleResetPass = (e) => {
  e.preventDefault();

  if (!userInfo.email || !userInfo.newPassword) {
    alert("Please fill all fields");
    return;
  }

  const otpCode = otp.join("");
  if (otpCode.length !== 6) {
    alert("Please enter valid OTP");
    return;
  }

  const payload = {
    email: userInfo.email,
    newPassword: userInfo.newPassword,
    otp: otpCode,
  };

  dispatch(resetPasswordThunk(payload));
};

useEffect(()=>{
   if(isResetPass){
    router.push("/Auth/login")
   }
},[ isResetPass , router])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex items-center justify-center px-4"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/login-bg.webp" // use your uploaded image here
          alt="background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md sm:max-w-lg rounded-3xl bg-white/10 backdrop-blur-xl shadow-2xl px-6 sm:px-10 py-10 text-white"
      >
        {/* Top Image */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-600/20 
                  flex items-center justify-center shadow-xl backdrop-blur-md">
           <Mailbox size={48} className="text-orange-400 drop-shadow-lg" />
            </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Reset password
        </h2>

        <form onSubmit={handleResetPass} className="space-y-5">
          {/* email */}
          <div className="space-y-1">
            <label className="text-sm text-gray-200">Email</label>
            <div className="relative">
              <input
                type="email"
                value={userInfo.email}
                placeholder="Enter Your Email"
                onChange={(e) => setUserInfo({...userInfo , email : e.target.value})}
                className="w-full pl-5 pr-10 py-3 rounded-xl bg-black/30 border border-white/20 focus:border-orange-400 outline-none"
              />
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <label className="text-sm text-gray-200">New password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPass ? "text" : "password"}
                value={userInfo.newPassword}
                onChange={(e) => setUserInfo({...userInfo , newPassword : e.target.value})}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/30 border border-white/20 focus:border-orange-400 outline-none"
              />
               <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-200">Enter OTP</label>
            <div className="relative">
              {
                otp.map((digit , i)=>(
                  <input 
                   key={i}
                   id={`otp-${i}`}
                   value={digit}
                   maxLength={1}
                   onChange={(e) => handleChange(e.target.value, i)}
                   onKeyDown={(e) => handleKeyDown(e, i)}
                   onPaste={handlePaste}
                   className=" w-10 h-12 sm:w-12 sm:h-12 text-center ml-2 mt-2 text-lg bg-transparent border border-white/40 focus:border-amber-500 rounded-xl"
                  />
                ))
              }
            </div>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full py-3 rounded-full text-lg font-semibold bg-gradient-to-r from-orange-500 to-amber-600 shadow-lg"
          >
            Reset Password
          </motion.button>
        </form>

        {/* Back */}
        <div className="mt-6 text-center">
          <Link
            href="/Auth/login"
            className="text-sm text-gray-200 hover:text-orange-400 transition"
          >
            ← Back to Sign In
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
