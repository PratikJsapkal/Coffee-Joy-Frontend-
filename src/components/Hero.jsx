"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

const media = [
  { type: "image", src: "https://cdns.barecms.com/images/bg4.webp", width: 1920, height: 1080 },
  { type: "video", src: "https://cdns.barecms.com/images/hero2.mp4" },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % media.length);
    }, 7000); // fade every 7s
    return () => clearInterval(interval);
  }, []);

   return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">

      {/* MOBILE BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0 md:hidden">
        <video
          src="/images/coffeevideo.mp4.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* GRID: 30% LEFT / 70% RIGHT */}
      <div className="relative z-10 grid min-h-screen md:grid-cols-[30%_70%]">

        {/* LEFT – TEXT CONTENT */}
        <div className="flex flex-col justify-center px-8 md:px-16 pt-32 md:pt-28 text-white font-serif z-20 text-center md:text-left">
          
          <p className="
            inline-flex items-center
            uppercase tracking-widest text-white/90 px-5 py-2.5 rounded-full
            md:w-55 md:h-10 w-55 h-10 ml-10
            bg-white/10 backdrop-blur-xl
            border border-white/20
            shadow-lg
          ">
            Freshly Roasted
          </p>

          <h1 className="text-5xl sm:text-5xl md:text-7xl font-cinzel font-bold mt-4 leading-tight">
            Modern Coffee.
          </h1>

          <p className="mt-6 max-w-md mx-auto md:mx-0 text-gray-300 text-sm sm:text-base">
            We believe a cup of coffee is one of the most important pleasures in life.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start w-full sm:w-auto">
            <Link href="/Products">
  <button className="w-full cursor-pointer sm:w-auto max-w-[220px] sm:max-w-none px-5 py-2.5 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition mx-auto sm:mx-0">
    Order Now
  </button>
</Link>
            <Link href="/#Blogs">
  <button className="w-full cursor-pointer sm:w-auto max-w-[220px] sm:max-w-none px-5 py-2.5 border border-white/30 rounded-full hover:bg-white/10 transition mx-auto sm:mx-0">
    Read More
  </button>
</Link>
          </div>
        </div>

        {/* RIGHT – MEDIA */}
        <div className="relative w-full h-full overflow-hidden hidden md:block">
          {media.map((item, index) => (
            <div
              key={index}
              className={clsx(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                index === active ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  width={item.width}
                  height={item.height}
                  alt="Coffee visual"
                  className="w-full h-full object-cover scale-105 transition-transform duration-700"
                  priority={index === active}
                />
              ) : (
                <video
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover scale-105 transition-transform duration-700"
                />
              )}
              {/* Gradient overlay for luxury feel */}
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/5 to-black" />
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
