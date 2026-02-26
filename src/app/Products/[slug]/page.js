"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductBySlug } from "@/redux/features/productSlice";
import Image from "next/image";
import { normalizeImages, getValidImage } from "@/utils/getValidImage";
import { Minus, Plus, ShoppingCart, Weight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { AddToCartThunk } from "@/redux/features/cartSlice";
import AddressPopup from "@/components/checkout/AddressPopup";
import { showAddress } from "@/api/shippingApi";
import { useRouter } from "next/navigation";
import { cheakoutThunk } from "@/redux/features/cheakoutSlice";
import { fetchProducts } from "@/redux/features/productSlice";
import ProductCard from "@/components/product/ProductCards";
import { useMemo } from "react";
import ProductReviewsSection from "@/components/product/ProductReviewsSection"





export default function ProductPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const router = useRouter()
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [showAddressPopup, setShowAddressPopup] = useState(false);
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);




const { data, currentProduct, loading, error } =
  useSelector((state) => state.product);

// Make it work whether API returns array OR object
const products = Array.isArray(data)
  ? data
  : data?.products || [];


  const product = currentProduct;
  const hasWeights = product?.weights && product.weights.length > 0;
const hasMultipleWeights = product?.weights?.length > 1;

const selectedWeight = hasWeights
  ? product.weights[selectedWeightIndex]
  : null;


  const images = product
    ? normalizeImages(product.images || [])
    : [];

  const imageSrc =
    product
      ? getValidImage(images?.[0]) ||
        "/images/product-placeholder.png"
      : "/images/product-placeholder.png";

