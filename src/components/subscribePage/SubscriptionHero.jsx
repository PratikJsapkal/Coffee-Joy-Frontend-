"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function SubscriptionHero() {
  return (
    <section className="relative w-full px-6 md:px-16 py-20 overflow-hidden rounded-2xl">
      
      {/* BLURRED BACKGROUND LAYER */}
      <div className="absolute inset-0 bg-[#b8a78e] blur-3xl  scale-110 z-0" />

      {/* CONTENT (NO BLUR) */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* BEANS BACKGROUND IMAGE */}
  <div className="absolute  -bottom-55  -left-22 z-0 opacity-90 pointer-events-none">
    <Image
      src="https://cdns.barecms.com/images/coffeepaint1.webp"   // <-- your beans image
      alt=""
      width={280}
      height={250}
      className="object-contain"
    />
  </div>
        
       {/* LEFT CONTENT */}
<div className="relative text-black overflow-hidden">



  {/* TEXT CONTENT */}
  <div className="relative z-10">
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl md:text-5xl font-semibold font-cinzel leading-tight mb-6"
    >
      Subscribe & Save More!
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-2xl opacity-80 mb-8"
    >
      When you get a subscription from us, you get:
    </motion.p>

    <ul className="space-y-4 mb-7 font-semibold ">
      {[
        "A steady supply – never run out of coffee!",
        "Save up – get more value for your money.",
        "At your doorstep – delivered at your convenience.",
        "Experiment between coffees – or stick to your favourites.",
      ].map((text, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + i * 0.1 }}
          className="flex items-start gap-2 text-l"
        >
          <span className="text-md opacity-60 mt-1">
            {String(i + 1).padStart(2, "0")} /
          </span>
          <span>{text}</span>
        </motion.li>
      ))}
    </ul>
    

    {/* <button className="px-10 py-4 rounded-full 
  bg-black/60 backdrop-blur-
  text-white text-sm font-semibold 
  border border-white/20
  hover:bg-black/80 hover:scale-100
  transition">
  SUBSCRIBE NOW
</button> */}

  </div>
</div>


        {/* RIGHT IMAGE (IN FOCUS) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[360px] md:h-[420px] lg:h-[480px]"
        >
          <Image
            src="https://cdns.barecms.com/images/Subscribe.webp"
            alt="Coffee products"
            fill
            priority
            className="object-contain rounded-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default SubscriptionHero;
