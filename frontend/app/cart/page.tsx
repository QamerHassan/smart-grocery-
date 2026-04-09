"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useCart();
    const router = useRouter();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }
        router.push("/payment");
    };

    return (
        <div className="min-h-screen p-6 flex flex-col items-center bg-green-50">
            <h1 className="text-3xl font-bold text-green-600 mb-6">Your Cart</h1>

            {cart.length === 0 ? (
                <p className="text-gray-600">Cart is empty. <Link href="/products" className="text-green-600 underline">Shop Now</Link></p>
            ) : (
                <div className="bg-white p-6 rounded-lg w-full max-w-3xl shadow-md">
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between mb-2 items-center">
                            <div>
                                <p>{item.name}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Rs {item.price * item.quantity}</span>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-600 font-semibold"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <p className="font-bold text-green-600 text-right mt-4">Total: Rs {total}</p>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={clearCart}
                            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                        >
                            Clear Cart
                        </button>
                        <button
                            onClick={handleCheckout}
                            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
