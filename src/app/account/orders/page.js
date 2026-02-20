"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { showUserOrdersThunk } from "@/redux/features/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { getValidImage, normalizeImages } from "@/utils/getValidImage";

export default function Orders({ onBack }) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeStatus, setActiveStatus] = useState("all");

  const dispatch = useDispatch();

  /* 📱 detect mobile */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleBackClick = () => {
    if (isMobile && onBack) {
      onBack();
      return;
    }
    setShowForm(false);
    setEditId(null);
  };

  const orders = useSelector((state) => state.orders.orders.orders);

  useEffect(() => {
    dispatch(showUserOrdersThunk());
  }, [dispatch]);

  /* ---------------- STATUS FILTER LOGIC ---------------- */
  const filteredOrders = orders?.filter((order) => {
    if (activeStatus === "all") return true;
    if (activeStatus === "pending") return order.status === "pending";
    if (activeStatus === "completed") return order.status === "delivered";
    if (activeStatus === "cancelled") return order.status === "cancelled";
    return true;
  });

  /* ---------------- INVOICE DOWNLOAD ---------------- */
  const downloadInvoice = (invoiceUrl) => {
    if (!invoiceUrl) {
      alert("Invoice not available for this order yet.");
      return;
    }
    window.open(invoiceUrl, "_blank");
  };

  return (
    <div className="relative w-full min-h-[300px] p-4 sm:p-6 md:p-8 bg-[#37291d] rounded-2xl">
      {!orders || orders.length === 0 ? (
        /* ---------------- EMPTY STATE ---------------- */
        <div className="relative flex flex-col items-center justify-center h-full text-center">
          <motion.button
            type="button"
            onClick={handleBackClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-2 block md:hidden text-[20px] btn-glow font-bold"
          >
            ⟵
          </motion.button>

          <h2 className="text-[rgb(228,185,154)] font-cinzel text-xl sm:text-2xl font-bold underline">
            My Orders
          </h2>

          <p className="opacity-80 mt-6 text-gray-400">
            You haven’t placed any orders yet.
          </p>
        </div>
      ) : (
        /* ---------------- ORDERS LIST ---------------- */
        <div className="relative text-white">
          {/* Back */}
          <motion.button
            type="button"
            onClick={handleBackClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-1 text-[20px] sm:text-[22px] btn-glow font-bold"
          >
            ⟵
          </motion.button>

          {/* Title */}
          <h2 className="text-[rgb(228,185,154)] font-cinzel text-2xl font-bold mb-6 underline text-center">
            Order History
          </h2>

          {/* Status Tabs */}
          <div className="flex flex-wrap gap-6 text-sm sm:text-base mb-6 text-[#f1b287]">
            {["all", "pending", "completed", "cancelled"].map((status) => (
              <span
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`cursor-pointer capitalize ${
                  activeStatus === status
                    ? "font-bold underline"
                    : "opacity-80"
                }`}
              >
                {status === "all" ? `All Orders (${orders.length})` : status}
              </span>
            ))}
          </div>

          {/* Header (Desktop only) */}
          <div className="hidden md:grid grid-cols-5 px-4 py-3 rounded-xl border border-[#5c4632] text-[#f1b287] font-semibold mb-4">
            <p>Item</p>
            <p className="text-center">Qty</p>
            <p className="text-center">Status</p>
            <p className="text-center">Total</p>
            <p className="text-center">Invoice</p>
          </div>

          {/* Orders */}
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const images = normalizeImages(order.product_image);
              const mainImage = images[0];

              return (
                <div
                  className="grid md:grid-cols-5 gap-4 p-4 rounded-xl border border-[#5c4632]"
                >
                  {/* Item */}
                  <div className="flex gap-4 items-start">
                    <Image
                      src={getValidImage(mainImage)}
                      alt={order.product_name}
                      width={64}
                      height={64}
                      className="rounded-lg object-cover shrink-0"
                    />
                    <p className="font-semibold leading-snug break-words line-clamp-2">
                      {order.product_name}
                    </p>
                  </div>

                  {/* Qty */}
                  <div className="md:text-center font-semibold">
                    <span className="md:hidden text-sm opacity-70 mr-1">
                      Qty:
                    </span>
                    {order.quantity || 1}
                  </div>

                  {/* Status */}
                  <div className="md:text-center font-semibold uppercase">
                    <span
                      className={
                        order.status === "pending"
                          ? "text-yellow-400"
                          : order.status === "PAID"
                          ? "text-blue-400"
                          : order.status === "delivered"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="md:text-center font-semibold">
                    <span className="md:hidden text-sm opacity-70 mr-1">
                      Total:
                    </span>
                    ₹{order.total_amount || order.price}
                  </div>

                  {/* Invoice */}
                  <div className="md:text-center">
                    <button
                      onClick={() => downloadInvoice(order.invoice_url)}
                      className="px-4 py-1.5 rounded-full bg-amber-900 hover:bg-amber-800 btn-glow text-sm"
                    >
                      Invoice
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
