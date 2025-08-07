import { ReactNode } from "react";
import Slider from "@/components/Slider";
import { Sparkles, ArrowRight, ChevronDown } from "lucide-react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 text-slate-900 font-sans antialiased overflow-x-hidden">
      {/* Subtle background elements */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.05),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.04),transparent_50%)]" />
      
      {/* Floating orbs */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-200/15 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-indigo-200/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10">
        <div className="min-h-screen flex flex-col">
          {/* Main content */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-8">
            <div className="w-full max-w-7xl mx-auto">
              
              {/* Mobile Layout */}
              <div className="block lg:hidden space-y-8">
                {/* Mobile Header */}
                <div className="text-center space-y-6">
                  {/* Premium badge */}
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-600 bg-white/80 backdrop-blur-sm border border-slate-200/50 px-4 py-2 rounded-full shadow-sm">
                    <Sparkles size={12} className="text-indigo-600" />
                    <span>Premium</span>
                  </div>
                  
                  {/* Mobile Heading */}
                  <div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-black leading-[0.9] tracking-tighter">
                      <span className="block text-slate-900">Welcome to</span>
                      <span className="block bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
                        MyStore
                      </span>
                    </h1>
                    
                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <div className="w-8 h-px bg-gradient-to-r from-slate-400 to-slate-500" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <div className="w-4 h-px bg-gradient-to-r from-slate-500 to-slate-600" />
                    </div>
                  </div>
                  
                  {/* Mobile Description */}
                  <p className="text-lg text-slate-600 font-light leading-relaxed max-w-md mx-auto">
                    Discover extraordinary products with
                    <span className="text-slate-800 font-medium"> modern design</span>
                  </p>
                </div>

                {/* Mobile Slider - Full width and visible */}
                <div className="w-full px-2">
                  <div className="relative group">
                    <div className="bg-transparent rounded-2xl p-0">
                      {/* Mobile slider container */}
                      <div className="w-full h-64 sm:h-80 overflow-hidden rounded-xl">
                        <Slider />
                      </div>
                      
                      {/* Subtle decorative elements */}
                      <div className="absolute top-3 right-3 w-2 h-2 bg-indigo-400/60 rounded-full animate-pulse" />
                      <div className="absolute bottom-3 left-3 w-1 h-1 bg-slate-400/70 rounded-full animate-ping" />
                    </div>
                  </div>
                </div>

                {/* Mobile CTA Buttons */}
                <div className="flex flex-col gap-3 px-4">
                  <button className="group relative w-full overflow-hidden bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-4 rounded-full transition-all duration-300 hover:scale-[1.02] shadow-lg">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Explore Now
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                  
                  <button className="w-full border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-medium px-6 py-4 rounded-full transition-all duration-300 hover:bg-slate-50">
                    Watch Demo
                  </button>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid grid-cols-12 gap-12 items-center">
                
                {/* Desktop Left section */}
                <div className="col-span-7 space-y-8">
                  {/* Premium badge */}
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-600 bg-white/80 backdrop-blur-sm border border-slate-200/50 px-4 py-2 rounded-full shadow-sm">
                    <Sparkles size={12} className="text-indigo-600" />
                    <span>Premium</span>
                  </div>
                  
                  {/* Desktop Heading */}
                  <div className="space-y-6">
                    <h1 className="text-6xl xl:text-7xl font-black leading-[0.9] tracking-tighter">
                      <span className="block text-slate-900">Welcome to</span>
                      <span className="block bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
                        MyStore
                      </span>
                    </h1>
                    
                    {/* Decorative line */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-px bg-gradient-to-r from-slate-400 to-slate-500" />
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                      <div className="w-6 h-px bg-gradient-to-r from-slate-500 to-slate-600" />
                    </div>
                  </div>
                  
                  {/* Desktop Description */}
                  <p className="text-xl xl:text-2xl text-slate-600 font-light leading-relaxed max-w-2xl">
                    Discover extraordinary products with
                    <span className="text-slate-800 font-medium"> cutting-edge design</span>
                  </p>
                  
                  {/* Desktop CTA Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button className="group relative overflow-hidden bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                      <span className="relative z-10 flex items-center gap-2">
                        Explore Now
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </button>
                    
                    <button className="border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-medium px-8 py-4 rounded-full transition-all duration-300 hover:bg-slate-50">
                      Watch Demo
                    </button>
                  </div>
                  
                  {/* Social proof */}
                  <div className="pt-6">
                    <p className="text-sm text-slate-500 font-light">
                      Trusted by 10,000+ customers worldwide
                    </p>
                  </div>
                </div>

                {/* Desktop Right section - Slider */}
                <div className="col-span-5">
                  <div className="relative group">
                    <div className="relative bg-transparent rounded-3xl p-0">
                      {/* Desktop slider content */}
                      <div className="relative z-10 h-96">
                        <Slider />
                      </div>
                      
                      {/* Floating particles */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-400/50 rounded-full animate-ping" />
                      <div className="absolute bottom-6 left-6 w-1 h-1 bg-slate-400/60 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="pb-8 flex justify-center">
            <div className="animate-bounce">
              <ChevronDown size={24} className="text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10">
        {/* Elegant divider */}
        <div className="relative py-12">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </div>
        
        {/* Content container */}
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>

      {/* Ambient floating elements */}
      <div className="fixed top-1/4 left-4 w-1 h-1 bg-indigo-400/40 rounded-full animate-ping" />
      <div className="fixed top-1/2 right-8 w-0.5 h-0.5 bg-slate-400/50 rounded-full animate-pulse" />
      <div className="fixed bottom-1/3 left-12 w-1.5 h-1.5 bg-slate-400/30 rounded-full animate-bounce" />
    </main>
  );
};

export default HomeLayout;
