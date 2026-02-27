"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { useSelector, useDispatch } from "react-redux";

import ProductCard from "@/components/product/ProductCards";
import SubscriptionHero from "@/components/subscribePage/SubscriptionHero";

import { fetchProducts } from "@/redux/features/productSlice";
import { getActivePlans } from "@/api/subscriptionApi";
import { getValidImage, normalizeImages } from "@/utils/getValidImage";


export default function SubscribePage() {
  const router = useRouter();
  const dispatch = useDispatch();
 const planScrollRef = useRef(null);
const productScrollRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("COFFEE");
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDesktop, setIsDesktop] = useState(true);

  const CARD_WIDTH = 260;
  const GAP = 24;
  const VIEWPORT_WIDTH = isDesktop ? CARD_WIDTH * 5 + GAP * 4 : "100%";

  // Fetch all products from Redux
  const { loading } = useSelector((state) => state.product);
  const allProducts = useSelector((state) => state.product.data?.products || []);

  // Filter subscribable products
  const subscribableProducts = useMemo(() => {
    return allProducts.filter((product) => product.is_subscribable);
  }, [allProducts]);

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Fetch plans when category changes
  useEffect(() => {
    const fetchPlansByCategory = async () => {
      setPlansLoading(true);
      try {
        const data = await getActivePlans(selectedCategory);
        setPlans(data);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setPlans([]);
      } finally {
        setPlansLoading(false);
      }
    };
    fetchPlansByCategory();
  }, [selectedCategory]);

  //scroll functions 

const scrollPlans = (direction) => {
  if (!planScrollRef.current) return;

  const scrollAmount = CARD_WIDTH + GAP;

  planScrollRef.current.scrollBy({
    left: direction === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth",
  });
};

const scrollProducts = (direction) => {
  if (!productScrollRef.current) return;

  const scrollAmount = CARD_WIDTH + GAP;

  productScrollRef.current.scrollBy({
    left: direction === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth",
  });
};

  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  // Responsive check
  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
<section className="relative min-h-screen px-6 md:px-16 py-16 bg-[#231b0f]">
      <SubscriptionHero />

      {/* Heading Section */}
      <div className="max-w-8xl mx-auto mb-16 mt-10 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-cinzel mb-10">
          Completely Customise your Subscription, in just a few clicks
        </h1>

        {/* Icons Section */}
        <div className="md:w-7xl w-full overflow-hidden bg-[#eedecb] rounded-2xl py-10">
          <div className="flex lg:grid grid-cols-5 gap-8 place-items-center overflow-x-auto scrollbar-hide">
            {[
              { label: "NUMBER", icon: "https://cdns.barecms.com/images/icon4.webp" },
              { label: "PACK SIZE", icon: "https://cdns.barecms.com/images/icon1.webp" },
              { label: "COFFEES", icon: "https://cdns.barecms.com/images/icon2.webp" },
              { label: "GRIND SIZE", icon: "https://cdns.barecms.com/images/icon5.webp" },
              { label: "FREQUENCY", icon: "https://cdns.barecms.com/images/icon3.webp" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 shrink-0 min-w-[120px]"
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-20 h-20 object-contain"
                />
                <p className="text-xs tracking-widest font-semibold text-[#231b0f]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

   

      {/* ================= PLANS SECTION ================= */}

      <section id="plans" className="scroll-mt-24">
   
       <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <h2 className="text-3xl font-cinzel text-white text-center mb-6">
            Choose Your Subscription Plan
          </h2>

          {/* ===== Category Toggle BELOW heading ===== */}
          <div className="flex gap-4 mb-10 justify-center">
            {["COFFEE", "PODS"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={clsx(
                  "px-6 py-2 rounded-full font-medium border",
                  selectedCategory === cat
                    ? "bg-white text-black border-white"
                    : "bg-[#2e1f14] text-white border-[#3a281c]"
                )}
              >
                {cat === "COFFEE" ? "Coffee Plans" : "Pods Plans"}
              </button>
            ))}
          </div>

          {plansLoading ? (
            <p className="text-center text-white/60">Loading plans…</p>
          ) : plans.length === 0 ? (
            <p className="text-center text-white/60">
              No {selectedCategory.toLowerCase()} plans available
            </p>
          ) : (
           <div
 ref={planScrollRef}
  className={clsx(
    "flex gap-6",
    isDesktop
      ? "justify-center flex-wrap"
      : "overflow-x-auto snap-x snap-mandatory px-4 scrollbar-hide"
  )}
>
  {plans.map((plan) => (
    <div
      key={plan.id}
      onClick={() => router.push(`/subscription/${plan.id}`)}
      className="shrink-0 snap-start bg-[#2e1f14] text-white w-[260px] p-6 rounded-2xl cursor-pointer hover:scale-105 transition-all duration-300 border border-[#3a281c]"
    >
      <h3 className="text-xl font-cinzel mb-4 text-center">{plan.name}</h3>
      <p className="text-sm text-white/70 text-center mb-6 ">
        {plan.description || "Customize your subscription "}
       
      </p>
       <p className="text-sm text-white/70 text-center mb-1 ">
       {plan.description || "Plan Starting at "}
       </p>
      <div className="text-center">
        <p className="text-3xl font-bold">₹{plan.display_price}</p>
        <p className="text-xs text-white/50 mt-1">{plan.deliveries_count} Deliveries</p>
      </div>
      <button className="mt-6 w-full bg-white text-black py-2 rounded-full font-medium hover:bg-gray-200 transition">
        Select Plan
      </button>

      
    </div>

   
  ))}
</div>



          )}

          <div className="flex justify-center gap-6 mt-10">
             <button
                  onClick={() => scrollPlans("left")}
                  className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-white hover:text-black transition"
                >
                  ←
                </button>

                <button
                  onClick={() => scrollPlans("right")}
                  className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-white hover:text-black transition"
                >
                  →
                </button>


          </div>
        </div>
        </section>
      

      {/* ================= PRODUCTS SECTION ================= */}
      
       <div className="max-w-7xl mx-auto px-6 md:px-18 py-12 ">
          <h2 className="text-3xl font-cinzel text-white text-center mb-10">
            Choose Products for Subscription
          </h2>

          {loading ? (
            <p className="text-center text-white/60">Loading products…</p>
          ) : (
            <>
           <div className="w-full max-w-7xl mx-auto">
                <div
                  ref={productScrollRef}
                  className="flex gap-6 scroll-smooth scrollbar-hide overflow-x-hidden"
                >
                  {subscribableProducts.map((product) => {
                    const images = normalizeImages(product.images);
                    const imageSrc =
                      getValidImage(images?.[0]) || "/images/product-placeholder.png";

                    return (
                      <div
                        key={product._id}
                        className="shrink-0 cursor-pointer transition"
                        style={{ width: CARD_WIDTH }}
                        onClick={() => setSelectedProduct(product)}
                      >
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
              </div>

              <div className="flex justify-center gap-6 mt-10">
                <button
                  onClick={() => scrollProducts("left")}
                  className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-white hover:text-black transition"
                >
                  ←
                </button>

                <button
                  onClick={() => scrollProducts("right")}
                  className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-white hover:text-black transition"
                >
                  →
                </button>
              </div>
            </>
          )}
        </div>
      
    </section>
  );
}