"use client"

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import CategoryRow from "./BestSeller/CategoryRow"
import { fetchProducts } from "@/redux/features/productSlice"
import {
  selectBestSellersByCategory,
} from "@/redux/selectors/productSelectors"

const BestSellers = () => {
  const dispatch = useDispatch()

  const coffee = useSelector(
    selectBestSellersByCategory("Coffee")
  )
  const machines = useSelector(
    selectBestSellersByCategory("Machine")
  )
  const accessories = useSelector(
    selectBestSellersByCategory("Accessories")
  )

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <section className="relative w-full py-28 px-6 overflow-hidden bg-[#F3E0C8]">
      {/* Decorative beans – top left */}
      <div className="pointer-events-none absolute inset-0 z-[10]">
        <img
          src="https://cdns.barecms.com/images/beans3.webp"
          alt=""
          className="
            absolute
            top-0 sm:-top-4
            left-[-10%] sm:left-[-6rem]
            w-[50%] sm:w-[30%]
            max-w-none
            rotate-[180deg]
            opacity-90
          "
        />
      </div>

      {/* Decorative beans – bottom right */}
      <div className="pointer-events-none absolute inset-0 z-[10]">
        <img
          src="https://cdns.barecms.com/images/beans3.webp"
          alt=""
        className="absolute bottom-4 sm:-bottom-6 right-[-5%] sm:right-[-6rem] w-[50%] sm:w-[30%] max-w-none opacity-90"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="relative inline-block text-4xl md:text-5xl font-cinzel text-black pb-4">
            BEST SELLERS
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-40 h-[3px] bg-black" />
          </h2>

          <p className="mt-3 font-playfair font-bold text-black/60 text-md">
            Discover our curated collection
          </p>
        </div>

        {/* Category Rows */}
        <div className="space-y-16">
          <CategoryRow title="COFFEE" items={coffee} />
          <CategoryRow title="MACHINES" items={machines} />
          <CategoryRow title="ACCESSORIES" items={accessories} />
        </div>
      </div>
    </section>
  )
}

export default BestSellers
