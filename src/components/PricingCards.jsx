"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { getActivePlans } from "@/api/subscriptionApi";


export default function PricingCards() {
  const [isPods, setIsPods] = React.useState(false);
  const router = useRouter();

  const [plans, setPlans] = React.useState([]);
const [loading, setLoading] = React.useState(false);

React.useEffect(() => {
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const category = isPods ? "PODS" : "COFFEE";
      const data = await getActivePlans(category);

      // ✅ Only show first 2 plans
      setPlans(data?.slice(0, 2) || []);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  fetchPlans();
}, [isPods]);




  return (
      <section id="subscribe" className="scroll-mt-28">
    <section  className="relative w-full px-0 md:px-16 py-10 md:py-20 min-h-full ">

      {/* Background */}
      <div className="absolute inset-0 bg-[#2a1f1b]/40 z-0" />
      <div className="absolute inset-0 bg-[#faf6ef]/40 z-0" />

      <Image
        src="https://cdns.barecms.com/images/bg2.webp"
        alt="Coffee Background"
        fill
        priority
        className="absolute inset-0 object-cover blur-xl z-0"
      />

       {/* BEANS — TOP LEFT */}

        <div className="pointer-events-none absolute inset-0 z-[5]">
        <img
          src="https://cdns.barecms.com/images/subscribe1.webp"
          alt=""
          className="
            absolute
            top-20 sm:-top-40 overflow-hidden
            right-285
            w-[40%] sm:w-[30%]
            max-w-none  
            
            opacity-90
          "
        />
      </div>  

 
    


      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* LEFT CONTENT */}
        <div className="flex items-center justify-center lg:justify-start">
          <div className="max-w-md text-[#ffffff] font-bold text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-cinzel leading-tight mb-5">
              Subscribe <br className="hidden lg:block" /> today.
            </h1>

            <p className="text-sm opacity-80 mb-4">
              WatchHouse. YourHouse.
              <br />
              The modern coffee experience at home.
            </p>

            <p className="text-sm mb-8">
              Subscribe for a never-ending cup.
            </p>

            {/* TOGGLE */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
           <span
  className={clsx("text-sm", {
    "opacity-50": isPods,
    "opacity-100": !isPods,
  })}
>

                Coffee
              </span>

              <div
                onClick={() => setIsPods(!isPods)}
                className="relative w-14 h-7 rounded-full bg-[#e5dfdd]/30 border border-[#2a1f1b]/40 cursor-pointer flex items-center"
              >
                <motion.div
                  className="w-6 h-6 bg-[#2a1f1b] rounded-full"
                  animate={{ x: isPods ? 26 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>

             <span
  className={clsx("text-sm", {
    "opacity-100": isPods,
    "opacity-60": !isPods,
  })}
>

                Pods
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — GLASS CARDS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isPods ? "pods" : "coffee"}
            className="flex flex-col
    items-center          
    gap-6                 
    sm:flex-row
    sm:items-stretch
    md:gap-7
    md:justify-end
    w-full
    h-full "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
           <div className="flex flex-col items-center sm:flex-row  md:gap-10 gap-8">

    {loading ? (
  <p className="text-white">Loading plans...</p>
) : (
  plans.map((plan) => (
    <motion.div
      key={plan.id}
      whileHover={{ y: -6 }}
      className="w-[280px] sm:w-[320px] lg:w-[380px] rounded-3xl p-8 bg-white/10 backdrop-blur-3xl border border-white/20 text-white shadow-xl  "
    >
      <p className="uppercase text-xs opacity-70 mb-2">
        {isPods ? "Pods Plan" : "Coffee Plan"}
      </p>

      <h2 className="text-xl font-semibold mb-4">
        {plan.name}
      </h2>

      <p className="text-sm opacity-80 mb-6">
        {plan.description || "Customize your subscription easily"}
      </p>

      <p className="text-3xl font-semibold mb-1">
        ₹{plan.display_price}
      </p>

      <ul className="text-sm space-y-2 my-6 opacity-80">
        <li>✓ Expertly roasted</li>
        <li>✓ Pause anytime</li>
        <li>✓ {plan.deliveries_count} Deliveries</li>
      </ul>

      <div className="border-t border-white/20 my-6 " />

<p className="text-xs text-white/60 text-center leading-relaxed mb-7">
  Perfect for daily coffee drinkers who want convenience,
  savings, and consistent quality delivered to their doorstep.
</p>

      <button
        onClick={() => router.push("/subscription")}
        className="w-full py-3 rounded-full bg-white text-[#2a1f1b] font-bold text-sm hover:scale-105 transition"
      >
        SUBSCRIBE NOW
      </button>
    </motion.div>
  ))
)}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
    </section>
  );
}
