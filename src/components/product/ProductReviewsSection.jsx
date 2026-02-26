"use client"

import React, { useEffect, useState,useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductReviews, getReviewSummary, createReview ,checkCanReview } 
from "@/redux/features/reviewSlice"
import { motion } from "framer-motion"
import Star from "../Star"


const ProductReviewsSection = ({ productId }) => {
  const formRef = useRef(null)
  const dispatch = useDispatch()

  const { reviews, summary, canReview } = useSelector(
  (state) => state.reviews
)
  const { user } = useSelector((state) => state.auth) // assuming you have auth slice

  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

useEffect(() => {
  if (productId) {
    dispatch(getProductReviews(productId))
    dispatch(getReviewSummary(productId))
  }
}, [dispatch, productId])

useEffect(() => {
  if (productId && user) {
    dispatch(checkCanReview(productId))
  }
}, [dispatch, productId, user])


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await dispatch(
        createReview({
          product_id: productId,
          rating,
          comment,
        })
      ).unwrap()

      // refresh reviews after adding
      dispatch(getProductReviews(productId))
      dispatch(getReviewSummary(productId))

      // 🔥 Re-check eligibility
dispatch(checkCanReview(productId))

      setComment("")
      setRating(5)
      setShowForm(false)
    } catch (err) {
      alert(err || "Already reviewed")
    }
  }


  useEffect(() => {
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowForm(false)
    }
  }

  if (showForm) {
    document.addEventListener("mousedown", handleClickOutside)
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside)
  }
}, [showForm])

  return (
    <section className="bg-gradient-to-b from-[#050505] to-[#2a1b12] py-16">

      {/* Write Review Button (Only if Logged In) */}
    {user && canReview && (
  <div className="text-center mb-6">
    <button
      onClick={() => setShowForm(!showForm)}
      className="px-6 py-3 bg-[#c7a17a] text-black rounded-full font-semibold"
    >
      Write a Review
    </button>
  </div>
)}

      {/* Review Form */}
      {showForm && (
        <div
        ref={formRef}
        
        className="max-w-xl mx-auto bg-black p-6 rounded-xl mb-10">
          <form onSubmit={handleSubmit}>
            
            <h3 className="text-xl text-white mb-4">
              Add Your Review
            </h3>

            {/* Rating Select */}
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full mb-4 p-2 rounded bg-[#1a120c] text-white"
            >
              <option value={5}>5 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={2}>2 Stars</option>
              <option value={1}>1 Star</option>
            </select>

            {/* Comment */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows="4"
              placeholder="Write your review..."
              className="w-full mb-4 p-3 rounded bg-[#1a120c] text-white"
            />

            <button
              type="submit"
              className="px-6 py-2 bg-[#c7a17a] text-black rounded-full font-semibold"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}

      {/* Heading */}
      <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-cinzel text-white text-center">
          What Customers Are Saying
        </h1>

        <p className="mt-2 font-playfair text-gray-400 text-center">
          {summary?.avg_rating || 0} ⭐ ({summary?.total_reviews || 0} reviews)
        </p>
      </div>

      {/* Reviews */}
      {reviews && reviews.length > 0 && (
        <div className="pt-10 overflow-hidden">
          <motion.ul
            className="flex gap-6 px-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...reviews, ...reviews].map((review, i) => (
              <li
                key={i}
                className="w-[300px] shrink-0 bg-black p-5 rounded-2xl shadow-lg"
              >
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold mb-3">
                  {review.name?.charAt(0)}
                </div>

                <Star rating={review.rating} />

                <h2 className="text-white mt-2">
                  {review.name}
                  {review.is_verified && (
                    <span className="ml-2 text-xs text-green-400">
                      ✓ Verified
                    </span>
                  )}
                </h2>

                <p className="text-gray-300 mt-2">
                  {review.comment}
                </p>
              </li>
            ))}
          </motion.ul>
        </div>
      )}
    </section>
  )
}

export default ProductReviewsSection