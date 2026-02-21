"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

import { FiSearch } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";

import navbarData from "@/data/navbar.json";
import Cart from "@/components/Cart";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setSearchQuery } from "@/redux/features/searchSlice";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollState, setScrollState] = useState("top");
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { user, authChecked } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  //search bar func
  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    dispatch(setSearchQuery(value));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    router.push("/Products");
    setSearchOpen(false);
  };

  /* SCROLL EFFECT */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const heroHeight = window.innerHeight;

      if (y < 80) setScrollState("top");
      else if (y < heroHeight - 80) setScrollState("mid");
      else setScrollState("past");
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleProfileButton = () => {
    if (!authChecked) return;

    if (user) {
      router.push("/account");
    } else {
      router.push("/Auth/login");
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full ">
      {/* ================= NAVBAR ================= */}
      <div
        className={clsx(
          "flex items-center justify-between px-5 md:px-8 py-4 md:py-5 transition-all duration-300",
          {
            "bg-transparent": scrollState === "top",
            "bg-black/30 backdrop-blur-lg": scrollState === "mid",
            "bg-black/70 backdrop-blur-2xl border-b border-white/20 shadow-lg":
              scrollState === "past",
          },
        )}
      >
        {/* LOGO */}
        <Link href="/">
          <div className="text-xl font-cinzel text-white cursor-pointer whitespace-nowrap">
            Coffee & Joy
          </div>
        </Link>

        {/* ================= DESKTOP LINKS ================= */}
        <ul className="hidden md:flex gap-10 text-sm font-medium font-cinzel cursor-pointer text-white">
          {navbarData.links.map((link, index) => (
            <li key={index} className="relative group">
              <NavLink href={link.href}>{link.label}</NavLink>

              {Array.isArray(link.dropdown) && (
                <DropdownContainer scrollState={scrollState}>
                  <div className="grid grid-cols-3 gap-10 p-10">
                    {link.dropdown.map((col, i) => (
                      <DropdownColumn key={i} title={col.title}>
                        {col.items.map((item, j) => (
                          <DropdownItem
                            key={j}
                            label={item.label}
                            slug={item.slug}
                          />
                        ))}
                      </DropdownColumn>
                    ))}
                  </div>
                </DropdownContainer>
              )}
            </li>
          ))}
        </ul>

        {/* ================= RIGHT ICONS ================= */}
        <div className="relative flex items-center text-white">
          {/* ========== MOBILE ICONS (ANIMATED) ========== */}
          <div className="flex md:hidden items-center gap-4">
            {/* 🔍 Search */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              animate={searchOpen ? { scale: 1.1 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              onClick={() => setSearchOpen((p) => !p)}
              className={clsx(
                "p-2 rounded-full transition-all duration-300",
                searchOpen &&
                  "bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.35)]",
              )}
            >
              <FiSearch className="text-white text-xl" />
            </motion.button>

            {/* 👤 Login */}

            <motion.div
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleProfileButton}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="p-2 rounded-full hover:bg-white/10 hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]"
            >
              <AiOutlineUser className="text-white text-xl" />
            </motion.div>

            {/* 🛒 Cart */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              onClick={() => setCartOpen(true)}
              className="p-2 rounded-full hover:bg-white/10 hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]"
            >
              <HiOutlineShoppingBag className="text-white text-xl" />
            </motion.button>
          </div>

          {/* DESKTOP ICONS (UNCHANGED) */}
          <div className="hidden md:flex items-center gap-8 ml-6">
            {/* Desktop Search */}
            <div
              className={clsx(
                "flex items-center px-2 py-2 rounded-full border transition-all duration-300 overflow-hidden",
                searchOpen
                  ? "w-44 bg-black/60 border-white/40"
                  : "w-10 bg-transparent border-transparent",
              )}
            >
              <button onClick={() => setSearchOpen((p) => !p)}>
                <FiSearch className="text-white hover:scale-140 transition cursor-pointer" />
              </button>

              {searchOpen && (
                <form onSubmit={onSubmit} className="w-full">
                  <input
                    autoFocus
                    type="text"
                    value={searchValue}
                    onChange={onChange}
                    placeholder="Search Coffee, Beans..."
                    className="bg-transparent outline-none text-sm text-white placeholder-white/50 w-full"
                    onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
                  />
                </form>
              )}
            </div>

            <button onClick={handleProfileButton}>
              <AiOutlineUser className="text-xl hover:scale-140 transition cursor-pointer hover:text-shadow-amber-50" />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="text-xl hover:scale-140 transition cursor-pointer hover:text-shadow-amber-50"
            >
              <HiOutlineShoppingBag />
            </button>
          </div>

          {/* HAMBURGER */}
          <button
            className="md:hidden ml-4 text-2xl cursor-pointer"
            onClick={() => setMenuOpen(true)}
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </div>

      {/* SEARCH DROPDOWN */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 6, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed left-1/2  -translate-x-1/2 
            w-[90vw] max-w-sm bg-black/80 backdrop-blur-xl font-playfair
            border border-white/20 rounded-2xl px-3 py-3 shadow-2xl md:hidden"
          >
            <form onSubmit={onSubmit}>
              <input
                autoFocus
                type="text"
                value={searchValue}
                onChange={onChange}
                placeholder="Search products..."
                className="bg-transparent outline-none text-sm text-white placeholder-white/50 w-full text-center"
                onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}

      {/* MOBILE MENU */}
      <div
        className={clsx(
          "fixed inset-y-0 right-0  w-[85%] max-w-sm bg-black text-white transform transition-transform duration-500 md:hidden overflow-x-hidden will-change-transform",

          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* HEADER */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-5 border-b border-white/20 bg-black">
          <span className="text-lg font-cinzel">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl p-2 rounded-full font-bold cursor-pointer transition hover:scale-75"
          >
            ✕
          </button>
        </div>

        {/* MENU CONTENT */}
        <div className="px-6 py-6 space-y-6 overflow-y-auto h-full pb-32">
          {navbarData.links.map((link, index) => {
            const isOpen = openMobileDropdown === index;

            return (
              <div key={index} className="border-b border-white/10 pb-4">
                <button
                  className="flex items-center justify-between w-full text-left text-lg font-cinzel"
                  onClick={() => setOpenMobileDropdown(isOpen ? null : index)}
                >
                  {link.label}
                  {link.dropdown && (
                    <span className="text-xl">{isOpen ? "−" : "+"}</span>
                  )}
                </button>

                <AnimatePresence>
                  {link.dropdown && isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="mt-4 grid gap-5"
                    >
                      {link.dropdown.map((col, i) => (
                        <div key={i}>
                          <h4 className="text-sm mb-2 text-white/60 uppercase">
                            {col.title}
                          </h4>
                          <ul className="space-y-2">
                            {col.items.map((item, j) => (
                              <li key={j}>
                                <Link
                                  href={`/navbarproducts/${item.slug}`}
                                  onClick={() => setMenuOpen(false)}
                                  className="block text-white/80 hover:text-white transition"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

/* HELPERS */

function DropdownContainer({ children, scrollState }) {
  return (
    <div
      className={clsx(
        "fixed top-[88px] left-12 right-12 rounded-2xl z-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all",
        scrollState === "top"
          ? "bg-black/30 backdrop-blur-lg"
          : "bg-black/70 backdrop-blur-2xl border border-white/20",
      )}
    >
      {children}
    </div>
  );
}

function DropdownColumn({ title, children }) {
  return (
    <div>
      <h4 className="text-2xl mb-5 text-white">{title}</h4>
      <ul className="space-y-3 text-white/80">{children}</ul>
    </div>
  );
}

function DropdownItem({ label, slug }) {
  return (
    <Link
      href={`/navbarproducts/${slug}`}
      className="hover:text-white hover:translate-x-2 transition block"
    >
      {label}
    </Link>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all group-hover:after:w-full"
    >
      {children}
    </Link>
  );
}
