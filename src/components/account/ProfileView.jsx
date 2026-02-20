"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import Profile from "@/app/account/profile/page";
import Orders from "@/app/account/orders/page";
import Address from "@/app/account/address/page";
import ChangePassword from "@/app/account/change-password/page";
import Subscriptions from "@/app/account/subscriptions/page";
import Logout from "@/app/account/logout/page";


export default function ProfileView({ user, setUser }) {
  const [active, setActive] = useState("/account/profile");
  const [showContent, setShowContent] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // 🔙 Back handler for cancel buttons (mobile)
  const handleBack = () => {
  if (isMobile) {
    setActive("/account/profile");
    setShowContent(false); // sidebar + profile image show
  }
};

  return (
    <div className="w-full min-h-[60dvh] px-2 sm:px-4 lg:px-8 mt-16">
      <div className="relative grid grid-cols-1 md:grid-cols-[250px_1fr] gap-1 min-h-[80dvh]">

        {/* SIDEBAR */}
        <aside
  className={`bg-[#d7bf9a] rounded-xl p-2 space-y-1
  sticky top-20 self-start h-[calc(100vh-6rem)]
  overflow-y-auto scrollbar-hide
  ${showContent ? "hidden md:block" : "block"}`}
>

          {/* 📱 Mobile profile image */}
          {isMobile && (
            <div className="flex justify-center my-6">
              <button
                onClick={() => {
                  setActive("/account/profile");
                  setShowContent(true);
                }}
                className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-700 bg-white"
              >
                <Image
                  src={"https://cdns.barecms.com/images/RAT.WEBP"}
                  alt="profile"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          )}

          {/* MENU */}
          {[
            !isMobile && ["Profile", "/account/profile"],
            ["Orders", "/account/orders"],
            ["Manage address", "/account/address"],
            ["Change Password", "/account/change-password"],
            ["Subscriptions", "/account/subscriptions"],
            ["Logout", "/account/logout"],
          ]
            .filter(Boolean)
            .map(([name, href]) => {
              const isLogout = href === "/account/logout";

              return (
                <button
                  key={href}
                  onClick={() => {
                    setActive(href);
                    setShowContent(true);
                  }}
                  className={`w-full text-left px-5 py-3 mt-5 rounded-lg font-playfair font-semibold
                    ${
                      active === href
                        ? isLogout
                          ? "bg-red-700 text-white"
                          : "bg-[#1d150f] text-white"
                        : isLogout
                        ? "text-red-700 hover:bg-[#835f42]"
                        : "text-[#211a14] hover:bg-[#835f42]"
                    }`}
                >
                  {name}
                </button>
              );
            })}
        </aside>

        {/* CONTENT */}
        <main
  className={`bg-[#d7bf9a] rounded-xl p-4 sm:p-8
  h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide
  ${showContent ? "block" : "hidden md:block"}`}
>

          {active === "/account/profile" && (
            <Profile
              user={user}
              onEditClick={() => setIsEditOpen(true)}
              onBack={handleBack}   // ✅ THIS MAKES CANCEL WORK
            />
          )}

          {active === "/account/orders" && (
            <Orders onBack={handleBack} />
          )}

          {active === "/account/address" && (
            <Address onBack={handleBack} />
          )}

          {active === "/account/change-password" && (
            <ChangePassword onBack={handleBack} />
          )}

          {active === "/account/subscriptions" && (
            <Subscriptions onBack={handleBack} />
          )}

          {active === "/account/logout" && (
            <Logout onBack={handleBack} />
          )}
        </main>
      </div>

      {/* EDIT PROFILE MODAL / PAGE */}
      
    </div>
  );
}
