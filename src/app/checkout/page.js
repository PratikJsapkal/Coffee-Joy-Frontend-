"use client";

import React, { useEffect, useState ,Suspense  } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { showShippingAddressThunk, updateShippingAddressThunk } from "@/redux/features/shippingSlice";
import { showCheakoutThunk } from "@/redux/features/cheakoutSlice";
import { useSearchParams } from "next/navigation";
import { getValidImage ,normalizeImages } from "@/utils/getValidImage";
import { createPaymentThunk } from "@/redux/features/paymentSlice";
import api from "@/api/axiosInstance"; 


function CheckoutContent() {
  const [edit, setEdit] = useState(false);
  const searchParam = useSearchParams()
  const [method , setMethod] = useState({
     paymentMethod : "PHONEPE"
  })
  const [fdata, setFdata] = useState({
    full_name: "",
    phone: "",
    address_type: "HOME",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    is_default: false,
  });

  const dispatch = useDispatch();
  const { address, loading } = useSelector((state) => state.shipping);

  const [couponCode, setCouponCode] = useState("");
const [couponLoading, setCouponLoading] = useState(false);
const [couponError, setCouponError] = useState("");
const [couponSuccess, setCouponSuccess] = useState("");
  
  useEffect(() => {
    dispatch(showShippingAddressThunk());
  }, [dispatch]);
  
  const defaultAddress = address?.data?.[0];
  
  // Sync fdata with defaultAddress
  useEffect(() => {
    if (defaultAddress) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFdata({
        full_name: defaultAddress.full_name || "",
        phone: defaultAddress.phone || "",
        address_type: defaultAddress.address_type || "HOME",
        address_line1: defaultAddress.address_line1 || "",
        address_line2: defaultAddress.address_line2 || "",
        city: defaultAddress.city || "",
        state: defaultAddress.state || "",
        postal_code: defaultAddress.postal_code || "",
        country: defaultAddress.country || "India",
        is_default: defaultAddress.is_default === 1,
      });
    }
  }, [defaultAddress]);
  
  const handleEditbuttton = () => setEdit((prev) => !prev);
  
  const handleSubmitButton =  (e) => {
    e.preventDefault();
    if (!defaultAddress?.id) return;
    
    const data = {
      id: defaultAddress.id,
      ...fdata,
      address_type: fdata.address_type.toLowerCase(),
      is_default: fdata.is_default ? 1 : 0,
    };
    
    dispatch(updateShippingAddressThunk(data)).then(()=>{
      setEdit(false)
      dispatch(showShippingAddressThunk())
    })
  };
  
  const cheakoutProducts = useSelector((state)=>state.cheakout.cheakoutProducts)
  const id = searchParam.get("id")

  useEffect(() => {
    if (id) {
      dispatch(showCheakoutThunk(id));
    }
  }, [id , dispatch] );

  const handleCheakoutButton = async ()=>{
    const payload ={
      checkout_session_id : cheakoutProducts.checkout_session_id,
      paymentMethod: method.paymentMethod,
    }
    try {
      const response = await dispatch(createPaymentThunk(payload)).unwrap();
      if(response.checkoutUrl){
        window.location.href = response.checkoutUrl
      }
    } catch (error) {
      console.error("Payment failed", error);
    }
    // dispatch(createPaymentThunk(payload))
  }


