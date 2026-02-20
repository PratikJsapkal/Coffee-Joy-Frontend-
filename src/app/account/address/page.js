"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { showShippingAddressThunk } from "@/redux/features/shippingSlice";
import {
  addShippingAddressThunk,
  deleteShippingAddressThunk,
  updateShippingAddressThunk,
} from "@/redux/features/shippingSlice";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

export default function AddressPage({ onBack }) {
  const [showForm, setShowForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [editId, setEditId] = useState(null);
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.shipping.address?.data || []);

  // Detect mobile
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    address_type: "HOME",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    is_default: true,
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleBackClick = () => {
    if (isMobile && onBack) {
      onBack(); // 📱 back to ProfileView
      return;
    }
    setShowForm(false);
    setEditId(null);
  };

  useEffect(() => {
    dispatch(showShippingAddressThunk());
  }, [dispatch]);

  console.log(form);

  const handleSubmitButton = async (e) => {
    e.preventDefault();

    const payload = {
      id: editId,
      ...form,
      address_type: form.address_type.toLowerCase(),
      is_default: form.is_default ? 1 : 0,
    };

    if (editId) {
      dispatch(updateShippingAddressThunk(payload)).then(() => {
        dispatch(showShippingAddressThunk());
      });
    } else {
      await dispatch(addShippingAddressThunk(payload)).then(() => {
        dispatch(showShippingAddressThunk());
      });
    }

    setEditId(null);
    setShowForm(false);
  };

  const handleDeleteButton = (id) => {
    dispatch(deleteShippingAddressThunk(id)).then(() => {
      dispatch(showShippingAddressThunk());
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-[#d7bf9a] p-4">
      <div className="max-w-8xl w-full relative">
        <div className="bg-[#2a1c12] p-4 rounded-lg shadow-lg sticky top-4 relative min-h-[400px]">
          {/* BACK BUTTON */}
          {(showForm || isMobile) && (
            <motion.div
              className="absolute top-4 left-4 z-20"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <motion.button
                onClick={handleBackClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-[20px] btn-glow font-bold"
              >
                ⟵
              </motion.button>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {!showForm && (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-2xl text-[rgb(228,185,154)] font-cinzel mb-10 mt-10 text-center underline">
                  My Address
                </h1>

                {addresses.length === 0 ? (
                  <p className="text-gray-500 text-center mt-40">
                    No addresses added.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((add) => (
                      <div
                        key={add.id}
                        className=" flex justify-between border p-4 rounded shadow shadow-sm"
                      >
                        <div>
                          <p className="font-medium capitalize font-cinzel font-normal pb-2">
                            {add.full_name}
                          </p>
                          <p className="font-medium capitalize">{add.phone}</p>
                          <p className="text-sm capitalize font-inter">
                            {add.address_line1}, {add.address_line2},{add.city}{" "}
                            - {add.postal_code}
                          </p>
                          <p className="text-sm capitalize">
                            {add.state}, {add.country}
                          </p>
                          <h2 className="font-playfair font-medium pt-3">
                            {" "}
                            Type : {add.address_type}{" "}
                          </h2>
                        </div>
                        <div className="flex gap-2  ">
                          <div>
                            <button onClick={() => handleDeleteButton(add.id)}>
                              <MdDelete className=" cursor-pointer size-5 hover:text-red-600" />
                            </button>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                (setShowForm(true),
                                  setEditId(add.id),
                                  setForm({
                                    full_name: add.full_name,
                                    phone: add.phone,
                                    address_type: add.address_type,
                                    address_line1: add.address_line1,
                                    address_line2: add.address_line2,
                                    city: add.city,
                                    state: add.state,
                                    postal_code: add.postal_code,
                                    country: "India",
                                    is_default: false,
                                  }));
                              }}
                            >
                              <MdEdit className=" cursor-pointer size-5 hover:text-yellow-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setShowForm(true)}
                    className=" cursor-pointer border border-amber-400 px-6 py-2 rounded-full bg-amber-800 btn-glow"
                  >
                    Add new address
                  </button>
                </div>
              </motion.div>
            )}

            {/* ADDRESS FORM */}
            {showForm && (
              <motion.form
                key="form"
                onSubmit={handleSubmitButton}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                className="space-y-4 mt-10"
              >
                <input
                  className="input capitalize-text"
                  name="full_name"
                  placeholder="full_name"
                  onChange={handleChange}
                  value={form.full_name}
                />
                <input
                  className="input"
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  value={form.phone}
                />
                <input
                  className="input capitalize-text"
                  name="address_line1"
                  placeholder="address_line1"
                  onChange={handleChange}
                  value={form.address_line1}
                />
                <input
                  className="input capitalize-text"
                  name="address_line2"
                  placeholder="address_line2"
                  onChange={handleChange}
                  value={form.address_line2}
                />
                <input
                  className="input capitalize-text"
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                  value={form.state}
                />
                <input
                  className="input capitalize-text"
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  value={form.city}
                />
                <input
                  className="input"
                  name="postal_code"
                  placeholder="postal_code"
                  onChange={handleChange}
                  value={form.postal_code}
                />
                <input
                  disabled
                  value="India"
                  className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/30 text-white/60"
                />

                <div>
                  <div className="flex gap-3 mt-2">
                    {["HOME", "OFFICE", "OTHER"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm({ ...form, address_type: type })}
                        className={` cursor-pointer py-3 px-6 rounded-xl border text-sm transition ${
                          form.address_type === type
                            ? "bg-white text-black"
                            : "border-white/30 text-white/70 hover:border-white/60"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-3xl bg-[#b2160e] text-white btn-glow"
                  >
                    {editId ? "Update Address" : "Save Address"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ✅ ONLY CSS CHANGE */}
      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
        }
        .capitalize-text {
          text-transform: capitalize;
        }
      `}</style>
    </div>
  );
}
