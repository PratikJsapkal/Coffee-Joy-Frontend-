"use client";
import React from "react";
import reviews from "@/data/reviews.json";
import Image from "next/image";
import Star from "./Star";
import { motion } from "framer-motion";

const ReviewCard = () => {
  return (
    <section className="bg-gradient-to-b from-[#050505] to-[#2a1b12] overflow-hidden">
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel text-white text-center pt-16 md:pt-20">
          Hear From Our Coffee Crew
        </h1>
        <p className="mt-2 md:mt-3 font-playfair text-gray-400 text-center text-sm md:text-base px-4">
          Brewing happiness, one cup and one review at a time
        </p>
      </div>

      {/* Marquee container */}
      <div className="pt-10 md:pt-14 overflow-hidden">
        <motion.ul
          className="flex gap-6 md:gap-10 px-6 md:px-20 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,     // desktop stays SAME
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...reviews, ...reviews].map((review, i) => (
            <li
              key={i}
              className="
                w-[280px] sm:w-[320px] md:w-[360px]
                shrink-0 bg-black px-4 md:px-5 py-4 md:py-5
                rounded-2xl mb-16 md:mb-20 shadow-gray-950 shadow-lg
              "
            >
              <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full overflow-hidden mb-3 md:mb-4">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>

              <p className="pb-1 md:pb-2">
                <Star rating={review.rating} />
              </p>

              <h2 className="font-playfair text-[15px] md:text-[17px] pb-1 md:pb-2 text-white">
                {review.name}
              </h2>

              <p className="font-inter text-[13px] md:text-[15px] text-gray-300 leading-relaxed">
                {review.desc}
              </p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default ReviewCard;