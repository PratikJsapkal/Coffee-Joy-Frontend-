"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AddToCartThunk } from "@/redux/features/cartSlice";
import { useRouter } from "next/navigation";




import {
  fetchPlanById,
  fetchSubscribableProducts,
  setSelectedProduct,
} from "@/redux/features/subscriptionSlice";

export default function PlanDetailPage() {
  const { planId } = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const router = useRouter();

// Example: assuming you store auth info in Redux
const { user } = useSelector((state) => state.auth); // or whatever your auth slice is
const userLoggedIn = !!user; // true if logged in


  const {
    selectedPlan,
    products,
    selectedProduct,
    loading,
  } = useSelector((state) => state.subscription);

  const [selectedWeight, setSelectedWeight] = useState(null);

/***** AUTO SELECT DEFAULT PRODUCT + WEIGHT *****/
useEffect(() => {
  if (products.length > 0 && !selectedProduct) {
    const firstProduct = products[0];
    dispatch(setSelectedProduct(firstProduct));

    const firstWeight = firstProduct.weights?.find((w) => w.in_stock);
    if  (firstWeight) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedWeight(firstWeight);
    }
  }
}, [products, selectedProduct, dispatch]);


  /* ================= FETCH PLAN ================= */
  useEffect(() => {
    if (planId) dispatch(fetchPlanById(planId));
  }, [planId, dispatch]);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    if (selectedPlan?.category_level_1) {
      dispatch(fetchSubscribableProducts(selectedPlan.category_level_1));
    }
  }, [selectedPlan, dispatch]);

  /* ================= PRICE CALCULATION ================= */
  const priceBreakdown = useMemo(() => {
    if (!selectedPlan || !selectedProduct || !selectedWeight) return null;

    const basePrice =
      selectedWeight.discount_price ?? selectedWeight.price;

    const discountAmount =
      (basePrice * selectedPlan.discount_percent) / 100;

    const finalPerDelivery = +(basePrice - discountAmount).toFixed(2);

    const totalPrice =
      +(finalPerDelivery * selectedPlan.deliveries_count).toFixed(2);

    return {
      basePrice,
      discountAmount,
      finalPerDelivery,
      totalPrice,
    };
  }, [selectedPlan, selectedProduct, selectedWeight]);

  if (loading) return <p className="text-white p-10">Loading...</p>;
  if (!selectedPlan) return <p className="text-white p-10">Plan not found</p>;

   /* ================= CART / BUY LOGIC ================= */

   const handleAddToCart = () => {
  if (!selectedProduct || !selectedWeight || !selectedPlan) return;

  if (!userLoggedIn) {
    router.push("/Auth/login"); // redirect to login
    return;
  }

  const cartItem = {
    product_id: selectedProduct.id,
    quantity: selectedPlan.deliveries_count,
    weight_kg: selectedWeight.weight_kg,
    subscription_plan_id: selectedPlan.id,
    price_per_delivery: priceBreakdown.finalPerDelivery,
    total_price: priceBreakdown.totalPrice,
  };

  dispatch(AddToCartThunk(cartItem));
};

