"use client";

import { useState ,useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaRegEye ,FaRegEyeSlash  } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useSelector ,useDispatch } from "react-redux";
import { singupThunk} from "@/redux/features/authSlice"
import  Otp from "@/components/Otp"
import { useRouter } from "next/navigation"


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {otpSent , loading , error,otpVerified} =useSelector((state)=>state.auth)
  const router = useRouter();
  const dispatch = useDispatch()
  const [fromData , setFromData]= useState({
    name : "",
    email :"",
    password:""
  })

  const handleOnclick = (e)=>{
    const {name , value}=e.target
    setFromData({...fromData , [name] : value})
  }

  console.log(fromData)

  const handleSignup =()=>{
    dispatch(singupThunk(fromData))
  }

   useEffect(() => {
    if (otpVerified) {
      router.push("/Auth/login");
    }
  }, [otpVerified, router]);

if(otpSent){
  return <Otp email={fromData.email} />
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

        {/* LEFT IMAGE */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="hidden md:flex w-1/2 h-full items-center justify-center
                     bg-[#1b1512]
                     [clip-path:ellipse(100%_85%_at_0%_50%)]"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <Image
              src="https://cdns.barecms.com/images/SignUp.webp"
              alt="coffee"
              width={520}
              height={420}
              priority
            />
          </motion.div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="w-full md:w-1/2 h-full px-6 sm:px-10 py-10
                     flex flex-col justify-center overflow-y-hidden"
        >
          <motion.h2
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            className="text-3xl sm:text-4xl font-cinzel text-center mb-10 text-white font-bold"
          >
            Sign Up
          </motion.h2>

          {/* FULL NAME */}
          <motion.input
            variants={{
              hidden: { y: 15, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            type="text"
            name="name"
            value={fromData.name}
            onChange={handleOnclick}
            placeholder="Name"
            className="w-full mb-6 bg-transparent border-b border-gray-300
                       focus:border-amber-500 focus:outline-none py-2
                       placeholder-gray-400 font-playfair text-white"
          />

          {/* EMAIL */}
          <motion.input
            variants={{
              hidden: { y: 15, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            type="email"
            name="email"
            value={fromData.email}
            onChange={handleOnclick}
            placeholder="Email"
            className="w-full mb-6 bg-transparent border-b border-white/70
             focus:border-amber-500 focus:outline-none py-2 placeholder-gray-400 font-playfair"
          />

          {/* PASSWORD */}
          <motion.div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={fromData.password}
              placeholder="Password"
              onChange={handleOnclick}
              className="w-full bg-transparent border-b border-gray-300
                         focus:border-amber-500 focus:outline-none py-2
                         placeholder-gray-400 pr-10 font-playfair text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute right-2 top-2.5 text-gray-400 hover:text-white"
            >
              {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
            </button>
          </motion.div>
          <motion.button
            onClick={handleSignup} disabled={loading}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full py-3 rounded-full bg-gradient-to-r
                       from-amber-600 to-orange-900
                       font-playfair font-bold shadow-lg text-white cursor-pointer"
          >
            {loading ? "Sending OTP" : "Create new account"}
          </motion.button>

          {/* SOCIAL LOGIN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="flex-1 h-px bg-gray-500/40" />
              <span className="text-sm text-gray-300">or continue with</span>
              <span className="flex-1 h-px bg-gray-500/40" />
            </div>

            <div className="flex justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                // className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg"
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center
                           shadow-lg hover:shadow-[0_0_25px_#ffffff] cursor-pointer"
              >
                <FcGoogle size={22} />
              </motion.button>

            </div>

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
      </div>
    </motion.div>
  );
}
