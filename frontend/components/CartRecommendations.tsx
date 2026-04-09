"use client";

import React from "react";
import { CartItem } from "../app/context/CartContext";

type CartRecommendationsProps = {
    recommendations: CartItem[];
    onAdd: (item: CartItem) => void;
};

export default function CartRecommendations({ recommendations, onAdd }: CartRecommendationsProps) {
    if (recommendations.length === 0) return null;

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4 text-green-600">Recommended for You</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommendations.map((item) => (
                    <div key={item.id} className="border rounded p-2 flex flex-col items-center">
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-cover mb-2 rounded" />
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-green-600 font-bold">Rs {item.price}</p>
                        <button
                            className="mt-2 px-2 py-1 bg-green-600 text-white rounded"
                            onClick={() => onAdd({ ...item, quantity: 1 })}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
