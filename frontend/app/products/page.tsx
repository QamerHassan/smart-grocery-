"use client";

import React, { useState, useEffect } from "react"; // <-- add React here
import { FaPlus, FaMinus } from "react-icons/fa";
import confetti from "canvas-confetti";
import { useCart, CartItem } from "../context/CartContext";
import Image from "next/image";
import { toast } from "react-hot-toast";
type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
};
// Example products list
const productsData: Product[] = [
    // Fruits
    { id: 1, name: "Apple", price: 220, image: "/products/apple.jpg", category: "Fruits" },
    { id: 2, name: "Banana", price: 100, image: "/products/banana.jpg", category: "Fruits" },
    { id: 3, name: "Watermelon", price: 250, image: "/products/watermelon.jpg", category: "Fruits" },
    { id: 4, name: "Muskmelon", price: 300, image: "/products/muskmelon.jpg", category: "Fruits" },
    { id: 5, name: "Avocado", price: 400, image: "/products/avocado.jpg", category: "Fruits" },
    { id: 6, name: "Persimmon", price: 350, image: "/products/persimmon.jpg", category: "Fruits" },
    { id: 7, name: "Peach", price: 320, image: "/products/peach.jpg", category: "Fruits" },
    { id: 8, name: "Pear", price: 280, image: "/products/pear.jpg", category: "Fruits" },
    { id: 9, name: "Pomegranate", price: 300, image: "/products/pomegranate.jpg", category: "Fruits" },
    { id: 10, name: "Guava", price: 200, image: "/products/guava.jpg", category: "Fruits" },
    { id: 11, name: "Mango", price: 450, image: "/products/mango.jpg", category: "Fruits" },
    { id: 12, name: "Grapes", price: 350, image: "/products/grapes.jpg", category: "Fruits" },

    // Vegetables
    { id: 13, name: "Potato", price: 80, image: "/products/potato.jpg", category: "Vegetables" },
    { id: 14, name: "Radish", price: 70, image: "/products/radish.jpg", category: "Vegetables" },
    { id: 15, name: "Peas", price: 150, image: "/products/peas.jpg", category: "Vegetables" },
    { id: 16, name: "Onion", price: 90, image: "/products/onion.jpg", category: "Vegetables" },
    { id: 17, name: "Ginger", price: 200, image: "/products/ginger.jpg", category: "Vegetables" },
    { id: 18, name: "Garlic", price: 180, image: "/products/garlic.jpg", category: "Vegetables" },
    { id: 19, name: "Tomato", price: 120, image: "/products/tomato.jpg", category: "Vegetables" },
    { id: 20, name: "Coriander", price: 40, image: "/products/coriander.jpg", category: "Vegetables" },
    { id: 21, name: "Mint Leaves", price: 50, image: "/products/mintleaves.jpg", category: "Vegetables" },
    { id: 22, name: "Cabbage", price: 100, image: "/products/cabbage.jpg", category: "Vegetables" },
    { id: 23, name: "Cauliflower", price: 150, image: "/products/cauliflower.jpg", category: "Vegetables" },
    { id: 24, name: "Lauki", price: 80, image: "/products/lauki.jpg", category: "Vegetables" },
    { id: 25, name: "Pumpkin", price: 120, image: "/products/pumpkin.jpg", category: "Vegetables" },
    { id: 26, name: "Round Gourd", price: 100, image: "/products/roundgourd.jpg", category: "Vegetables" },
    { id: 27, name: "Tinda", price: 90, image: "/products/tinda.jpg", category: "Vegetables" },
    { id: 28, name: "Bitter Gourd", price: 110, image: "/products/bittergourd.jpg", category: "Vegetables" },
    { id: 29, name: "Cucumber", price: 70, image: "/products/cucumber.jpg", category: "Vegetables" },
    { id: 30, name: "Lemon", price: 50, image: "/products/lemon.jpg", category: "Vegetables" },
    { id: 31, name: "Green Chili", price: 60, image: "/products/greenchili.jpg", category: "Vegetables" },
    { id: 32, name: "Spring Onion", price: 40, image: "/products/springonion.jpg", category: "Vegetables" },
    { id: 33, name: "Spinach", price: 50, image: "/products/spinach.jpg", category: "Vegetables" },

    // Dairy
    { id: 34, name: "Milk", price: 180, image: "/products/milk.jpg", category: "Dairy" },
    { id: 35, name: "Buttermilk", price: 80, image: "/products/buttermilk.jpg", category: "Dairy" },
    { id: 36, name: "Butter", price: 250, image: "/products/butter.jpg", category: "Dairy" },
    { id: 37, name: "Cheese", price: 400, image: "/products/cheeze.jpg", category: "Dairy" },
    { id: 38, name: "Yogurt", price: 120, image: "/products/yogurt.jpg", category: "Dairy" },
    { id: 39, name: "Ice Cream", price: 350, image: "/products/icecream.jpg", category: "Dairy" },
    { id: 40, name: "Coffee", price: 500, image: "/products/coffee.jpg", category: "Beverages" },
    { id: 41, name: "Cream", price: 300, image: "/products/cream.jpg", category: "Dairy" },

    // Beverages
    { id: 42, name: "Pepsi", price: 150, image: "/products/pepsi.jpg", category: "Beverages" },
    { id: 43, name: "7Up", price: 150, image: "/products/7up.jpg", category: "Beverages" },
    { id: 44, name: "Fanta", price: 150, image: "/products/fanta.jpg", category: "Beverages" },
    { id: 45, name: "ColaNext", price: 150, image: "/products/colanext.jpg", category: "Beverages" },
    { id: 46, name: "FizUp", price: 150, image: "/products/fizup.jpg", category: "Beverages" },
    { id: 47, name: "CocaCola", price: 150, image: "/products/cocacola.jpg", category: "Beverages" },
    { id: 48, name: "DietCoke", price: 150, image: "/products/dietcoke.jpg", category: "Beverages" },
    { id: 49, name: "Sprite", price: 150, image: "/products/sprite.jpg", category: "Beverages" },
    { id: 50, name: "MintSprite", price: 150, image: "/products/mintsprite.jpg", category: "Beverages" },
    { id: 51, name: "BiggApple", price: 150, image: "/products/biggapple.jpg", category: "Beverages" },
    { id: 52, name: "Sting", price: 150, image: "/products/sting.jpg", category: "Beverages" },
    { id: 53, name: "MountainDew", price: 150, image: "/products/mountaindew.jpg", category: "Beverages" },
    { id: 54, name: "RedBull", price: 250, image: "/products/redbull.jpg", category: "Beverages" },
    { id: 55, name: "LemonMalt", price: 150, image: "/products/lemonmalt.jpg", category: "Beverages" },
    { id: 56, name: "Nesle Juice", price: 150, image: "/products/neslejuice.jpg", category: "Beverages" },

    // Eggs
    { id: 57, name: "Eggs", price: 200, image: "/products/eggs.jpg", category: "Eggs" },

    // Bakery & Fast Food
    { id: 58, name: "Cake Rusk", price: 150, image: "/products/cakerusk.jpg", category: "Bakery & Fast Food" },
    { id: 59, name: "Rusk", price: 150, image: "/products/rusk.jpg", category: "Bakery & Fast Food" },
    { id: 60, name: "Chicken Bread", price: 200, image: "/products/chickenbread.jpg", category: "Bakery & Fast Food" },
    { id: 61, name: "Chicken Petty", price: 200, image: "/products/chickenpetty.jpg", category: "Bakery & Fast Food" },
    { id: 62, name: "Sandwich", price: 250, image: "/products/sandwich.jpg", category: "Bakery & Fast Food" },
    { id: 63, name: "Shawarma", price: 300, image: "/products/shawarma.jpg", category: "Bakery & Fast Food" },
    { id: 64, name: "Paratha Roll", price: 200, image: "/products/paratharoll.jpg", category: "Bakery & Fast Food" },
    { id: 65, name: "Pizza", price: 500, image: "/products/pizza.jpg", category: "Bakery & Fast Food" },
    { id: 66, name: "Burger", price: 350, image: "/products/burger.jpg", category: "Bakery & Fast Food" },
    { id: 67, name: "Wrap", price: 300, image: "/products/wrap.jpg", category: "Bakery & Fast Food" },
    { id: 68, name: "Fries", price: 150, image: "/products/fries.jpg", category: "Bakery & Fast Food" },
    { id: 69, name: "Bakery Biscuits", price: 100, image: "/products/bakerybiscuits.jpg", category: "Bakery & Fast Food" },

    // Snacks
    { id: 70, name: "Lays Classic", price: 120, image: "/products/laysclassic.jpg", category: "Snacks" },
    { id: 71, name: "Lays Masala", price: 120, image: "/products/laysmasala.jpg", category: "Snacks" },
    { id: 72, name: "Lays French Cheeze", price: 120, image: "/products/laysfrenchcheeze.jpg", category: "Snacks" },
    { id: 73, name: "Lays Paprika", price: 120, image: "/products/layspaprika.jpg", category: "Snacks" },
    { id: 74, name: "Lays Yogurt & Herb", price: 120, image: "/products/laysyogurtandherb.jpg", category: "Snacks" },
    { id: 75, name: "Lays Barbeque", price: 120, image: "/products/laysbarbeque.jpg", category: "Snacks" },
    { id: 76, name: "Lays Sour Cream & Onion", price: 120, image: "/products/layssourcreamandonion.jpg", category: "Snacks" },
    { id: 77, name: "BBQ Wavy", price: 120, image: "/products/bbqwavy.jpg", category: "Snacks" },
    { id: 78, name: "Wavy Masala Twist", price: 120, image: "/products/wavymasalatwist.jpg", category: "Snacks" },
    { id: 79, name: "Wavy Flamin Hot", price: 120, image: "/products/wavyflaminhot.jpg", category: "Snacks" },
    { id: 80, name: "Wavy Black Pepper", price: 120, image: "/products/wavyblackpepper.jpg", category: "Snacks" },
    { id: 81, name: "Wavy Yogurt & Herb", price: 120, image: "/products/wavyyogurtandherb.jpg", category: "Snacks" },
    { id: 82, name: "Toofani Kurkure", price: 120, image: "/products/toofanikurkure.jpg", category: "Snacks" },
    { id: 83, name: "Masala Munch Kurkure", price: 120, image: "/products/masalamunchkurkure.jpg", category: "Snacks" },
    { id: 84, name: "Kurkure Chatni Chaska", price: 120, image: "/products/kurkurechatnichaska.jpg", category: "Snacks" },
    { id: 85, name: "Kurkure Masala", price: 120, image: "/products/kurkuremasala.jpg", category: "Snacks" },
    { id: 86, name: "Cheetos Flamin Hot", price: 120, image: "/products/cheetosflaminhot.jpg", category: "Snacks" },
    { id: 87, name: "Cheetos Bites", price: 120, image: "/products/cheetosbites.jpg", category: "Snacks" },
    { id: 88, name: "Cheetos Cheeze", price: 120, image: "/products/cheetoscheeze.jpg", category: "Snacks" },
    { id: 89, name: "Cheetos Puffs", price: 120, image: "/products/cheetospuffs.jpg", category: "Snacks" },
    { id: 90, name: "Vegetables Lanty", price: 120, image: "/products/vegetableslanty.jpg", category: "Snacks" },
    { id: 91, name: "Salted Lanty", price: 120, image: "/products/saltedslanty.jpg", category: "Snacks" },
    { id: 92, name: "Jalapeno Lanty", price: 120, image: "/products/jalapenoslanty.jpg", category: "Snacks" },
    { id: 93, name: "Twich", price: 120, image: "/products/twich.jpg", category: "Snacks" },
    { id: 94, name: "3D Buggles BBQ", price: 120, image: "/products/3dbugglesbbq.jpg", category: "Snacks" },
    { id: 95, name: "3D Buggles Masala", price: 120, image: "/products/3dbugglesmasala.jpg", category: "Snacks" },
    { id: 96, name: "Snackers Masala", price: 120, image: "/products/snackersmasala.jpg", category: "Snacks" },
    { id: 97, name: "Snackers BBQ", price: 120, image: "/products/snackersbbq.jpg", category: "Snacks" },
    { id: 98, name: "Snacker Cheeze", price: 120, image: "/products/snackercheeze.jpg", category: "Snacks" },
    { id: 99, name: "Nimko Mix", price: 120, image: "/products/nimkomix.jpg", category: "Snacks" },
    { id: 100, name: "Salvani Nimko", price: 120, image: "/products/salvanimko.jpg", category: "Snacks" },
    { id: 101, name: "Kurkure Nimko Mix", price: 120, image: "/products/kurkurenimkomix.jpg", category: "Snacks" },

    // Chocolates & Sweets
    { id: 102, name: "Dairy Milk", price: 150, image: "/products/dairymilk.jpg", category: "Chocolates" },
    { id: 103, name: "Dairy Milk Oreo", price: 160, image: "/products/dairymilkoreo.jpg", category: "Chocolates" },
    { id: 104, name: "Dairy Milk Bubbly", price: 150, image: "/products/dairymilkbubbly.jpg", category: "Chocolates" },
    { id: 105, name: "Dairy Milk Roast Almond", price: 180, image: "/products/dairymilkroastalmond.jpg", category: "Chocolates" },
    { id: 106, name: "Dairy Milk Silk", price: 200, image: "/products/dairymilksilk.jpg", category: "Chocolates" },
    { id: 107, name: "KitKat", price: 120, image: "/products/kitkat.jpg", category: "Chocolates" },
    { id: 108, name: "Mars", price: 150, image: "/products/mars.jpg", category: "Chocolates" },
    { id: 109, name: "Snickers", price: 150, image: "/products/snickers.jpg", category: "Chocolates" },
    { id: 110, name: "Bounty", price: 150, image: "/products/bounty.jpg", category: "Chocolates" },
    { id: 111, name: "Perk", price: 100, image: "/products/perk.jpg", category: "Chocolates" },

    // Essentials / Spices
    { id: 112, name: "Sugar", price: 100, image: "/products/sugar.jpg", category: "Essentials" },
    { id: 113, name: "Red Chili Powder", price: 80, image: "/products/redchillipowder.jpg", category: "Essentials" },
    { id: 114, name: "Black Pepper", price: 200, image: "/products/blackpepper.jpg", category: "Essentials" },
    { id: 115, name: "Salt", price: 50, image: "/products/salt.jpg", category: "Essentials" },
    { id: 116, name: "Haldi", price: 60, image: "/products/haldi.jpg", category: "Essentials" },
    { id: 117, name: "Masale", price: 300, image: "/products/masale.jpg", category: "Essentials" },
    { id: 118, name: "Dalda Ghee", price: 800, image: "/products/daldaghee.jpg", category: "Essentials" },
    { id: 119, name: "Dalda Oil", price: 500, image: "/products/daldaoil.jpg", category: "Essentials" },
    { id: 120, name: "Yellow Label Tea", price: 400, image: "/products/yellowlabeltea.jpg", category: "Essentials" },
    { id: 121, name: "Everyday", price: 450, image: "/products/everyday.jpg", category: "Essentials" },

    // Condiments & Sauces
    { id: 146, name: "Ketchup", price: 250, image: "/products/ketchup.jpg", category: "Condiments" },
    { id: 147, name: "Mayonnaise", price: 300, image: "/products/mayonnaise.jpg", category: "Condiments" },
    { id: 148, name: "Chicken Spread", price: 350, image: "/products/chickenspread.jpg", category: "Condiments" },
    { id: 149, name: "Garlic Mayo Sauce", price: 350, image: "/products/garlicmayosauce.jpg", category: "Condiments" },
    { id: 150, name: "Mustard Sauce", price: 200, image: "/products/mustardsauce.jpg", category: "Condiments" },
    { id: 151, name: "Soy Sauce", price: 300, image: "/products/soyasauce.jpg", category: "Condiments" },
    { id: 152, name: "Chili Sauce", price: 250, image: "/products/chilisauce.jpg", category: "Condiments" },
    { id: 153, name: "Vinegar", price: 200, image: "/products/vinegar.jpg", category: "Condiments" },

    // Cleaning Supplies
    { id: 154, name: "Harpic Blue", price: 150, image: "/products/harpicblue.jpg", category: "Cleaning" },
    { id: 155, name: "Harpic Red", price: 150, image: "/products/harpicred.jpg", category: "Cleaning" },
    { id: 156, name: "Tezaab", price: 100, image: "/products/tezaab.jpg", category: "Cleaning" },
    { id: 157, name: "Phenyl", price: 120, image: "/products/phenyl.jpg", category: "Cleaning" },
    { id: 158, name: "Mop", price: 500, image: "/products/mop.jpg", category: "Cleaning" },
    { id: 159, name: "Phool Jharu", price: 80, image: "/products/phooljharu.jpg", category: "Cleaning" },
    { id: 160, name: "Bansi Jharu", price: 100, image: "/products/bansijharu.jpg", category: "Cleaning" },
    { id: 161, name: "Viper", price: 450, image: "/products/viper.jpg", category: "Cleaning" },
];

