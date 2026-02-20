"use client"

import React from "react"
import Image from "next/image"



const ProductHero = ({ title, subtitle, image }) => {
  return (
    <section className="relative w-full h-[420px] md:h-[420px] lg:h-[500px] overflow-hidden">
      
      {/* Background Image */}
     <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
      />
      {/* Dark + Blur Overlay */}
      <div className="absolute inset-0 bg-[#24160E]/30 " />

      {/* Gradient fade (optional but premium) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#24160E]/30 via-[#24160E]/20 to-transparent" />

      {/* Text Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 md:pt-36 lg:pt-44">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-cinzel text-white font-bold leading-tight">
          {title}
        </h1>

        <p className="mt-4 max-w-2xl text-sm md:text-lg lg:text-xl text-white/90 font-playfair">
          {subtitle}
        </p>
      </div>

    </section>
  )
}

export default ProductHero
