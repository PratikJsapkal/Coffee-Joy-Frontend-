
"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMySubscriptions } from "@/redux/features/subscriptionSlice";
import { updateSubscriptionStatusThunk } from "@/redux/features/subscriptionSlice";

export default function Subscriptions({ onBack }) {
  const dispatch = useDispatch();

  const { mySubscriptions, loading, error } = useSelector(
    (state) => state.subscription
  );

  useEffect(() => {
    dispatch(fetchMySubscriptions());
  }, [dispatch]);


  const handleStatusChange = (id, status)=>{
    dispatch(updateSubscriptionStatusThunk({id, status}));
  };

  return (
    <div className="relative w-full">
      {/* BACK BUTTON */}
      <motion.div
        className="absolute top-4 left-4 z-20 block sm:hidden"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <button
          onClick={onBack}
          className="text-[20px] btn-glow font-bold"
        >
          ⟵
        </button>
      </motion.div>

      {/* CARD */}
      <div className="card mt-12 sm:mt-4 p-6 sm:p-8">
        <h2 className="title text-[rgb(228,185,154)] mt-10 mb-6">
          My Subscriptions
        </h2>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-10 text-gray-400">
            Loading subscriptions...
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="text-center py-10 text-red-400">
            {error}
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && mySubscriptions?.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            You don’t have any subscriptions.
          </div>
        )}

        {/* LIST */}
        <div className="space-y-5">
          {mySubscriptions?.map((sub) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-gray-700 bg-[#111] p-5"
            >
              {/* TOP */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {sub.product_name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {sub.plan_name}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    sub.status === "active"
                      ? "bg-green-500/20 text-green-400"
                      : sub.status === "paused"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {sub.status}
                </span>
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-400">
                <div>
                  <p className="opacity-70">Frequency</p>
                  <p className="text-white">{sub.frequency}</p>
                </div>

                <div>
                  <p className="opacity-70">Next Delivery</p>
                  <p className="text-white">
                    {sub.next_delivery_date
                      ? new Date(sub.next_delivery_date).toDateString()
                      : "--"}
                  </p>
                </div>

                <div>
                  <p className="opacity-70">Price / Delivery</p>
                  <p className="text-white">₹{sub.price_per_delivery}</p>
                </div>

                <div>
                  <p className="opacity-70">Remaining</p>
                  <p className="text-white">{sub.remaining}</p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-5">
                {sub.status === "active" && (
                  <>
                    <button
                    onClick={() => handleStatusChange(sub.id, "paused")}
                    className="px-4 py-1.5 text-sm rounded bg-yellow-600">
                      Pause
                    </button>
                    <button 
                    onClick={() => handleStatusChange(sub.id, "cancelled")}
                    className="px-4 py-1.5 text-sm rounded bg-red-600">
                      Cancel
                    </button>
                  </>
                )}

                {sub.status === "paused" && (
                  <>
                    <button 
                    onClick={() => handleStatusChange(sub.id, "active")}
                    className="px-4 py-1.5 text-sm rounded bg-green-600">
                      Resume
                    </button>
                    <button 
                    onClick={() => handleStatusChange(sub.id, "cancelled")}
                    className="px-4 py-1.5 text-sm rounded bg-red-600">
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}