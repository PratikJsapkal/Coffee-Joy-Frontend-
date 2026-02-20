"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useRouter } from "next/navigation";


export default function PricingCards() {
  const [isPods, setIsPods] = React.useState(false);
  const router = useRouter();


  /* ---------------- DATA ---------------- */
  const coffeePlans = [
    {
      title: "1829 Espresso",
      price: "$12.00",
      description:
        "A flexible monthly coffee subscription charged automatically. Enjoy freshly roasted beans delivered on schedule, with full control to pause, skip, or cancel anytime.",
      gradient: "from-[#f3e2c7] to-[#e8c39e]",
    },
    {
      title: "Roaster's Spotlight",
      price: "$15.00",
      description:
        "Pay upfront and enjoy a curated coffee journey. Ideal for gifting or long-term savings, with premium roasts delivered consistently for months ahead.",
      gradient: "from-[#b56a73] to-[#7b3b44]",
      highlight: true,
    },
  ];

  const podsPlans = [
    {
      title: "Autopay Subscription",
      price: "$10.00",
      description:
        "Convenient autopay pod deliveries designed for everyday ease. Perfectly portioned pods arrive regularly, so your coffee routine never misses a beat.",
      gradient: "from-[#e6d3b1] to-[#c8a57a]",
    },
    {
      title: "Prepaid Subscription",
      price: "$55.00",
      description:
        "Stock up and save with a prepaid pod subscription. A fixed number of premium pods delivered over time, offering great value and consistent quality.",
      gradient: "from-[#8a4f56] to-[#5c2c32]",
      highlight: true,
    },
  ];

  const plans = isPods ? podsPlans : coffeePlans;

  return (
      <section id="subscribe" className="scroll-mt-28">
    <section  className="relative w-full px-0 md:px-16 py-10 md:py-20 min-h-full ">

      {/* Background */}
      <div className="absolute inset-0 bg-[#2a1f1b]/40 z-0" />
      <div className="absolute inset-0 bg-[#faf6ef]/40 z-0" />

      <Image
        src="/images/bg2.webp"
        alt="Coffee Background"
        fill
        priority
        className="absolute inset-0 object-cover blur-xl z-0"
      />

       {/* BEANS — TOP LEFT */}

        <div className="pointer-events-none absolute inset-0 z-[5]">
        <img
          src="/images/subscribe1.webp"
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

            {plans.map((plan, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="
                  w-[280px] sm:w-[320px] lg:w-[380px]
                  rounded-3xl
                  p-8
                  bg-white/10
                  backdrop-blur-3xl
                  border border-white/20
                  text-white
                  shadow-xl
                 
                 
                   h-full
                   
                  
                  
                "
              >
                <p className="uppercase text-xs opacity-70 mb-2">
                  Coffee & Joy
                </p>

                <h2 className="text-xl font-semibold mb-4">
                  {plan.title}
                </h2>

                <p className="text-sm opacity-80 mb-6">
                  {plan.description}
                </p>

                <p className="text-3xl font-semibold mb-1">
                  {plan.price}
                </p>

                <ul className="text-sm space-y-2 my-6 opacity-80">
                  <li>✓ Expertly roasted</li>
                  <li>✓ Pause anytime</li>
                  <li>✓ 10% off always</li>
                </ul>

               <button
  onClick={() => router.push("/subscribe")}
  className="w-full py-3 rounded-full bg-white text-[#2a1f1b] font-bold text-sm hover:scale-105 transition"
>
  SUBSCRIBE NOW
</button>

              </motion.div>
            ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
    </section>
  );
}