const categories = Array.from(new Set(productsData.map((p) => p.category)));

export default function ProductsPage() {
    const { addToCart } = useCart();

    const [products] = useState<Product[]>(productsData);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [sort, setSort] = useState<string>("default");
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    // Filter & Sort
    const handleFilterSort = () => {
        let tempProducts = [...products];
        if (selectedCategory !== "All") {
            tempProducts = tempProducts.filter((p) => p.category === selectedCategory);
        }
        if (sort === "low-to-high") tempProducts.sort((a, b) => a.price - b.price);
        if (sort === "high-to-low") tempProducts.sort((a, b) => b.price - a.price);
        setFilteredProducts(tempProducts);
    };

    // Call handleFilterSort whenever category or sort changes
    React.useEffect(() => {
        handleFilterSort();
    }, [selectedCategory, sort]);

    const handleQuantity = (productId: number, delta: number) => {
        setQuantities((prev) => {
            const newQty = Math.max(1, (prev[productId] || 1) + delta);
            return { ...prev, [productId]: newQty };
        });
    };

    const handleAddToCart = (product: Product) => {
        const qty = quantities[product.id] || 1;
        addToCart({ ...product, quantity: qty });
        confetti();
        toast.success(`${product.name} x${qty} added to cart!`);
    };

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            {/* Categories */}
            <div className="flex gap-4 mb-6 flex-wrap">
                <button
                    className={`px-4 py-2 rounded-lg ${selectedCategory === "All" ? "bg-green-600 text-white" : "bg-white border"}`}
                    onClick={() => setSelectedCategory("All")}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`px-4 py-2 rounded-lg ${selectedCategory === cat ? "bg-green-600 text-white" : "bg-white border"}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Sort */}
            <div className="flex gap-4 mb-6 items-center">
                <label>Sort by:</label>
                <select
                    className="border rounded px-2 py-1"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="default">Default</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
                        <Image src={product.image} alt={product.name} width={100} height={100} />
                        <h3 className="mt-2 font-semibold text-center">{product.name}</h3>
                        <p className="text-green-600 font-bold">Rs {product.price}</p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                            <button
                                className="px-2 py-1 bg-gray-200 rounded"
                                onClick={() => handleQuantity(product.id, -1)}
                            >
                                <FaMinus />
                            </button>
                            <span>{quantities[product.id] || 1}</span>
                            <button
                                className="px-2 py-1 bg-gray-200 rounded"
                                onClick={() => handleQuantity(product.id, 1)}
                            >
                                <FaPlus />
                            </button>
                        </div>

                        <button
                            className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
                            onClick={() => handleAddToCart(product)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}