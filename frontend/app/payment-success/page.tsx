"use client";

import React, { useEffect, useState, useRef } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

type Order = {
    id: number;
    items: { id: number; name: string; price: number; quantity: number; image: string }[];
    amount: number;
    method: string;
    customer: { name: string; phone: string; address: string };
    screenshot?: string | null;
    date: string;
};

export default function PaymentSuccessPage() {
    const router = useRouter();
    const { clearCart } = useCart();
    const [order, setOrder] = useState<Order | null>(null);
    const hasLoadedOrder = useRef(false);

    useEffect(() => {
        // Prevent multiple executions
        if (hasLoadedOrder.current) return;
        hasLoadedOrder.current = true;

        const currentOrderId = localStorage.getItem("currentOrderId");
        const orders: Order[] = JSON.parse(localStorage.getItem("orders") || "[]");

        if (!currentOrderId || orders.length === 0) {
            router.push("/products");
            return;
        }

        // Find the order with the matching ID
        const foundOrder = orders.find(o => o.id.toString() === currentOrderId);

        if (!foundOrder) {
            router.push("/products");
            return;
        }

        setOrder(foundOrder);

        // Clean up the currentOrderId after loading
        localStorage.removeItem("currentOrderId");

        // Clear cart
        clearCart();
    }, [router, clearCart]);

    const downloadPDF = () => {
        if (!order) return;
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.setTextColor(0, 128, 0);
        doc.text("Smart Grocery Order Receipt", 14, 20);

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Order ID: ${order.id}`, 14, 35);
        doc.text(`Date: ${order.date}`, 14, 42);

        doc.setFontSize(14);
        doc.text("Customer Information:", 14, 55);
        doc.setFontSize(11);
        doc.text(`Name: ${order.customer.name}`, 20, 63);
        doc.text(`Phone: ${order.customer.phone}`, 20, 70);
        doc.text(`Address: ${order.customer.address}`, 20, 77);
        doc.text(`Payment Method: ${order.method}`, 20, 84);

        doc.setFontSize(14);
        doc.text("Order Items:", 14, 97);
        doc.setFontSize(11);

        let y = 105;
        order.items.forEach((item) => {
            doc.text(`${item.name} x ${item.quantity} - Rs ${item.price * item.quantity}`, 20, y);
            y += 7;
        });

        doc.setFontSize(14);
        doc.setTextColor(0, 128, 0);
        doc.text(`Total Amount: Rs ${order.amount}`, 14, y + 10);

        doc.save(`Order_${order.id}.pdf`);
    };

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600">Loading your order...</p>
                </div>
            </div>
        );
    }

    const paymentIcons: Record<string, string> = {
        Easypaisa: "💳",
        JazzCash: "📱",
        NayaPay: "🏦",
        SadaPay: "💰",
        Bank: "🏛️",
        COD: "💵",
    };

    const bankDetails: Record<string, string[]> = {
        "Easypaisa": ["Account: Qamer Hassan 03034519490"],
        "JazzCash": ["Account: Qamer Hassan 03034519490"],
        "NayaPay": ["Account: Qamer Hassan 03034519490"],
        "SadaPay": ["Account: Qamer Hassan 03034519490"],
        "Bank": [
            "Meezan Bank - Acc: 1234567890",
            "MCB - Acc: 2345678901",
            "HBL - Acc: 3456789012",
            "Faisal Bank - Acc: 4567890123",
            "AlHabib Bank - Acc: 5678901234",
            "Bank Of Punjab - Acc: 6789012345",
            "National Bank Of Pakistan - Acc: 7890123456",
            "Allied Bank - Acc: 8901234567",
            "UBL - Acc: 9012345678",
            "Bank AlFalah - Acc: 0123456789",
            "Soneri Bank - Acc: 1123456789",
            "JS Bank - Acc: 1223456789",
            "FINCA - Acc: 1323456789",
            "Bank Islami - Acc: 1423456789",
            "Summit Bank - Acc: 1523456789",
            "Askari Bank - Acc: 1623456789",
            "Silk Bank - Acc: 1723456789",
        ],
    };

    return (
        <div className="min-h-screen p-6 flex flex-col items-center bg-gradient-to-br from-green-50 to-blue-50">
            <div className="text-center mb-6 animate-bounce">
                <div className="text-6xl mb-4">✅</div>
                <h1 className="text-4xl font-bold text-green-700 mb-2">Payment Successful!</h1>
                <p className="text-gray-600">Thank you for your order</p>
            </div>

            <div className="text-center mb-6">
                <div className="text-6xl">{paymentIcons[order.method] || "💵"}</div>
                <p className="text-xl font-semibold text-gray-700 mt-2">{order.method}</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
                <div className="bg-green-50 p-4 rounded-lg mb-6 border-l-4 border-green-500">
                    <p className="text-sm text-gray-600">Order ID: <span className="font-mono font-bold">{order.id}</span></p>
                    <p className="text-sm text-gray-600">Date: {order.date}</p>
                </div>

                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h2>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between mb-2 text-gray-700">
                            <span>{item.name} x {item.quantity}</span>
                            <span className="font-semibold">Rs {item.price * item.quantity}</span>
                        </div>
                    ))}
                    <div className="border-t-2 border-gray-300 mt-3 pt-3">
                        <p className="font-bold text-green-600 text-right text-xl">Total: Rs {order.amount}</p>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mb-3 text-gray-800">Customer Details</h2>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="text-gray-700 mb-1"><strong>Name:</strong> {order.customer.name}</p>
                    <p className="text-gray-700 mb-1"><strong>Phone:</strong> {order.customer.phone}</p>
                    <p className="text-gray-700"><strong>Address:</strong> {order.customer.address}</p>
                </div>

                <h2 className="text-2xl font-semibold mb-3 text-gray-800">Payment Method: {order.method}</h2>
                {bankDetails[order.method] && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-500">
                        <ul className="list-disc ml-5 text-sm text-gray-700">
                            {bankDetails[order.method].map((detail, idx) => (
                                <li key={idx} className="mb-1">{detail}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {order.screenshot && (
                    <div className="mb-6">
                        <p className="font-semibold mb-3 text-gray-800">Payment Screenshot:</p>
                        <img
                            src={order.screenshot}
                            alt="Payment Screenshot"
                            className="w-full max-w-md mx-auto rounded-lg border-2 border-green-500 shadow-lg"
                        />
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                        onClick={downloadPDF}
                        className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    >
                        <span>📥</span>
                        Download PDF
                    </button>
                    <button
                        onClick={() => router.push("/products")}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    >
                        <span>🛒</span>
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}