// app/products/layout.tsx
import React, { ReactNode } from "react";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0 bg-slate-100 bg-opacity-50"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.15) 1px, transparent 0)`,
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-12 sm:px-6 sm:pt-20 lg:px-8 lg:pt-32">

        {/* Content Container */}
        <div className="relative">
          {/* Glassmorphism Container */}
          <div className="backdrop-blur-sm bg-white/70 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl shadow-black/5 p-4 sm:p-6 lg:p-8 xl:p-12">
            {/* Inner Glow Effect */}
            <div className="absolute inset-px bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 rounded-2xl sm:rounded-3xl pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10">{children}</div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 lg:-top-4 lg:-right-4 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 lg:-bottom-8 lg:-left-8 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-15 blur-2xl animate-pulse delay-1000"></div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="mt-8 sm:mt-12 lg:mt-16 flex justify-center items-center space-x-1.5 sm:space-x-2">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400 animate-bounce"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-400 animate-bounce delay-100"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-pink-400 animate-bounce delay-200"></div>
        </div>
      </main>
    </div>
  );
}
