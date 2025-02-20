"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>

        <div className="z-10 space-y-8 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            SignPDF
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            Secure Digital PDF Signing with QR Verification
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              Try Prototype
            </Link>
            <Link
              href="#features"
              className="px-8 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-lg font-semibold mb-2">Digital Signatures</h3>
              <p className="text-gray-400">Secure and legally binding electronic signatures for your documents</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-lg font-semibold mb-2">QR Verification</h3>
              <p className="text-gray-400">Quick and reliable document verification through QR codes</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-lg font-semibold mb-2">Role-Based Access</h3>
              <p className="text-gray-400">Enterprise-grade security with granular access control</p>
            </div>
          </div>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </main>
  );
}