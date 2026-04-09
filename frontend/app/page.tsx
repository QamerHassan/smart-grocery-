"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="bg-green-600 text-white py-20 text-center rounded-b-3xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Smart Grocery</h1>
        <p className="text-lg md:text-xl mb-6">
          Your one-stop solution for all grocery needs delivered fast and fresh!
        </p>
        <Link
          href="/products"
          className="bg-yellow-500 text-green-800 px-6 py-3 font-semibold rounded-lg hover:bg-yellow-600 transition"
        >
          Browse Products
        </Link>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/products" className="bg-white p-4 rounded shadow hover:shadow-lg text-center transition">
            <span className="font-semibold">Fruits</span>
          </Link>
          <Link href="/products" className="bg-white p-4 rounded shadow hover:shadow-lg text-center transition">
            <span className="font-semibold">Vegetables</span>
          </Link>
          <Link href="/products" className="bg-white p-4 rounded shadow hover:shadow-lg text-center transition">
            <span className="font-semibold">Dairy</span>
          </Link>
          <Link href="/products" className="bg-white p-4 rounded shadow hover:shadow-lg text-center transition">
            <span className="font-semibold">Beverages</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
