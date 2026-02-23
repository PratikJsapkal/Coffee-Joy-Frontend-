"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { showCartProductsThunk, updateCartThunk, deleteCartThunk } from "@/redux/features/cartSlice";
import { useRouter } from "next/navigation";
import AddressPopup from "@/components/checkout/AddressPopup";
import { showAddress } from "@/api/shippingApi";
import { cheakoutThunk } from "@/redux/features/cheakoutSlice";
import { closeCart } from "@/redux/features/uiSlice";

export default function Cart({ onClose }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { products = [] } = useSelector((state) => state.cart);
  const cartItems = products?.cart || [];

  const [showAddressPopup, setShowAddressPopup] = useState(false);

  useEffect(() => {
    dispatch(showCartProductsThunk());
  }, [dispatch]);

  const handlePlusButton = (item) => {
    dispatch(updateCartThunk({
      cart_item_id: item.cart_item_id,
      quantity: item.quantity + 1
    }));
  };

  const handleMinusButton = (item) => {
    dispatch(updateCartThunk({
      cart_item_id: item.cart_item_id,
      quantity: item.quantity - 1
    }));
  };

  const handleRemoveButton = (item) => {
    dispatch(deleteCartThunk({
      cart_item_id: item.cart_item_id
    }));
  };

  const handleCheckout = async () => {
  try {
    const res = await showAddress();
    const addresses = res?.data || [];

    if (addresses.length > 0) {
      const defaultAddress =
        addresses.find((a) => a.is_default) || addresses[0];

      const result = await dispatch(
        cheakoutThunk({
          shipping_address_id: defaultAddress.id,
            coupon_code: null
        })
      ).unwrap();

      router.push(`/checkout?id=${result.checkout_session_id}`);
      onClose(); // close cart after successful checkout
    } else {
      setShowAddressPopup(true);
    }
  } catch (error) {
    console.log(error);
    router.push("/Auth/login");
  }
};

  const cartOpen = useSelector((state)=>state.ui.cartOpen)

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-[998]" onClick={onClose} />

      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-screen w-full sm:w-[420px] bg-black z-[999] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-[25px] font-medium tracking-wide text-white font-cinzel">CART</h2>
          <FiX className="cursor-pointer text-xl hover:rotate-90 transition" onClick={()=>dispatch(closeCart())} />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence>
            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center text-gray-500"
              >
                <FiShoppingCart size={64} className="mb-4 text-gray-400" />
                <p className="text-lg font-semibold">Your cart is empty</p>
                <p className="text-sm mt-4 text-gray-600">Add products to see them here</p>

                <motion.button
                  onClick={onClose}
                  className="mt-6 px-6 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </motion.button>
              </motion.div>
            ) : (
              cartItems.map((item) => (
                <motion.div
                  key={item.cart_item_id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="flex gap-4 border-b py-6"
                >
                  <Image
                    src={(item.images)?.[0] || "/placeholder.png"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <h3 className="font-playfair pt-4 pb-2">Stock : {item.in_stock}</h3>
                    <div className="flex items-center gap-3 mt-3">
                      <button className="cursor-pointer p-2 border rounded hover:bg-gray-100" onClick={() => handleMinusButton(item)}>
                        <FiMinus />
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button className="cursor-pointer p-2 border rounded hover:bg-gray-100" onClick={() => handlePlusButton(item)}>
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  <div className="font-semibold text-sm">₹{item.subtotal}</div>

                  <div className="pt-25">
                    <button onClick={() => handleRemoveButton(item)} className="cursor-pointer">
                      <MdDelete className="size-7 hover:text-red-500" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>

          {cartItems.length > 0 && (
            <div className="p-4 border-t">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleCheckout}
                className="w-full bg-white/25 backdrop-blur-3xl text-white py-4 rounded-full font-bold flex items-center justify-center gap-3 border border-white/20 hover:bg-white/50 transition cursor-pointer"
              >
                <FiShoppingCart size={20} />
                Proceed to Checkout
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Address Popup */}
      <AddressPopup
        open={showAddressPopup}
        from="cart"
        items={cartItems.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
          weight_kg: i.weight_kg
        }))}
        onClose={() => setShowAddressPopup(false)}
      />
    </>
  );
}
