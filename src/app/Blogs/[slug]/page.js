'use client'
import React from 'react'
import blogs from '@/data/blog.json'
import { useParams } from 'next/navigation'
import Image from 'next/image'

const Page = () => {
  const { slug } = useParams()
  const blog = blogs.find((item) => item.slug === slug)

  if (!blog) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#0b0705] text-white">
        <h1 className="font-cinzel text-2xl">Blog not found</h1>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-b from-[#0b0705] via-[#120c09] to-[#0e0907] text-[#e6d8c3]">
      {/* Hero */}
      <div className="relative h-[80vh] md:h-screen w-full">
        <Image
         src={blog.coverImage}
  alt={blog.title}
  fill
  priority
  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1200px"
  className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <span className="inline-block mb-5 px-5 py-1 text-xs md:text-sm tracking-[0.25em] uppercase border border-[#c9a27d] text-[#c9a27d] font-cinzel">
              {blog.category}
            </span>

            <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#f6ead7]">
              {blog.title}
            </h1>

            <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs sm:text-sm text-[#d6bfa2] font-inter">
              <span>{blog.author}</span>
              <span>•</span>
              <span>{blog.publishedDate}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-[680px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <article className="font-inter text-[15.5px] sm:text-[17px] leading-[1.95] tracking-[0.01em] text-[#e3d5bf] space-y-9">
          {blog.content.split('\n\n').map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </article>

        {/* Divider */}
        <div className="flex items-center justify-center my-16">
          <span className="w-20 h-px bg-gradient-to-r from-transparent via-[#4a3423] to-transparent" />
        </div>

        {/* Author */}
        <div className="text-center font-inter">
          <p className="text-[#f3e6cf] font-medium tracking-wide">
            {blog.author}
          </p>
          <p className="text-sm text-[#bfa07a] mt-2">
            Writing about craft, coffee & culture
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-3 mt-12 font-playfair">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-1 text-sm tracking-wide border border-[#3f2c1f] text-[#c9a27d] hover:bg-[#1a120d] transition"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Page
