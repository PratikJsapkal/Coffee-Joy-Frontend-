"use client";

export default function AccountLayout({ children }) {
  return (
    <div className="flex  min-h-screen gap-6">
      {/* LEFT SIDEBAR */}
        {/* your menu UI exactly as it is */}

      {/* RIGHT CONTENT */}
      <main className="flex-1 bg-[#2a1c12] rounded-xl">
        {children}
      </main>
    </div>
  );
}

