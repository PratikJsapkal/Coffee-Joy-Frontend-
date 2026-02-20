"use client";

import { motion } from "framer-motion";

export default function Subscriptions({ onBack }) {
  return (
    <div className="relative w-full">
      {/* BACK BUTTON - visible ONLY on mobile */}
      <motion.div
        className="absolute top-4 left-4 z-20 block sm:hidden"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-[20px] sm:text-[22px] md:text-[24px] btn-glow font-bold flex items-center"
        >
          ⟵ 
        </motion.button>
      </motion.div>

      {/* CONTENT */}
      <div className="card mt-12 sm:mt-4 p-6 sm:p-8">
        <h2 className="title  text-[rgb(228,185,154)] mt-10 mb-30">Subscriptions</h2>
        <p className="opacity-80 text-gray-400">
          You don’t have any active subscriptions.
        </p>
      </div>
    </div>
  );
}
