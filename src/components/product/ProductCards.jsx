import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartThunk } from "@/redux/features/cartSlice"
import { useDispatch ,useSelector } from "react-redux"
import { openCart } from "@/redux/features/uiSlice";

const ProductCard = ({ product }) => {

  const dispatch = useDispatch()
  const cartOpen = useSelector((state)=>state.ui.cartOpen)
  
  
    const handleAddToCart = async (product)=>{
    await dispatch(AddToCartThunk({
        product_id : product.id,
        quantity: product.qty,
        weight_kg:product.weights[0].weight_kg
      })).unwrap()

      dispatch(openCart())
    }
  
  return (
    <Link
      href={`/Products/${product.slug}`}
      className="
        group bg-[#b2a28e] rounded-2xl
        p-4 sm:p-6 transition-all
        duration-500 hover:bg-[#b2a28e]
        flex flex-col
      "
    >
      {/* IMAGE */}
      <div className="relative w-full h-36 sm:h-44 mb-4 sm:mb-6">
        <Image
          src={
            product.imageSrc ||
            "https://cdns.barecms.com/images/product-placeholder.png"
          }
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
          className="object-contain transition-transform duration-500 group-hover:-translate-y-2"
        />
      </div>

      {/* TITLE */}
      <h3 className="text-base sm:text-lg font-playfair text-black group-hover:text-[#F3E0C8] truncate">
        {product.name}
      </h3>

      {/* SUBTEXT */}
      <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-300 mt-1">
        Best seller
      </p>

      {/* FOOTER */}
      <div className="mt-auto flex gap-2 items-center justify-between">
        <div>
          {product.weights[0].discount_price ? (
            <>
              {/* Discount Price */}
              <span className="text-md font-medium text-black">
                ₹{product.weights[0].discount_price}
              </span>

              {/* Original Price with line-through */}
              <p className="line-through text-gray-500 text-sm">
                ₹{product.weights[0].price}
              </p>
            </>
          ) : (
            /* If no discount price, show only original price */
            <span className="text-md font-semibold text-black">
              ₹{product.weights[0].price}
            </span>
          )}
        </div>

        <button
          onClick={(e) =>{
            e.preventDefault()
            handleAddToCart(product)
          }}
          className="
            px-6 py-2 rounded-full
            bg-black text-white
            group-hover:bg-[#d6c3a3]
            group-hover:text-black
            transition
          "
        >
          Add
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
