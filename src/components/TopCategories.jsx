"use client";

import Image from "next/image";
import topCategoriesData from "../data/topcategories.json";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setActiveCategory } from "@/redux/features/categorySlice";
import { resetFilters } from "@/redux/features/filterSlice";

export default function TopCategories() {
  const { background, heading, mainCards, bottomGrid, beans } =
    topCategoriesData;

    const CATEGORY_MAP = {
  "Premium Coffee": "coffee",
  "Machines": "machine",
  "Accessories": "accessories",
  "Brewing Tools": "machine",
  "Grinders": "grinders",
  "Pods": "pods",
  "Subscriptions": "#subscribe",
};


  const dispatch = useDispatch();
  const router = useRouter();

  const handleCategoryClick = (title) => {
  const category = CATEGORY_MAP[title];

  if (!category) return;

  dispatch(setActiveCategory(category));
  dispatch(resetFilters());
  router.push("/Products");
};


  return (
    <section
      className={`relative w-full py-28 px-6 h-full overflow-hidden bg-[linear-gradient(135deg,#050505_0%,#0b0b0b_42%,#24140d_68%,#2e1a12_100%)]`}
    >
      {/* BEANS — TOP LEFT */}
      <div className="pointer-events-none absolute inset-0 z-[5]">
        <img
          src={beans.topLeft}
          alt=""
         
          className="
            absolute
            top-20 sm:-top-4
            left-[-10%] sm:left-[-6rem]
            w-[40%] sm:w-[30%]
            max-w-none
            rotate-[180deg]
            opacity-90
          "
        />
      </div>

      {/* BEANS — BOTTOM RIGHT */}
      <div className="pointer-events-none absolute inset-0 z-[5]">
        <img
          src={beans.bottomRight}
          alt=""
          className="absolute bottom-4 sm:-bottom-6 right-[-10%] sm:right-[-6rem] w-[40%] sm:w-[30%] max-w-none opacity-90"
        />
      </div>

      <div className="relative -mt-6 z-20 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-cinzel text-white">
            {heading.title}
          </h2>
          <p className="mt-3 font-playfair text-gray-400">
            {heading.subtitle}
          </p>
        </div>

        {/* Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] lg:w-[900px] lg:h-[900px] rounded-full bg-[#f5e6cf]/5 blur-[80px] sm:blur-[110px] lg:blur-[140px]" />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {mainCards.map((card, i) => (
            <div
              key={i}
             onClick={() => handleCategoryClick(card.title)}

              className={`relative cursor-pointer ${
                card.big ? "lg:row-span-2 h-[220px]" : "h-[220px]"
              } rounded-3xl overflow-hidden group`}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition duration-700"
              />

              <div className={`absolute inset-0 ${card.overlay}`} />

              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-serif text-white">
                  {card.title}
                </h3>
                <p className="text-gray-300 text-sm mt-1">
                  {card.subtitle}
                </p>
                <button
                  onClick={(e) => handleCategoryClick(card.title)}
                  className="mt-4 px-5 py-2 rounded-full bg-[#f5e6cf] text-black text-sm font-medium hover:bg-white transition"
                >
                  {card.button}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {bottomGrid.map((item, i) => (
            <div
              key={i}
             onClick={() => handleCategoryClick(item.title)}

              className="relative cursor-pointer rounded-2xl overflow-hidden group h-[180px]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-4 left-4">
                <h4 className="text-lg font-serif text-white">
                  {item.title}
                </h4>
                <span className="text-sm text-[#f5e6cf] hover:underline underline-offset-4">
                  Shop →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
