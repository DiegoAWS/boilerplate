"use client";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black text-white">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>

        <div className="z-10 space-y-8 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Boilerplate
          </h1>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </main>
  );
}
