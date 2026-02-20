"use client";

import { useState } from "react";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addShippingAddressThunk , showShippingAddressThunk } from "@/redux/features/shippingSlice";
import { cheakoutThunk } from "@/redux/features/cheakoutSlice";
import { useRouter } from "next/navigation";

export default function AddressPopup({
  open,
  onClose,
  productId,
  qty,
  weight,
  from,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const addressResponse = await dispatch(
      addShippingAddressThunk({
        ...form,
        address_type: form.address_type.toLowerCase(),
        is_default: form.is_default ? 1 : 0,
      })
    );

    const getAddressId = await dispatch(showShippingAddressThunk()).unwrap();

    const addressId = getAddressId?.data?.[0]?.id;

    if (!addressId) {
      console.log("Address ID missing");
      return;
    }

    console.log("Calling checkout...");

    const checkoutPayload = {
      shipping_address_id: addressId,
      coupon_code: null,
    };


    if (from === "pdp") {
      checkoutPayload.items = [
        {
           shipping_address_id: addressId,
           coupon_code: null,
           product_id: productId,
           weight_kg: weight ,
           quantity: qty
        },
      ];
    }

    const checkoutResponse = await dispatch(
      cheakoutThunk(checkoutPayload)
    ).unwrap()

    router.replace(
      `/checkout?id=${checkoutResponse.checkout_session_id}`
    );
    onClose()


  } catch (err) {
    console.log("Error:", err);
  }
};

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      <div className="relative w-full max-w-3xl rounded-3xl bg-black/80 text-white shadow-2xl border border-white/10 my-8">
        <div className="absolute inset-0 z-0 pointer-events-none bg-black/30">
          <Image
            src="https://cdns.barecms.com/images/formimage.png"
            alt=""
            fill
            className="object-cover opacity-60 mix-blend-overlay"
            priority
          />
        </div>

        <div className="relative z-10 p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Shipping Address</h1>
            <button onClick={onClose}>
              <IoCloseSharp />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* LEFT */}
            <div className="space-y-4">
              <Input label="Full Name" name="full_name" value={form.full_name} onChange={handleChange} />
              <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
              <Input label="Address Line 1" name="address_line1" value={form.address_line1} onChange={handleChange} />
              <Input label="Address Line 2" name="address_line2" value={form.address_line2} onChange={handleChange} />
            </div>

            {/* RIGHT */}
            <div className="space-y-4">
              <Input label="City" name="city" value={form.city} onChange={handleChange} />
              <Input label="State" name="state" value={form.state} onChange={handleChange} />
              <Input label="Postal Code" name="postal_code" value={form.postal_code} onChange={handleChange} />

              <div>
                <label className="text-xs uppercase text-white/70">
                  Country
                </label>
                <input
                  disabled
                  value="India"
                  className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/30 text-white/60"
                />
              </div>
            </div>

            {/* BOTTOM */}
            <div className="col-span-2 mt-6 space-y-4">
              <div>
                <p className="text-xs uppercase text-white/70 mb-2">
                  Save address as
                </p>
                <div className="flex gap-3">
                  {["HOME", "OFFICE", "OTHER"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          address_type: type,
                        }))
                      }
                      className={`py-2 px-5 rounded-xl border ${
                        form.address_type === type
                          ? "bg-white text-black"
                          : "border-white/30 text-white/70"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="is_default"
                  checked={form.is_default}
                  onChange={handleChange}
                />
                Save this address for faster checkout
              </label>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
                >
                  Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-xs uppercase text-white/70 mb-1 block">
        {label}
      </label>
      <input
        {...props}
        required
        className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/30 text-white outline-none"
      />
    </div>
  );
}
