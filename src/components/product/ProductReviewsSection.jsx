"use client"

import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getProductReviews,
  getReviewSummary,
  createReview,
  checkCanReview,
  markReviewHelpful,
  updateReview,
  deleteReview
} from "@/redux/features/reviewSlice"
import { motion } from "framer-motion"
import Star from "../Star"

const ProductReviewsSection = ({ productId }) => {
  const formRef = useRef(null)
  const dispatch = useDispatch()

  const { reviews, summary, canReview } = useSelector(
    (state) => state.reviews
  )

  const { user } = useSelector((state) => state.auth)

  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editingReviewId, setEditingReviewId] = useState(null)

  /* ================= FETCH DATA ================= */

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

  /* ================= SUBMIT HANDLER ================= */

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isEditing && editingReviewId) {
        await dispatch(
          updateReview({
            reviewId: editingReviewId,
            rating,
            comment
          })
        ).unwrap()
      } else {
        await dispatch(
          createReview({
            product_id: productId,
            rating,
            comment
          })
        ).unwrap()
      }

      dispatch(getProductReviews(productId))
      dispatch(getReviewSummary(productId))
      dispatch(checkCanReview(productId))

      // Reset form
      setComment("")
      setRating(5)
      setShowForm(false)
      setIsEditing(false)
      setEditingReviewId(null)

    } catch (err) {
      alert(err || "Something went wrong")
    }
  }

  /* ================= CLOSE FORM ON OUTSIDE CLICK ================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false)
        setIsEditing(false)
        setEditingReviewId(null)
      }
    }

    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showForm])

  /* ================= UI ================= */

  return (
    <section className="bg-gradient-to-b from-[#050505] to-[#2a1b12] py-16">

      {/* Write Review Button */}
      {user && canReview && (
        <div className="text-center mb-6">
          <button
            onClick={() => {
              setShowForm(!showForm)
              setIsEditing(false)
              setComment("")
              setRating(5)
            }}
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
          className="max-w-xl mx-auto bg-black p-6 rounded-xl mb-10"
        >
          <form onSubmit={handleSubmit}>
            <h3 className="text-xl text-white mb-4">
              {isEditing ? "Edit Your Review" : "Add Your Review"}
            </h3>

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full mb-4 p-2 rounded bg-[#1a120c] text-white"
            >
              {[5, 4, 3, 2, 1].map((star) => (
                <option key={star} value={star}>
                  {star} Stars
                </option>
              ))}
            </select>

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
              {isEditing ? "Update Review" : "Submit Review"}
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
          {summary?.avg_rating ?? 0} ⭐ ({summary?.total_reviews ?? 0} reviews)
        </p>
      </div>

      {/* Reviews */}
      {reviews?.length > 0 && (
        <div className="pt-10 overflow-hidden">
          <motion.ul
            className="flex gap-6 px-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity
            }}
          >
           {[...reviews, ...reviews]
  .filter((review) => review && review.id)
  .map((review, i) => (
              <li
                key={`${review.id}-${i}`}
                className="w-[300px] shrink-0 bg-black p-5 rounded-2xl shadow-lg"
              >
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold mb-3">
                  {review?.name?.charAt(0)}
                </div>

                <Star rating={review?.rating} />

                <h2 className="text-white mt-2">
                  {review?.name}
                  {review?.is_verified && (
                    <span className="ml-2 text-xs text-green-400">
                      ✓ Verified
                    </span>
                  )}
                </h2>

                <p className="text-gray-300 mt-2">
                  {review?.comment}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => dispatch(markReviewHelpful(review.id))}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    👍 Helpful ({review?.helpful_count ?? 0})
                  </button>

                  {user?.id === review?.user_id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setShowForm(true)
                          setIsEditing(true)
                          setEditingReviewId(review.id)
                          setRating(review.rating)
                          setComment(review.comment)
                        }}
                        className="text-xs text-blue-400"
                      >
                        Edit
                      </button>

                      <button
                        onClick={async () => {
                          if (confirm("Delete this review?")) {
                            await dispatch(deleteReview(review.id)).unwrap()
                            dispatch(getProductReviews(productId))
                            dispatch(getReviewSummary(productId))
                            dispatch(checkCanReview(productId))
                          }
                        }}
                        className="text-xs text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </motion.ul>
        </div>
      )}
    </section>
  )
}

export default ProductReviewsSection