"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

export default function Navbar() {
    const pathname = usePathname();
    const { cart } = useCart();

    const links = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Cart", href: "/cart" },
        { name: "Payment", href: "/payment" },
        { name: "Contact", href: "/contact" },
        { name: "Login", href: "/login" },
        { name: "Signup", href: "/signup" },
    ];

    return (
        <nav className="bg-green-600 text-white shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center h-16">
                <Link href="/" className="font-bold text-xl">
                    Smart Grocery
                </Link>
                <ul className="flex space-x-4 items-center">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className={`px-3 py-1 rounded hover:bg-green-700 transition ${pathname === link.href ? "bg-green-800 font-semibold" : ""
                                    }`}
                            >
                                {link.name}
                                {link.name === "Cart" && cart.length > 0 && (
                                    <span className="ml-1 bg-yellow-500 text-green-800 text-xs font-bold px-2 rounded-full">
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
