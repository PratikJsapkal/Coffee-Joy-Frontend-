import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredProducts = createSelector(
  [
    (state) => state.product.data.products,
    (state) => state.category.activeCategory,   
    (state) => state.filter,
     (state) => state.search.query, 
    
  ],
  (products, activeCategory, filter,searchQuery) => {
    if (!products) return [];

    return products.filter((p) => {
      // ---------------- TOP LEVEL CATEGORY ----------------
      if (
        activeCategory &&
        activeCategory.toLowerCase() !== "all" &&
        p.category_level_1.toLowerCase() !== activeCategory.toLowerCase()
      ) {
        return false;
      }

      // ---------------- FILTER SLICE ----------------
      if (
        filter.categoryLevel1 &&
        filter.categoryLevel1 !== "All" &&
        p.category_level_1.toLowerCase() !== filter.categoryLevel1.toLowerCase()
      ) {
        return false;
      }

      if (
        filter.categoryLevel2 &&
        filter.categoryLevel2 !== "All" &&
        p.category_level_2.toLowerCase() !== filter.categoryLevel2.toLowerCase()
      ) {
        return false;
      }

      /* ✅ IMPORTANT FIX — LEVEL 3 DEPENDS ON LEVEL 2 */
      if (
        filter.categoryLevel3 &&
        filter.categoryLevel3 !== "All"
      ) {
        // if level 2 is selected, enforce valid pairing
        if (
          filter.categoryLevel2 &&
          p.category_level_2.toLowerCase() !== filter.categoryLevel2.toLowerCase()
        ) {
          return false;
        }

        if (
          p.category_level_3.toLowerCase() !== filter.categoryLevel3.toLowerCase()
        ) {
          return false;
        }
      }

      
    // ---------------- 🔍 SEARCH FILTER (LAST) ----------------
    if (searchQuery && searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();

      return (
        p.name?.toLowerCase().includes(q) ||
        p.slug?.toLowerCase().includes(q)
      );
    }


      

      return true;


      
    });
  }
);

export const selectBestSellersByCategory = (category) =>
  createSelector(
    [(state) => state.product.data?.products],
    (products) => {
      if (!Array.isArray(products)) return []

      return products
        .filter(
          (p) =>
            p.best_seller === 1 &&
            p.category_level_1?.toLowerCase() === category.toLowerCase()
        )
        .slice(0, 4) // ✅ ONLY 4 ITEMS
    }
  )




