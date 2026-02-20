"use client";

import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "@/redux/features/categorySlice";
import { resetFilters } from "@/redux/features/filterSlice";
import { clearSearch } from "@/redux/features/searchSlice";


const CategoryBar = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.category.activeCategory || "all");

  const categories = [
    { label: "All Categories", value: "all" },
    { label: "Coffee", value: "coffee" },
    { label: "Machines", value: "machine" },
    { label: "Pods", value: "pods" },
    { label: "Accessories", value: "accessories" },
  ];

  const handleClick = (value) => {
    dispatch(setActiveCategory(value));
    dispatch(resetFilters()); 
     dispatch(clearSearch());
  };

  return (
    <div className="sticky top-0 z-30 bg-[#24160E] border-b border-[#3a2a1f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center ">
        {/* Scrollable container */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide whitespace-nowrap justify-start md:justify-center px-2 md:px-52">


          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleClick(cat.value)}
              className={`flex-shrink-0 px-4 sm:px-6 py-2 rounded-full text-sm font-cinzel transition
                ${
                  activeCategory === cat.value
                    ? "bg-[#F3E0C8] text-black"
                    : "border border-[#F3E0C8]/40 text-[#F3E0C8]"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Side gradients for scroll hint on mobile */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-6 bg-gradient-to-r from-[#24160E] to-transparent md:hidden"></div>
      <div className="pointer-events-none absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-[#24160E] to-transparent md:hidden"></div>
    </div>
  );
};

export default CategoryBar;
