// "use client";

// import { motion } from "framer-motion";
// import { useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { userLogoutThunk } from "@/redux/features/authSlice";
// import { useRouter } from "next/navigation";

// export default function Logout({ onBack }) {
//   const dispatch = useDispatch();
//   const [isMobile, setIsMobile] = useState(false);
//   const [clicked, setClicked] = useState(false);
//   const router = useRouter()

//   const handleLogout = () => {
//     dispatch(userLogoutThunk());
//   router.push("/")
//   };

//   const onCancelClick = () => {
//     if (isMobile && onBack) {
//       setClicked(true);   // turn buttons red
//       onBack();           // go back to ProfileView
//       setTimeout(() => setClicked(false), 300); // reset button color
//     }
//   };

//   useEffect(() => {
//     const checkScreen = () => setIsMobile(window.innerWidth < 768);
//     checkScreen();
//     window.addEventListener("resize", checkScreen);
//     return () => window.removeEventListener("resize", checkScreen);
//   }, []);

//   return (
//     <div className="bg-[#2a1c12] text-[#fff3e6] rounded-xl p-8 mt-10 shadow-lg relative">
//       <h2 className="text-xl font-semibold mb-8 mt-10 text-center text-[rgb(228,185,154)] font-cinzel underline underline-offset-3 decoration-0">
//         Logout
//       </h2>

//       <p className="text-center opacity-90 mb-6 sm:mb-8 md:mb-10">
//         Are you sure you want to logout?
//       </p>

//       {/* Buttons */}
//       <div className="flex flex-col sm:flex-row justify-center gap-4">
//         {/* Cancel Button */}
//         <button
//           onClick={onCancelClick}
//           className={` cursor-pointer w-full sm:w-40 md:w-48 lg:w-56 border border-[#fff3e6]/40 py-3 rounded-lg font-medium transition-colors
//             ${isMobile && clicked ? "bg-red-600 text-white" : "hover:bg-red-600"}`}
//         >
//           Cancel
//         </button>

//         {/* Confirm Logout */}
//         <button
//           onClick={handleLogout}
//           className={` cursor-pointer w-full sm:w-40 md:w-48 lg:w-56 border border-[#fff3e6]/40 py-3 rounded-lg font-medium transition-colors
//             ${isMobile && clicked ? "bg-red-600 text-white" : "hover:bg-red-600"}`}
//         >
//           Confirm Logout
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { userLogoutThunk } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

export default function Logout({ onBack }) {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    dispatch(userLogoutThunk());
    router.push("/");
  };

  const onCancelClick = () => {
    if (isMobile && onBack) {
      setClicked(true);   // turn buttons red
      onBack();           // go back to ProfileView
      setTimeout(() => setClicked(false), 300); // reset button color
    }
  };

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="bg-[#2a1c12] text-[#fff3e6] rounded-xl p-8 mt-10 shadow-lg relative">
      <h2 className="text-xl font-semibold mb-8 mt-10 text-center text-[rgb(228,185,154)] font-cinzel underline underline-offset-3 decoration-0">
        Logout
      </h2>

      <p className="text-center opacity-90 mb-6 sm:mb-8 md:mb-10">
        Are you sure you want to logout?
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {/* Cancel Button – MOBILE ONLY */}
        {isMobile && (
          <button
            onClick={onCancelClick}
            className={`cursor-pointer w-full sm:w-40 md:w-48 lg:w-56
              border border-[#fff3e6]/40 py-3 rounded-lg font-medium transition-colors
              ${clicked ? "bg-red-600 text-white" : "hover:bg-red-600"}`}
          >
            Cancel
          </button>
        )}

        {/* Confirm Logout */}
        <button
          onClick={handleLogout}
          className={`cursor-pointer w-full sm:w-40 md:w-48 lg:w-56
            border border-[#fff3e6]/40 py-3 rounded-lg font-medium transition-colors
            ${isMobile && clicked ? "bg-red-600 text-white" : "hover:bg-red-600"}`}
        >
          Confirm Logout
        </button>
      </div>
    </div>
  );
}
