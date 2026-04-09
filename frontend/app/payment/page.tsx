"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type PaymentMethod = "Easypaisa" | "JazzCash" | "SadaPay" | "NayaPay" | "Bank" | "COD";

export default function PaymentPage() {
    const router = useRouter();
    const { cart, clearCart } = useCart();
    const [form, setForm] = useState({ name: "", phone: "", address: "" });
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | "">("");
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const hasCheckedCart = useRef(false);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        // Only check cart once on initial mount
        if (hasCheckedCart.current) return;
        hasCheckedCart.current = true;

        if (cart.length === 0) {
            toast.error("Your cart is empty!");
            router.push("/products");
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Convert file to base64 string
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setScreenshot(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePayment = () => {
        if (!form.name || !form.phone || !form.address) {
            toast.error("Please fill all details!");
            return;
        }
        if (!selectedMethod) {
            toast.error("Select a payment method!");
            return;
        }
        if (
            (selectedMethod === "Easypaisa" ||
                selectedMethod === "JazzCash" ||
                selectedMethod === "SadaPay" ||
                selectedMethod === "NayaPay" ||
                selectedMethod === "Bank") &&
            !screenshot
        ) {
            toast.error("Upload payment screenshot!");
            return;
        }

        const order = {
            id: Date.now(),
            items: cart,
            amount: total,
            method: selectedMethod,
            customer: form,
            screenshot: screenshot,
            date: new Date().toLocaleString(),
        };

        try {
            const orders = JSON.parse(localStorage.getItem("orders") || "[]");
            orders.push(order);
            localStorage.setItem("orders", JSON.stringify(orders));

            // Store the current order ID separately for the success page
            localStorage.setItem("currentOrderId", order.id.toString());

            toast.success("Payment Successful!");

            // Navigate to success page immediately
            router.push("/payment-success");
        } catch (error) {
            toast.error("Failed to save order. Please try again.");
            console.error(error);
        }
    };

    const paymentMethods = [
        { name: "Easypaisa", icon: "💳" },
        { name: "JazzCash", icon: "📱" },
        { name: "SadaPay", icon: "💰" },
        { name: "NayaPay", icon: "🏦" },
        { name: "Bank", icon: "🏛️" },
        { name: "COD", icon: "💵" },
    ];

    const bankAccounts = [
        { bank: "Meezan Bank", account: "1234567890" },
        { bank: "MCB", account: "2345678901" },
        { bank: "HBL", account: "3456789012" },
        { bank: "Faisal Bank", account: "4567890123" },
        { bank: "AlHabib Bank", account: "5678901234" },
        { bank: "Bank Of Punjab", account: "6789012345" },
        { bank: "National Bank Of Pakistan", account: "7890123456" },
        { bank: "Allied Bank", account: "8901234567" },
        { bank: "UBL", account: "9012345678" },
        { bank: "Bank AlFalah", account: "0123456789" },
        { bank: "Soneri Bank", account: "1123456789" },
        { bank: "JS Bank", account: "1223456789" },
        { bank: "FINCA", account: "1323456789" },
        { bank: "Bank Islami", account: "1423456789" },
        { bank: "Summit Bank", account: "1523456789" },
        { bank: "Askari Bank", account: "1623456789" },
        { bank: "Silk Bank", account: "1723456789" },
    ];

    // Show loading if cart is empty (during redirect)
    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600">Redirecting...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-green-600 mb-8">Payment Page</h1>

            <div className="bg-white p-8 rounded-2xl w-full max-w-3xl shadow-xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customer Details</h2>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="border-2 border-gray-300 p-3 rounded-lg w-full mb-3 focus:border-green-500 focus:outline-none transition"
                />
                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="border-2 border-gray-300 p-3 rounded-lg w-full mb-3 focus:border-green-500 focus:outline-none transition"
                />
                <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="border-2 border-gray-300 p-3 rounded-lg w-full mb-6 focus:border-green-500 focus:outline-none transition"
                />

                <h2 className="text-2xl font-semibold mb-3 text-gray-800">Order Summary</h2>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between mb-2 text-gray-700">
                            <span>{item.name} × {item.quantity}</span>
                            <span className="font-semibold">Rs {item.price * item.quantity}</span>
                        </div>
                    ))}
                    <div className="border-t-2 border-gray-300 mt-3 pt-3">
                        <p className="font-bold text-green-600 text-right text-xl">Total: Rs {total}</p>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mb-3 text-gray-800">Payment Method</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    {paymentMethods.map((method) => (
                        <button
                            key={method.name}
                            className={`border-2 p-4 rounded-lg flex flex-col items-center justify-center gap-2 transition transform hover:scale-105 ${selectedMethod === method.name
                                ? "bg-green-600 text-white border-green-600 shadow-lg"
                                : "border-gray-300 hover:border-green-400"
                                }`}
                            onClick={() => setSelectedMethod(method.name as PaymentMethod)}
                        >
                            <span className="text-3xl">{method.icon}</span>
                            <span className="font-semibold">{method.name === "COD" ? "Cash on Delivery" : method.name}</span>
                        </button>
                    ))}
                </div>

                {(selectedMethod === "Easypaisa" || selectedMethod === "JazzCash" || selectedMethod === "SadaPay" || selectedMethod === "NayaPay") && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
                        <p className="text-gray-700">
                            Send payment to <strong className="text-blue-700">Qamer Hassan - 03034519490</strong>
                        </p>
                    </div>
                )}

                {selectedMethod === "Bank" && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-4 border-l-4 border-blue-500 max-h-64 overflow-y-auto">
                        <p className="font-semibold text-gray-700 mb-2">Send payment to Qamer Hassan (Bank Transfer)</p>
                        <ul className="list-disc ml-5 text-sm text-gray-600">
                            {bankAccounts.map((b) => (
                                <li key={b.bank} className="mb-1">
                                    <strong>{b.bank}:</strong> {b.account}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {(selectedMethod === "Easypaisa" || selectedMethod === "JazzCash" || selectedMethod === "SadaPay" || selectedMethod === "NayaPay" || selectedMethod === "Bank") && (
                    <div className="mb-6">
                        <label className="block mb-2 font-semibold text-gray-700">Upload Payment Screenshot</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
                        />
                        {screenshot && (
                            <div className="mt-3">
                                <img src={screenshot} alt="Preview" className="w-32 h-32 object-cover rounded-lg border-2 border-green-500" />
                            </div>
                        )}
                    </div>
                )}

                <button
                    onClick={handlePayment}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition transform hover:scale-105 shadow-lg"
                >
                    Confirm Payment
                </button>
            </div>
        </div>
    );
}