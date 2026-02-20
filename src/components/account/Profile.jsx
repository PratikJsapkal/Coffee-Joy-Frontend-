"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useSelector , useDispatch } from "react-redux";
import { userInfoThunk } from "@/redux/features/authSlice";
import { useEffect } from "react";

export default function Profile({ onEdit, onBack }) {
   
  const dispatch = useDispatch()
  const user =useSelector((state)=>state.auth.user)



  const handleClose = () => {
    if (typeof onBack === "function") {
      onBack();
    } else {
      window.history.back();
    }
  };

  useEffect(()=>{
    dispatch(userInfoThunk())
  },[dispatch])

  return (
    <div className="w-full relative px-4 sm:px-0">

      {/* CLOSE BUTTON only show in mobile view */}
      <button
        onClick={handleClose}
        // className="absolute right-0 top-0 p-1 text-amber-950 hover:bg-amber-900/10 transition rounded-full"
        className="absolute right-0 top-0 p-1 text-amber-950 hover:bg-amber-900/10 transition rounded-full md:hidden"

      >
        <X className="h-5 w-5" />
      </button>

      {/* PROFILE HEADER */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-10">
        <div className="relative w-32 h-32 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-amber-700 shrink-0">
          <Image
            src={"/images/rat.webp"}
            alt="Profile image"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="text-center sm:text-left sm:ml-8">
          <h3 className="font-cinzel font-bold text-xl sm:text-2xl text-amber-950 mb-6 underline underline-offset-4">
            Your Profile
          </h3>

          <p className="font-playfair text-amber-900 mb-2">
            <span className="font-bold underline">Name:</span>
            <span className="font-semibold ml-3">{user?.name || "—"}</span>
          </p>

          

          <p className="font-playfair text-amber-900 break-all">
            <span className="font-bold underline">Email:</span>
            <span className="font-semibold ml-3">{user?.email || "—"}</span>
          </p>
        </div>
      </div>

      <hr className="mt-10 border-amber-900/60" />
    </div>
  );
}
