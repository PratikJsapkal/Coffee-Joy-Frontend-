"use client";

import { clearSearch } from "@/redux/features/searchSlice";


import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryLevel2,
  setCategoryLevel3,
  setRoastLevel,
 
} from "@/redux/features/filterSlice";

import { FaFilter } from "react-icons/fa";

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const activeCategory = useSelector((state) => state.category.activeCategory);

  /* ---------------- LEVEL 2 OPTIONS (DEPEND ON CATEGORY) ---------------- */
  const categoryLevel2Options = {
    coffee: ["Whole Bean", "Ground Coffee", "Instant Coffee","Blends","Decaf"],
    machine: ["Espresso", "Grinders", "Manual", "Drip"],
    Grinders: ["Manual Grinder", "Electric Grinder"],
    accessories: ["Mugs", "Filters", "Scoops"],
    pods: ["Coffee Capsules","Coffee Pods"],
  };

  /* ---------------- LEVEL 3 OPTIONS (DEPEND ON LEVEL 2) ---------------- */
  const categoryLevel3Map = {
    Espresso: ["Commercial", "Fully Automatic", "Semi Automatic"],
    Grinders:["Manual","Electric"],
    Manual: ["French Press", "Moka Pot", "AeroPress"],
    Drip: ["Pour Over", "Auto Drip"],

    
   
    "Instant Coffee": ["Classic", "Flavoured" ,"Speciality"],

    
  };

  const level3Options =
    filter.categoryLevel2
      ? categoryLevel3Map[filter.categoryLevel2] || []
      : [];

 

  /* ---------------- HANDLERS ---------------- */

  const handleCategoryLevel2Change = (item) => {
    dispatch(setCategoryLevel2(item)); // 🔥 single select
    dispatch(clearSearch());
  };

  const handleCategoryLevel3Change = (item) => {
    dispatch(setCategoryLevel3(item));
    dispatch(clearSearch());
  };

  return (
    <aside className="sticky top-28 h-fit rounded-2xl bg-black/50 backdrop-blur-2xl border-3 border-[#F3E0C8]/60 p-5">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-sm font-semibold uppercase flex gap-1">
          Filters <FaFilter />
        </h3>
        <button
         onClick={() => {
    dispatch(resetFilters());
    dispatch(clearSearch()); // ✅ ADD
  }}
          className="text-xs text-[#f1d6b5] underline"
        >
          Reset
        </button>
      </div>

      {/* ---------------- CATEGORY LEVEL 2 ---------------- */}
      {categoryLevel2Options[activeCategory] && (
        <div className="mb-6 rounded-xl bg-[#B2A28E]/70 backdrop-blur-lg p-4 text-black">
          <h4 className="text-sm font-semibold mb-3">Type</h4>

          {categoryLevel2Options[activeCategory].map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm mb-2">
              <input
                type="radio"
                checked={filter.categoryLevel2 === item}
                onChange={() => handleCategoryLevel2Change(item)}
                className="accent-black"
              />
              {item}
            </label>
          ))}
        </div>
      )}

      {/* ---------------- CATEGORY LEVEL 3 ---------------- */}
      {filter.categoryLevel2 && level3Options.length > 0 && (
        <div className="mb-6 rounded-xl bg-[#B2A28E]/70 backdrop-blur-lg p-4 text-black">
          <h4 className="text-sm font-semibold mb-3">
            {filter.categoryLevel2} Types
          </h4>

          {level3Options.map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm mb-2">
              <input
                type="radio"
                checked={filter.categoryLevel3 === item}
                onChange={() => handleCategoryLevel3Change(item)}
                className="accent-black"
              />
              {item}
            </label>
          ))}
        </div>
      )}

   
        
    
    </aside>
  );
};

export default FilterSidebar;
