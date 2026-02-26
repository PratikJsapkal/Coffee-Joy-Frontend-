"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "@/redux/features/productSlice";
import { selectNavbarProductsByCategory } from "@/redux/selectors/navbarProductSelector";

import ProductCard from "@/components/product/ProductCards";
import ProductHero from "@/components/product/ProductHero";

import categoriesData from "@/data/categoriesdata.json";
import { normalizeImages, getValidImage } from "@/utils/getValidImage";

export default function NavbarProductPage() {
  const { category } = useParams();
  const dispatch = useDispatch(); 

  const { loading, error } = useSelector((state) => state.product);

  // 🔥 Navbar-only selector
  const products = useSelector(
    selectNavbarProductsByCategory(category)
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

const heroCategory = categoriesData.find(
  (cat) =>
    cat.slug?.toLowerCase().trim() ===
    category?.toLowerCase().trim()
);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <>
      <ProductHero 
        title={heroCategory?.name || "Products"}
        subtitle={heroCategory?.subtitle || "Explore our collection"}
        image={heroCategory?.heroImage || "/images/category-default.webp"}
      />

      <section className="bg-[#24160E] pt-10 pb-10  ">
  <div className="max-w-7xl mx-auto px-6 py-12">
    {products.length === 0 ? (
      <p>No products found</p>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => {
          const images = normalizeImages(product.images || product.image);
          const imageSrc =
            getValidImage(images?.[0]) || "/images/product-placeholder.png";

          return (
            <ProductCard
              key={product.id || product._id}
              product={{
                ...product,
                imageSrc,
              }}
            />
          );
        })}
      </div>
    )}
  </div>
</section>

    </>
  );
}