const handleBuyNow = async () => {
  if (!selectedProduct || !selectedWeight || !selectedPlan) return;

  if (!userLoggedIn) {
    router.push("/Auth/login"); // redirect to login
    return;
  }

  try {
    const res = await showAddress();
    const address = res?.data || [];

    if (address.length === 0) {
      setShowAddressPopup(true);
      return;
    }

    const defaultAddress = address.find((a) => a.is_default) || address[0];

    const checkoutItem = {
      product_id: selectedProduct.id,
      weight_kg: selectedWeight.weight_kg,
      quantity: selectedPlan.deliveries_count,
      subscription_plan_id: selectedPlan.id,
      price_per_delivery: priceBreakdown.finalPerDelivery,
      total_price: priceBreakdown.totalPrice,
    };

    const result = await dispatch(
      cheakoutThunk({
        shipping_address_id: defaultAddress.id,
        coupon_code: null,
        items: [checkoutItem],
      })
    ).unwrap();

    router.push(`/checkout?id=${result.checkout_session_id}`);
  } catch (error) {
    router.push("/Auth/login");
  }
};





   


  return (
    <section className="min-h-screen bg-[#24160E] text-[#f5efe6]">
      <div className="flex flex-col lg:flex-row min-h-screen relative">

             {/* Decorative beans – top left */}
        <div className="pointer-events-none absolute top-0 -left-0 md:-top-8 md:-left-62 w-[60%] md:w-[35%] z-[20] hidden lg:block">

            <img
              src="/images/bean13.webp"
              alt="fufuyguyg"
              className="w-full max-w-none rotate-180"
            />
          </div>

          {/* Decorative beans – bottom right */}
          <div className="pointer-events-none absolute inset-0 z-1 hidden lg:block">
            <img
              src="/images/beans14.webp"
              alt="something"
              className="absolute md:-bottom-0 lg:right-0 md:w-[40%]  w-[105%] right-0 max-w-none opacity-80 sepia
              hue-rotate-[18deg]
              saturate-[0.6]
              brightness-[1.25]"
            />
          </div>

        {/* ================= LEFT — PLAN CARD ================= */}
       <div className="lg:w-[45%] relative overflow-hidden flex justify-center items-center md:py-17 py-12 md:pr-20 ">
          <div className="bg-[#b2a28e] w-full max-w-[600px] h-[600px]
            rounded-br-[58px] shadow-[0_40px_80px_rgba(0,0,0,0.45)]
            flex flex-col justify-center items-center text-center p-10 font-cinzel">

              <div
    className="bg-[#21150b] border border-[#3a2a1a]
    rounded-3xl w-[80%] max-w-[420px]
    p-10 text-center space-y-5
    shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
  >

            <h1 className="text-3xl font-cinzel text-white  mb-4 font-semibold">
              {selectedPlan.name}
            </h1>

            <p className="text-white">
              {selectedPlan.deliveries_count} Deliveries
            </p>

            <p className="text-white">
              {selectedPlan.discount_percent}% Discount
            </p>

            <p className="text-2xl font-bold text-white mt-6 font-cinzel">
  {selectedPlan.display_label}
</p>

          </div>
          </div>
        </div>

        {/* ================= RIGHT — CONFIG ================= */}
        <div className="lg:w-[55%] px-6 lg:px-8 pt-18 pb-10 z-[20]">

          {/* PRODUCT SELECT */}
          <p className="text-2xl uppercase tracking-widest text-[#c7a17a] mb-4 font-cinzel font-semibold">
            Select Product
          </p>

          <select
            value={selectedProduct?.id || ""}
            onChange={(e) => {
              const product = products.find(
                (p) => p.id === Number(e.target.value)
              );
              dispatch(setSelectedProduct(product));
              setSelectedWeight(null);
            }}
            className="w-full bg-[#1a120c] border border-[#3a2a1a]
              px-5 py-3 rounded-full text-white mb-8 font-cinzel"
          >
            <option value="">Choose Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* WEIGHT SELECT */}
          {selectedProduct && (
            <>
              <p className="text-2xl uppercase tracking-widest text-[#c7a17a] mb-3 font-cinzel font-semibold ">
                Select Weight
              </p>

              <div className="flex gap-3 flex-wrap mb-8">
                {selectedProduct.weights
                  ?.filter((w) => w.in_stock)
                  .map((w) => (
                    <button
                      key={w.weight_grams}
                      onClick={() => setSelectedWeight(w)}
                      className={`px-5 py-2 rounded-full border text-sm
                        ${
                          selectedWeight?.weight_grams === w.weight_grams
                            ? "bg-[#c7a17a] text-black border-[#c7a17a]"
                            : "border-[#3a2a1a] text-gray-300"
                        }`}
                    >
                      {w.weight_grams}g
                    </button>
                  ))}
              </div>
            </>
          )}

         {/* ================= PRICE SECTION ================= */}

{selectedProduct && selectedWeight && priceBreakdown ? (

  /* -------- DETAILED BREAKDOWN -------- */
  <div
    key="detailed"
    className="bg-[#1a120c]/60 border border-[#3a2a1a]
    p-6 rounded-2xl space-y-3"
  >
    <div className="flex items-center gap-4">
      <p className="text-xl font-bold text-[#c7a17a] font-cinzel">
        ₹{priceBreakdown.finalPerDelivery}
      </p>

      {selectedWeight.discount_price && (
        <p className="line-through text-gray-500 text-lg font-cinzel">
          ₹{selectedWeight.price}
        </p>
      )}
    </div>

    <p className="text-gray-200 font-cinzel">
      Base Price: ₹{priceBreakdown.basePrice}
    </p>

    <p className="text-gray-200 font-cinzel">
      Discount ({selectedPlan.discount_percent}%): -₹
      {priceBreakdown.discountAmount.toFixed(2)}
    </p>

    <p className="text-gray-200 font-cinzel">
      Deliveries: {selectedPlan.deliveries_count}
    </p>

    <p className="text-2xl font-bold text-[#f5efe6] pt-2 font-cinzel">
      Total: ₹{priceBreakdown.totalPrice}
    </p>
  </div>

) : (

  /* -------- DEFAULT DISPLAY PRICE -------- */
  selectedPlan.display_price && (
    <div
      key="default"
      className="bg-[#1a120c] border border-[#3a2a1a]
      p-6 rounded-2xl space-y-3"
    >
      <p className="text-3xl font-bold text-[#c7a17a] font-cinzel">
        ₹{selectedPlan.display_price}
      </p>

      <p className="text-gray-400 font-cinzel">
        {selectedPlan.deliveries_count} Deliveries Included
      </p>

      <p className="text-gray-400 font-cinzel">
        {selectedPlan.discount_percent}% Subscription Discount Applied
      </p>
    </div>
  )

)}


         

         

             {/* ADD TO CART & BUY NOW BUTTONS */}
          <div className="flex gap-4 mt-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="cursor-pointer w-full bg-[#c7a17a]/80 text-black py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-[#d6ba9e] transition"
            >
              Add to Cart
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleBuyNow}
              className="cursor-pointer w-full border border-[#c7a17a] bg-[#c7a17a]/80 text-black py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-[#d6ba9e] transition"
            >
              Buy Now
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
}