const handleApplyCoupon = async () => {
  if (!couponCode) return;

  setCouponLoading(true);
  setCouponError("");
  setCouponSuccess("");

  try {
    const res = await api.post(
      "/coupon/apply",
      {
        coupon_code: couponCode,
        checkout_session_id: cheakoutProducts.checkout_session_id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setCouponSuccess("Coupon applied successfully!");

    // 🔥 REFRESH CHECKOUT DATA
    dispatch(showCheakoutThunk(id));

  } catch (error) {
    setCouponError(
      error.response?.data?.message || "Failed to apply coupon"
    );
  } finally {
    setCouponLoading(false);
  }
};  
  return (
    <div className="min-h-screen bg-[#2a1816] px-4 py-17 md:py-30">
      <div className="mx-auto max-w-6xl grid grid-cols-1 gap-6 md:grid-cols-3 items-start">
        {/* LEFT COLUMN */}
        <div className="md:col-span-2 space-y-6 w-full md:w-3xl">
          {/* SHIPPING ADDRESS */}
          <div className="rounded-xl bg-[#f5efe6] p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#3b2a26]">Shipping Address</h2>
              <button
                onClick={handleEditbuttton}
                className="cursor-pointer text-sm text-[#7b4a3e] hover:underline"
              >
                Change
              </button>
            </div>

            <div className="rounded-lg border border-[#e3d6c6] bg-white p-4 text-sm">
              {edit ? (
                <form onSubmit={handleSubmitButton} className="space-y-3 text-sm text-black">
                  {/* Row 1 */}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs font-medium">Full Name</label>
                      <input
                        required
                        type="text"
                        value={fdata.full_name}
                        onChange={(e) => setFdata({ ...fdata, full_name: e.target.value })}
                        className="w-full rounded-md border border-gray-400 px-3 py-2 text-black placeholder-gray-500 focus:border-black focus:outline-none"
                      />
                    </div>
                    <div className="flex-1 sm:w-40">
                      <label className="mb-1 block text-xs font-medium">Phone</label>
                      <input
                        required
                        type="tel"
                        value={fdata.phone}
                        onChange={(e) => setFdata({ ...fdata, phone: e.target.value })}
                        className="w-full rounded-md border border-gray-400 px-3 py-2 text-black placeholder-gray-500 focus:border-black focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs font-medium">Address Line 1</label>
                      <input
                        required
                        type="text"
                        value={fdata.address_line1}
                        onChange={(e) => setFdata({ ...fdata, address_line1: e.target.value })}
                        className="w-full rounded-md border border-gray-400 px-3 py-2 text-black placeholder-gray-500 focus:border-black focus:outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="mb-1 block text-xs font-medium">Address Line 2</label>
                      <input
                        type="text"
                        value={fdata.address_line2}
                        onChange={(e) => setFdata({ ...fdata, address_line2: e.target.value })}
                        className="w-full rounded-md border border-gray-400 px-3 py-2 text-black placeholder-gray-500 focus:border-black focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs font-medium">City</label>
                      <input
                        required
                        type="text"
                        value={fdata.city}
                        onChange={(e) => setFdata({ ...fdata, city: e.target.value })}
                        className="w-full rounded-md border border-gray-400 px-3 py-2 text-black placeholder-gray-500 focus:border-black focus:outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="mb-1 block text-xs font-medium">State</label>
                      <input
                        required
                        type="text"
                        value={fdata.state}
                        onChange={(e) => setFdata({ ...fdata, state: e.target.value })}
                        className="w-full rounded-md border border-gray-400 px-3 py-2 text-black placeholder-gray-500 focus:border-black focus:outline-none"
                      />
                    </div>
                    <div className="sm:w-28">
                      <label className="mb-1 block text-xs font-medium">PIN</label>
                      <input
                        required
                        type="text"
                        value={fdata.postal_code}
                        onChange={(e) => setFdata({ ...fdata, postal_code: e.target.value })}
                        className="w-full rounded-md border border-gray-400 px-3 py-2 text-black placeholder-gray-500 focus:border-black focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                    <div className="flex-1">
                      <label className="mb-1 block text-xs font-medium">Country</label>
                      <input
                        disabled
                        value="India"
                        className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-black"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium">Address Type</label>
                      <div className="flex gap-2 flex-wrap">
                        {["HOME", "OFFICE", "OTHER"].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFdata({ ...fdata, address_type: type })}
                            className={`rounded-md px-3 py-2 text-xs border ${
                              fdata.address_type === type
                                ? "border-black bg-black text-white"
                                : "border-gray-400"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleEditbuttton}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="rounded-md bg-black px-5 py-2 text-sm text-white hover:opacity-90"
                    >
                      {loading ? "Updating..." : "Update"}
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="font-medium text-black">{defaultAddress?.full_name}</p>
                  <p className="text-black">
                    {defaultAddress?.address_line1}, {defaultAddress?.address_line2}, {defaultAddress?.city} – {defaultAddress?.postal_code}
                  </p>
                  <p className="text-black">
                    {defaultAddress?.state} , {defaultAddress?.country}
                  </p>
                  <p className="text-gray-800">Phone: {defaultAddress?.phone}</p>
                </>
              )}
            </div>
          </div>

          {/* DELIVERY DETAILS */}
          <div className="rounded-xl bg-[#f5efe6] p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-black">Payment Methods</h2>
            <p className="text-sm text-black">
              Select <span className="font-medium">Payment Method</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {["COD", "PHONEPE"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setMethod({...method  , paymentMethod : type })}
                  className={`rounded-md px-3 py-2 text-xs border ${
                    method.paymentMethod === type
                      ? "border-black bg-black text-white"
                      : "border-gray-400 text-black"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* COUPON */}
         <div className="rounded-xl bg-[#f5efe6] p-6 shadow-sm">
  <h2 className="mb-3 text-lg font-semibold text-[#120d0b]">
    Apply Coupon
  </h2>

  <div className="flex gap-2 flex-col sm:flex-row  text-[#120d0b]">
    <input
      type="text"
      value={couponCode}
      onChange={(e) => setCouponCode(e.target.value)}
      placeholder="Enter coupon code"
      className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none"
    />

    <button
      onClick={handleApplyCoupon}
      disabled={couponLoading}
      className="rounded-md bg-[#3b2a26] px-4 py-2 text-sm text-white"
    >
      {couponLoading ? "Applying..." : "Apply"}
    </button>
  </div>

  {couponError && (
    <p className="text-red-600 text-sm mt-2">{couponError}</p>
  )}

  {couponSuccess && (
    <p className="text-green-600 text-sm mt-2">{couponSuccess}</p>
  )}
</div>
        </div>

        {/* RIGHT COLUMN */}
       <div className="
  relative md:sticky md:top-6
  rounded-xl bg-[#f5efe6] p-4 md:p-6 shadow-sm
  max-h-[80vh] md:max-h-[85vh]
  flex flex-col
">
          <h2 className="mb-4 text-lg font-semibold text-[#3b2a26]">Order Summary</h2>
          <div className="flex-1 overflow-y-auto pr-2">
  {cheakoutProducts?.items?.map((product,index)=>{
              const images = normalizeImages(product.product_image)
              const mainImage = images[0]
             return (
              <div key={index} className="mb-4 flex gap-4 border-b border-[#e3d6c6] pb-4">
                <div className="flex-shrink-0">
                   <Image src={getValidImage(mainImage)} alt={product.product_name} width={100} height={50} className="object-cover"/> 
                </div>
                <div className="text-start">
                  <p className="text-black font-playfair text-[17px] pb-1">{product.product_name}</p>
                  <div className="flex gap-4 justify-start flex-wrap">
                    <p className="text-black font-inter text-[13px]">weight: {product.weight_kg}kg</p>
                    <p className="text-red-600 font-inter text-[13px]">Quantity: {product.quantity} </p>
                  </div>
                  <p className="text-black font-inter text-[15px]">Price:  {product.price}</p>
                </div>
              </div>
             )
              })}
</div>
         
          

          {/* BILLING */}
          <div className="pt-4 border-t border-[#e3d6c6] mt-4">
          <div className="space-y-2 text-sm text-black">
            <div className="flex justify-between"><span>Subtotal</span><span className="text-black">₹ {cheakoutProducts?.subtotal}</span></div>
            <div className="flex justify-between"><span>GST</span><span>₹ {cheakoutProducts?.total_gst}</span></div>
            <div className="flex justify-between"><span>Discount</span><span>₹ {cheakoutProducts?.discount}</span></div>
            <div className="flex justify-between border-t border-[#e3d6c6] pt-2 font-semibold"><span>Total</span><span>₹ {cheakoutProducts?.final_amount}</span></div>
          </div>

          <button onClick={handleCheakoutButton} className="cursor-pointer mt-6 w-full rounded-lg bg-green-700 py-3 font-semibold text-white hover:bg-green-800">
            Checkout
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}


export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}