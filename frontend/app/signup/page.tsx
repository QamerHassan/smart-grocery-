"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        if (name && email && password) {
            alert("✅ Account created successfully!");
            router.push("/login");
        } else {
            alert("Please fill all fields");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create an Account
                </h1>

                <form onSubmit={handleSignup} className="flex flex-col gap-4">

                    <input
                        type="text"
                        placeholder="Full Name"
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="mt-2 bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition"
                    >
                        Sign Up
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-2">
                        Already have an account?{" "}
                        <a href="/login" className="text-green-700 font-semibold hover:underline">
                            Login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
