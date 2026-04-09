"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        setOrders(storedOrders.reverse());
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-center text-green-600 mb-8"
            >
                🧾 My Orders
            </motion.h1>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                    You have no orders yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl shadow-lg p-6 border hover:shadow-xl transition"
                        >
                            <h2 className="text-xl font-bold text-green-700 mb-2">
                                Order #{order.id}
                            </h2>

                            <p className="text-gray-700">
                                <strong>Amount:</strong> Rs {order.amount}
                            </p>
                            <p className="text-gray-700">
                                <strong>Method:</strong> {order.method}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                                {order.date}
                            </p>

                            <button
                                onClick={() => setSelectedOrder(order)}
                                className="w-full mt-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                                View Receipt
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* ✅ Receipt Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-white w-96 rounded-2xl shadow-2xl p-6"
                        >
                            <h2 className="text-2xl font-bold text-green-600 text-center mb-4">
                                🧾 Receipt
                            </h2>

                            <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                            <p><strong>Amount:</strong> Rs {selectedOrder.amount}</p>
                            <p><strong>Payment Method:</strong> {selectedOrder.method}</p>
                            <p><strong>Date:</strong> {selectedOrder.date}</p>

                            <div className="flex justify-between mt-6">
                                <button
                                    onClick={() => window.print()}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Print
                                </button>

                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
