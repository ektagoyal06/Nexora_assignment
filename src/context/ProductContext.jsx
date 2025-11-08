import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    {
      _id: crypto.randomUUID(),
      name: "Wireless Noise-Canceling Headphones",
      price: "299.99",
      description:
        "Premium over-ear headphones with active noise cancellation and 30-hour battery life",
      category: "electronics",
      stock: 10,
      imageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    },
    {
      _id: crypto.randomUUID(),
      name: "smart watch series 5",
      price: "399.99",
      description:
        "Advanced fitness tracking with heart rate monitoring and GPS navigation",
      category: "electronics",
      stock: 10,
      imageUrl: "/watch.jpg",
    },
    {
      _id: crypto.randomUUID(),
      name: "Minimalist Leather Backpack",
      price: "799.99",
      description:
        "Handcrafted genuine leather backpack with laptop compartment",
      category: "electronics",
      stock: 10,
      imageUrl:
        "/backpack.jpg",
    },
    {
      _id: crypto.randomUUID(),
      name: "Premium Coffee Maker",
      price: "399.99",
      description:
        "Programmable 12-cup coffee maker with thermal carafe",
      category: "electronics",
      stock: 10,
      imageUrl:
        "/coffee.jpg",
    },
    {
      _id: crypto.randomUUID(),
      name: "Hair Dryer",
      price: "399.99",
      description:
        "Advanced fitness tracking with heart rate monitoring and GPS navigation",
      category: "electronics",
      stock: 10,
      imageUrl:
        "/hair.jpg",
    },
    {
      _id: crypto.randomUUID(),
      name: "Refrigerator",
      price: "399.99",
      description:
        "Advanced fitness tracking with heart rate monitoring and GPS navigation",
      category: "electronics",
      stock: 10,
      imageUrl:
        "/refrigerator.jpg",
    },
  ]);

  // ✅ Fetch backend products on mount and merge without duplicates
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        if (data.success) {
          setProducts((prev) => {
            const existingIds = new Set(prev.map((p) => p._id));
            const newProducts = data.products.filter((p) => !existingIds.has(p._id));
            return [...prev, ...newProducts];
          });
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Add product both locally and to backend
  const addProduct = async (product) => {
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => [...prev, data.product]);
        return true;
      } else {
        console.error("Failed to add product:", data.message);
        return false;
      }
    } catch (error) {
      console.error("Error adding product:", error);
      return false;
    }
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
