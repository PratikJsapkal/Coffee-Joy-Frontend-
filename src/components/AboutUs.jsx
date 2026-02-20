"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AboutUs() {
  return (
     <section id="about-us" className="scroll-mt-16">
    <main className="min-h-full overflow-x-hidden bg-[#1c120b] px-4 sm:px-6 lg:px-12 pt-16 pb-10 text-[#efcca4]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* LEFT SECTION */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="font-bold text-lg font-cinzel underline">
              COFFEE & JOY
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold mb-4 leading-tight">
            THE STORY <br className="hidden sm:block" /> OF COFFEE
          </h1>

          <p className="text-[#d6b28e] font-playfair max-w-md text-sm sm:text-base mb-8">
            Each bean is crafted to deliver freshness, richness, and a smooth,
            satisfying cup every time.
          </p>

          {/* LEFT MAIN IMAGE – ANIMATION ADDED */}
          <div className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-[220px] sm:h-[280px] lg:h-[340px] rounded-xl overflow-hidden"
          >
            <Image
              src="https://cdns.barecms.com/images/aboutUs1.webp"
              alt="Coffee"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover cursor-pointer"
            />
          </motion.div>
          </div>
        </motion.div>
        

        {/* RIGHT SECTION */}
        
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-6 overflow-hidden"
        >
          <motion.p variants={fadeUp} className="text-[#d6b28e] font-inter text-sm sm:text-base">
            We are passionate about coffee and the art behind every perfect cup.
            Our coffee machine powder is crafted from carefully selected premium
            beans, finely ground to deliver rich aroma and smooth taste.
          </motion.p>

          <motion.p variants={fadeUp} className="text-[#d6b28e] font-inter text-sm sm:text-base">
            From intense espresso to creamy milk-based coffees, our blends bring
            café-quality results to your home.
          </motion.p>

          <motion.p variants={fadeUp} className="text-[#d6b28e] font-inter text-sm sm:text-base">
            This is our story—one cup at a time.
          </motion.p>
          
          

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            {/* RIGHT IMAGE CARD 1 – ANIMATION ADDED */}
            <motion.div
              variants={cardAnim}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="bg-[#2a1a12] p-4 rounded-xl"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-[160px] sm:h-[200px] mb-6 cursor-pointer overflow-hidden"
              >
                <Image
                  src="https://cdns.barecms.com/images/aboutUs2.webp"
                  alt="Coffee Powder"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover rounded-b-full"
                />
              </motion.div>
              <p className="text-sm font-playfair font-semibold text-[#d6b28e]">
                We source and roast premium coffee beans to preserve their natural
                aroma and bold character.
              </p>
            </motion.div>
            

            {/* RIGHT IMAGE CARD 2 – ANIMATION ADDED */}
            <motion.div
              variants={cardAnim}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="bg-[#2a1a12] p-4 rounded-xl overflow-x-hidden"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-[160px] sm:h-[200px] mb-6 cursor-pointer overflow-hidden"
              >
                <Image
                  src="https://cdns.barecms.com/images/aboutUs3.webp"
                  alt="Coffee Machine"
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover rounded-b-full"
                />
              </motion.div>
              <p className="text-sm font-playfair font-semibold text-[#d6b28e]">
                We craft every cup with care for a smooth, rich taste.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
    </section>
  );
}
