'use client'
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { getValidImage,normalizeImages } from "@/utils/getValidImage" // Import the utility here
import { AddToCartThunk } from "@/redux/features/cartSlice"
import { useDispatch ,useSelector } from "react-redux"
import { openCart } from "@/redux/features/uiSlice"

const CategoryRow = ({ title, items, viewAllLink = "/Products" }) => {
  // Ensure items is always an array
  const safeItems = Array.isArray(items) ? items : []
  const dispatch = useDispatch()
   const cartOpen = useSelector((state)=>state.ui.cartOpen)


  const handleAddToCart = async (item)=>{
    await dispatch(AddToCartThunk({
      product_id : item.id,
      quantity: item.qty,
      weight_kg:item.weights[0].weight_kg
    })).unwrap()

    dispatch(openCart())
  }

  return (
    <div>
      {/* Row header */}
      {title && (
        <div className="flex items-center justify-between mb-6 md:px-2 px-0">
          <h3 className="md:text-2xl text-[20px] font-playfair text-black font-semibold">
            {title}
          </h3>

          <Link href={viewAllLink}>
            <span className="md:text-md text-[14px] font-cinzel text-black cursor-pointer hover:underline whitespace-nowrap">
              View all →
            </span>
          </Link>
        </div>
      )}

      {title && <div className="w-16  bg-black mb-6 sm:mb-10" />}

      {/* Cards */}
      <div className="sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8 overflow-x-auto sm:overflow-visible flex space-x-4 sm:space-x-0 px-2 sm:px-0">
        {safeItems.map((item, index) => (
          <Link
            key={item.slug || index} // unique key
            href={`/Products/${item.slug || ""}`}
            className="flex-shrink-0 w-64 sm:w-auto group bg-white rounded-2xl p-4 sm:p-6 transition-all duration-500 hover:bg-black"
          >
            {/* Image */}
            <div className="relative w-full h-36 sm:h-44 mb-4 sm:mb-6">
              <Image
               src={getValidImage(normalizeImages(item.images )[0])}

                alt={item.name}
                fill
                className="object-contain transition-transform duration-500 group-hover:-translate-y-2"
              />
            </div>
            

            {/* Info */}
            <h4 className="text-base sm:text-lg font-playfair text-black group-hover:text-[#F3E0C8] truncate">
              {item.name}
            </h4>

            <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-300 mt-1">
              Best seller
            </p>

            <div className="mt-4 sm:mt-6 flex items-center justify-between">
              <div>
                  {item.weights[0].discount_price ? (
                        <>
                          {/* Discount Price */}
                          <span className="text-md font-medium text-black">
                            ₹{item.weights[0].discount_price}
                          </span>

                          {/* Original Price with line-through */}
                          <p className="line-through text-gray-500 text-sm">
                            ₹{item.weights[0].price}
                          </p>
                        </>
                      ) : (
                        /* If no discount price, show only original price */
                        <span className="text-md font-semibold text-black">
                          ₹{item.weights[0].price}
                        </span>
                      )}
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleAddToCart(item)
                }}
                className=" cursor-pointer px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-black text-[#F3E0C8] group-hover:bg-[#F3E0C8] group-hover:text-black text-sm sm:text-base transition"
              >
                Add
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryRow
