"use client";

import { useState } from "react";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`✅ Thank you ${name}! Your message has been received.`);
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    📩 Contact Us
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Your Email"
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <textarea
                        placeholder="Your Message"
                        className="p-3 h-32 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
