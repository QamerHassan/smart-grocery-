"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function PaymentSuccessPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.removeItem("cartTotal");
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6 relative overflow-hidden">

            {/* ✅ Confetti Celebration */}
            <Confetti numberOfPieces={250} recycle={false} />

            {/* ✅ Success Card */}
            <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="bg-white w-full max-w-md p-10 rounded-2xl shadow-xl text-center border border-green-100"
            >
                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-extrabold text-green-600 mb-4"
                >
                    ✅ Payment Successful!
                </motion.h1>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Your order has been successfully placed.
                    <br />
                    Thank you for choosing{" "}
                    <span className="font-semibold text-green-700">Smart Grocery</span> 🌿
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/")}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition"
                >
                    Go to Home
                </motion.button>
            </motion.div>
        </div>
    );
}
