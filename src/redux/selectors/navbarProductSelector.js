import { createSelector } from "@reduxjs/toolkit";

const normalize = (value) =>
  value?.toLowerCase().replace(/\s+/g, "-");

const singularize = (value) =>
  value.endsWith("s") ? value.slice(0, -1) : value;

export const selectNavbarProductsByCategory = (categorySlug) =>
  createSelector(
    [(state) => state.product.data?.products || []],
    (products) => {
      if (!categorySlug) return [];

      const slug = singularize(normalize(categorySlug));

      return products.filter((p) => {
        const level1 = singularize(normalize(p.category_level_1 || ""));
        const level2 = singularize(normalize(p.category_level_2 || ""));
        const level3 = singularize(normalize(p.category_level_3 || ""));

        return (
          level1 === slug ||
          level2 === slug ||
          level3 === slug
        );
      });
    }
  );
