import React from "react";
import Image from "next/image";
import Link from "next/link";
import blogs from "@/data/blog.json";

const Blogs = () => {
  const featured = blogs[0];
  const rightBlogs = blogs.slice(1, 4);
  const bottomBlogs = blogs.slice(4);

  return (
    <section className="min-h-screen bg-black px-4 md:px-12 py-14">
      {/* ================= HEADING ================= */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-cinzel text-white">
          Coffee Chronicles
        </h1>
        <p className="text-gray-400 mt-3 text-sm md:text-base">
          Stories, guides, and insights from the world of coffee
        </p>
      </div>

      {/* ================= TOP SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FEATURED BLOG */}
        <Link
          href={`/Blogs/${featured.slug}`}
          className="lg:col-span-2 relative block rounded-2xl overflow-hidden min-h-[300px] md:min-h-[380px] lg:min-h-[420px]"
        >
          <Image
            src={featured.coverImage}
            alt={featured.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="absolute bottom-4 md:bottom-6 p-4 md:p-6">
            <span className="bg-amber-500 text-black text-xs px-3 py-1 rounded-full">
              Featured
            </span>

            <h2 className="text-xl md:text-3xl font-bold text-white mt-3">
              {featured.title}
            </h2>

            <p className="text-gray-300 mt-2 max-w-xl text-sm md:text-base line-clamp-3">
              {featured.excerpt}
            </p>

            <div className="flex gap-3 text-xs md:text-sm text-gray-400 mt-3">
              <span>{featured.author}</span>
              <span>•</span>
              <span>{featured.readTime}</span>
            </div>
          </div>
        </Link>

        {/* RIGHT SIDE BLOGS */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-4 lg:hidden">
            Trending Reads
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2 lg:grid lg:gap-6 lg:overflow-visible scrollbar-hide">
            {rightBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/Blogs/${blog.slug}`}
                className="min-w-[260px] lg:min-w-0 block"
              >
                <div className="bg-[#0f0f0f] rounded-xl overflow-hidden transition hover:scale-[1.03]">
                  <div className="relative h-36 md:h-44">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 260px, 400px"
                    />
                  </div>

                  <div className="p-4">
                    <span className="text-xs text-amber-400 uppercase">
                      {blog.category}
                    </span>

                    <h3 className="text-white font-semibold mt-1 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BLOGS ================= */}
      <h2 className="text-white text-lg font-semibold mt-14 mb-6 lg:hidden">
        Latest Stories
      </h2>

      {/* MOBILE BOTTOM CARDS */}
      <div className="space-y-6 lg:hidden">
        {bottomBlogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/Blogs/${blog.slug}`}
            className="block"
          >
            <div className="relative h-[220px] rounded-2xl overflow-hidden transition hover:scale-[1.03]">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="100vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-4 p-4">
                <span className="text-xs text-amber-400 uppercase">
                  {blog.category}
                </span>

                <h3 className="text-white text-lg font-semibold mt-1 line-clamp-2">
                  {blog.title}
                </h3>

                <div className="flex gap-2 text-xs text-gray-300 mt-2">
                  <span>{blog.readTime}</span>
                  <span>•</span>
                  <span>{blog.publishedDate}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* DESKTOP BOTTOM GRID */}
      <div className="hidden lg:grid grid-cols-3 gap-6 mt-12">
        {bottomBlogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/Blogs/${blog.slug}`}
            className="block"
          >
            <div className="bg-[#0f0f0f] rounded-xl overflow-hidden transition hover:scale-[1.03] h-full flex flex-col">
              <div className="relative h-48">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-xs text-amber-400 uppercase">
                    {blog.category}
                  </span>

                  <h3 className="text-white font-semibold mt-1 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="flex justify-between mt-4 text-xs text-gray-500">
                  <span>{blog.readTime}</span>
                  <span>{blog.publishedDate}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
