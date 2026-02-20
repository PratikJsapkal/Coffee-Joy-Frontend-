"use client";

import { useState , useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import {  sellerLoginThunk } from "@/redux/features/authSlice";
import { useSelector , useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import AdminOtpVerification from "@/components/admin/AdminOtpVerification";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData , setFormData] =  useState({
    email : "",
    password : ""
  })

  const router = useRouter()
  const dispatch = useDispatch()
  const {tempUser , otpSent, otpVerified, loading, error } = useSelector((state)=>state.auth)

  const handleOnChange = (e)=>{
    const {name , value} = e.target
    setFormData({...formData , [name]: value})
  }


  console.log(formData)

   useEffect(() => {
    if (otpVerified) {
      router.push("/admin/admin-dashboard");
    }
  }, [otpVerified, router]);

  if (otpSent) {
    return <AdminOtpVerification email={tempUser || formData.email} />;
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative min-h-screen flex items-center justify-center px-4 pt-6"
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://cdns.barecms.com/images/login-bg.webp"
          alt="coffee background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1a120e]/80" />
      </div>

      {/* MAIN CARD */}
      <div className="flex w-full max-w-5xl h-full md:h-[85vh] rounded-3xl overflow-hidden shadow-2xl">

        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="hidden md:flex w-1/2 h-full items-center justify-center bg-[#1b1512] [clip-path:ellipse(100%_85%_at_0%_50%)]" >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <Image
              src="/images/SignUp.webp"
              alt="coffee"
              width={520}
              height={420}
              priority
            />
          </motion.div>
        </motion.div>

        {/* RIGHT DIV */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="w-full md:w-1/2 h-full px-6 sm:px-10 py-10
                     flex flex-col justify-center overflow-y-hidden"
        >
          <motion.h1
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            className="text-3xl sm:text-4xl font-cinzel text-center mb-10 text-white font-bold"
          >
            Seller Sign In
          </motion.h1>

          <motion.input
            variants={{
              hidden: { y: 15, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            type="email"
            value={formData.email}
            name="email"
            onChange={handleOnChange}
            placeholder="Email"
            className="w-full mb-6 bg-transparent border-b border-gray-300
                       focus:border-amber-500 focus:outline-none py-2
                       placeholder-gray-400 font-playfair font-semibold text-white"
          />

          {/* PASSWORD */}
          <motion.div
            variants={{
              hidden: { y: 15, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            className="relative mb-8"
          >
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              name="password"
              onChange={handleOnChange}
              placeholder="Password"
              className="w-full bg-transparent border-b border-gray-300
                         focus:border-amber-500 focus:outline-none py-2
                         placeholder-gray-400 pr-10 font-playfair font-semibold text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute right-2 top-2.5 text-gray-400 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </motion.div>

          {/* SIGN IN BUTTON */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={()=> dispatch(sellerLoginThunk(formData))}
            className="w-full py-3 rounded-full bg-linear-to-r  from-amber-600 to-orange-900 font-playfair font-bold shadow-lg text-white cursor-pointer">
            Sign In
          </motion.button>

        </motion.div>
      </div>
    </motion.div>
  );
}
