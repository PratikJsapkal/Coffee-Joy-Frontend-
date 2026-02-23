"use client";

import { useState , useEffect } from "react";

// zod imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validators/authSchemas";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaRegEye ,FaRegEyeSlash  } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { loginThunk } from "@/redux/features/authSlice";
import { useSelector , useDispatch } from "react-redux";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [fromData , setFromData] =  useState({
    email : "",
    password : ""
  })

  const router = useRouter()
  const dispatch = useDispatch()
  const {user , loading , error } = useSelector((state)=>state.auth)

  // zod resolver implementations
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: fromData,
  });
  
  const handleOnChnage = (e)=>{
    const {name , value} = e.target
    setFromData({...fromData , [name]: value})
  }

  const handleLogin = (data) => {
    dispatch(loginThunk(data));
  };

 useEffect(() => {
  console.log("User changed:", user);
  if (user) {
    console.log("Redirecting to home");
    router.push("/");
  }
}, [user, router]);

  console.log(fromData)


  const handleGoogleAuth = ()=>{
    window.location.href="http://coffeewebapi.barecms.com/api/auth/google"
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
            Sign In
          </motion.h1>

            <form onSubmit={handleSubmit(handleLogin)}>
          <motion.input
            variants={{
              hidden: { y: 15, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            {...register("email")}
            type="email"
            value={fromData.email}
            name="email"
            onChange={handleOnChnage}
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
            {...register("password")}
              type={showPassword ? "text" : "password"}
              value={fromData.password}
              name="password"
              onChange={handleOnChnage}
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
              {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
            </button>
          </motion.div>

          {/* SIGN IN BUTTON */}
          <motion.button
          type="submit"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={()=> dispatch(loginThunk(fromData))}
            className="w-full py-3 rounded-full bg-gradient-to-r
                       from-amber-600 to-orange-900
                       font-playfair font-bold shadow-lg text-white cursor-pointer"
          >
            Sign In
          </motion.button>
            </form>
          {/* LINKS */}
          <div className="text-center mt-6">
            <Link href="/Auth/forgot-password" className="text-sm hover:underline text-white">
              Forgot Password?
            </Link>
          </div>

          <p className="text-center mt-6 text-sm text-gray-300">
            Don&apos;t have an account?{" "}
            <Link href="/Auth/signup" className="text-amber-500 hover:underline">
              Create new account
            </Link>
          </p>

          {/* SOCIAL LOGIN Logo */}
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
                onClick={handleGoogleAuth}
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center
                           shadow-lg hover:shadow-[0_0_25px_#ffffff] cursor-pointer"
              >
                <FcGoogle size={22} />
              </motion.button>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