const relatedProducts = useMemo(() => {
  if (!currentProduct || !products.length) return [];

  return products
    .filter((p) =>
      p.category_level_1 &&
      currentProduct.category_level_1 &&
      p.category_level_1.toLowerCase() ===
        currentProduct.category_level_1.toLowerCase() &&
      p.id !== currentProduct.id
    )
    .slice(0, 4);
}, [products, currentProduct]);


  useEffect(() => {
    if (slug) dispatch(fetchProductBySlug(slug));
    dispatch(fetchProducts());
  }, [slug, dispatch]);


  if (loading)
    return <div className="mt-40 text-center text-[#c7a17a]">Loading...</div>;

  if (error)
    return <div className="mt-40 text-center text-red-500">{error}</div>;

  if (!currentProduct) return null;



  

  const handleAddToCart = () => {
    dispatch(
      AddToCartThunk({
        product_id:product.id,
        quantity: qty,
         weight_kg: selectedWeight?.weight_kg,
        // weight_kg :product.weights[0].weight_kg,
      })
    );
  };

  const handleBuyNow = async () => {
    try {
      const res = await showAddress()
      const address = res?.data || []
    
    if(address.length > 0){
      const defaultAddress =
        address.find((a) => a.is_default) || address[0];

      const result = await dispatch(
        cheakoutThunk({
           shipping_address_id: defaultAddress.id,
  coupon_code: null,
  items: [
    {
      product_id: product.id,
      weight_kg: product.weights[0].weight_kg,
      quantity: qty
    }
  ]
        })
      ).unwrap()
      router.push(`/checkout?id=${result.checkout_session_id}`)
    }
    else{
      setShowAddressPopup(true)
    }
    } catch (error) {
      router.push("/Auth/login")
    }
};



  return (
    <section className="min-h-screen bg-[#24160E] text-[#f5efe6]">
     <div className="flex flex-col lg:flex-row min-h-screen items-start relative">


       {/* Decorative beans – top left */}
        <div className="pointer-events-none absolute top-0 -left-0 md:-top-8 md:-left-55 w-[60%] md:w-[35%] z-[20] hidden lg:block">

            <img
              src="https://cdns.barecms.com/images/bean13.webp"
              alt="fufuyguyg"
              className="w-full max-w-none rotate-180"
            />
          </div>

          {/* Decorative beans – bottom right */}
          <div className="pointer-events-none absolute inset-0 z-[0] hidden lg:block">
            <img
              src="https://cdns.barecms.com/images/beans14.webp"
              alt="something"
              className="absolute md:-bottom-0 lg:right-0 md:w-[35%]  w-[105%] right-0 max-w-none opacity-80 sepia
              hue-rotate-[18deg]
              saturate-[0.6]
              brightness-[1.25]"
            />
          </div>
        {/* ================= LEFT : IMAGE CARD ================= */}
        <div className="lg:w-[45%] relative overflow-hidden flex justify-center items-center md:py-17 py-12 md:pr-8 md:pt-22 ">

          {/* Desktop Image */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-8
            bg-[#b2a28e] w-full max-w-[650px] h-[650px] rounded-br-[58px]
            shadow-[0_40px_80px_rgba(0,0,0,0.45)] relative z-10"
          >
            {images[activeImage] && (
              <Image
                src={getValidImage(images[activeImage])}
                alt={product.name}
                width={420}
                height={420}
                priority
                className="object-contain w-[420px] h-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)] rounded-3xl"
              />
            )}

            {/* Thumbnails */}
            <div className="flex flex-wrap justify-center gap-4 px-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border transition-all
                    ${activeImage === index ? "border-[#c7a17a]" : "border-[#3a2a1a] opacity-60 hover:opacity-100"}`}
                >
                  <Image
                    src={getValidImage(img)}
                    alt={`thumbnail-${index}`}
                    width={64}
                    height={64}
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Slider */}
          <div className="lg:hidden w-full px-4">
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="min-w-full snap-center flex justify-center items-center
                  bg-[#1a120c] rounded-2xl p-6 border border-[#3a2a1a]/40"
                >
                  <Image
                    src={getValidImage(img)}
                    alt={`product-${index}`}
                    width={320}
                    height={320}
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ================= RIGHT : PRODUCT DETAILS ================= */}
        <div className="lg:w-[50%]  w-auto px-6 lg:px-16  flex flex-col justify-between relative z-[10]  md:pt-20 pt-0 pb-6">

          <div>
            {product.categoryLevel3 && (
              <p className="text-sm uppercase tracking-widest text-[#c7a17a] mb-6">
                {product.categoryLevel2}
              </p>
            )}

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mt-6 font-cinzel">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-2 flex items-center gap-5">
              {product.discountPrice && (
                <p className="line-through text-gray-500 text-lg">
                  ₹{ product.weights[0].price}
                </p>
              )}
            </div>

{/* Price + Subscribe */}
<div className="mt-2 flex items-center gap-5 flex-wrap">
  
  <div className="flex items-center gap-4">
    <p className="text-3xl font-bold text-[#c7a17a]">
      ₹{selectedWeight?.discount_price || selectedWeight?.price}
    </p>

    {selectedWeight?.discount_price && (
      <p className="line-through text-gray-500 text-lg">
        ₹{selectedWeight?.price}
      </p>
    )}
  </div>

  {product?.is_subscribable && (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={() => router.push("/subscription")}
    className="cursor-pointer px-6 py-1.5 text-md font-semibold rounded-full bg-[#c7a17a] text-black hover:bg-[#d6ba9e] transition"
  >
    Subscribe & Save !
  </motion.button>
)}
</div>
{/* Weight Selector */}
{hasMultipleWeights && (
  <div className="mt-6">
 

    <div className="flex gap-3 flex-wrap">
      {product.weights.map((weight, index) => (
        <button
          key={weight.sku}
          onClick={() => setSelectedWeightIndex(index)}
          className={`px-5 py-2 rounded-full border text-sm font-medium transition
            ${
              selectedWeightIndex === index
                ? "bg-[#c7a17a] text-black border-[#c7a17a]"
                : "border-[#3a2a1a] text-gray-300 hover:border-[#c7a17a]"
            }`}
        >
          {weight.weight_grams}g
        </button>
      ))}
    </div>
  </div>
)}


            {/* Description */}
           <p className="mt-4 text-gray-300 leading-relaxed text-base max-w-3xl">
    {product.description}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
              <Spec label="Roast Level" value={product.roastLevel} />
              <Spec label="Roast Colour" value={product.roastColour} />
              <Spec
  label="Stock"
  value={selectedWeight?.in_stock ? "In Stock" : "Out of Stock"}
  valueClass={
    selectedWeight?.in_stock ? "text-green-400" : "text-red-500"
  }
/>

<Spec label="Quantity" value={selectedWeight?.quantity} />

          
              
            </div>

            {/* Quantity Selector */}
            <div className="mt-3">
              <div className="inline-flex items-center border border-[#3a2a1a] rounded-full overflow-hidden">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-5 py-3 hover:bg-[#1a120c]"
                >
                  <Minus size={18} />
                </motion.button>

                <span className="px-6">{qty}</span>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQty((q) => q + 1)}
                  className="px-5 py-3 hover:bg-[#1a120c]"
                >
                  <Plus size={18} />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex grid-cols-2 gap-4 mt-3 pb-6 lg:pb-0">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="cursor-pointer w-full bg-[#c7a17a] text-black py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-[#d6ba9e] transition"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </motion.button>






           <motion.button
  whileTap={{ scale: 0.95 }}
  onClick={handleBuyNow}
  className=" cursor-pointer w-full border border-[#c7a17a] bg-[#c7a17a] text-black py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-[#d6ba9e] transition"
>
  <Zap size={20} />
  Buy Now
</motion.button>


          </div>

        </div>



      </div>


{product?.id && (
  <ProductReviewsSection productId={product.id} />
)}

      

     {/* ================= RELATED PRODUCTS SECTION ================= */}
{relatedProducts.length > 0 && (
  <section className="bg-[#1a120c] py-20 ">
    <div className="max-w-7xl mx-auto px-6 lg:px-16">
      
      {/* Heading */}
      <h2 className="text-3xl lg:text-4xl font-cinzel text-[#c7a17a] mb-12 text-center">
        You May Also Like
      </h2>

      {/* 📱 Mobile Scroll */}
      <div className="flex md:hidden overflow-x-auto gap-6 px-2">
        {relatedProducts.map((product) => {
          const images = normalizeImages(product.images);
          const imageSrc =
            getValidImage(images?.[0]) ||
            "/images/product-placeholder.png";

          return (
<div key={product.id} className="min-w-[85%] shrink-0">      
          <ProductCard
                product={{
                  ...product,
                  imageSrc,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 💻 Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-4 gap-8">
        {relatedProducts.map((product) => {
          const images = normalizeImages(product.images);
          const imageSrc =
            getValidImage(images?.[0]) ||
            "/images/product-placeholder.png";

          return (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                imageSrc,
              }}
            />
          );
        })}
      </div>

    </div>
  </section>
)}

      <AddressPopup
  open={showAddressPopup}
  productId={product.id}
  qty={qty}
  weight={product.weights[0].weight_kg}
  from="pdp"
  onClose={() => setShowAddressPopup(false)}
  onSubmit={(addressData) => {
    console.log("Address from PDP:", addressData);




    setShowAddressPopup(false);
  }}
/>
     
    </section>
  );
}



/* ================= SPEC CARD ================= */
function Spec({ label, value, valueClass = "text-[#c7a17a]" }) {
  return (
    <div className="border border-[#3a2a1a] p-3 rounded-lg">
      <p className="text-gray-400 text-xs">{label}</p>
      <p className={`mt-1 font-medium ${valueClass}`}>{value}</p>
    </div>
  );
}
