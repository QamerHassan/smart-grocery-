// components/Footer.tsx
"use client";

export default function Footer() {
    return (
        <footer className="bg-green-600 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                &copy; {new Date().getFullYear()} Smart Grocery. All rights reserved.
            </div>
        </footer>
    );
}
