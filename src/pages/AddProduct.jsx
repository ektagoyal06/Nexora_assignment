import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext"; // ✅ import context

export default function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProducts(); // ✅ get addProduct from context

  const [previewImg, setPreviewImg] = useState(null);

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    category: "electronics",
    stock: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // ✅ Convert Image to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData({ ...productData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Use context to add product and clear form on success
  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await addProduct(productData); // ✅ add via context
    if (success) {
      // Clear form and preview
      setProductData({
        name: "",
        price: "",
        description: "",
        category: "electronics",
        stock: "",
        imageUrl: "",
      });
      setPreviewImg(null);

      // Optional: navigate to home or stay on the same page
      navigate("/"); // still navigate to home
    } else {
      alert("Failed to add product");
    }
  };

  return (
    <div className="px-8 py-10">
      <Link to="/" className="text-sm text-gray-600 hover:underline flex items-center gap-1 mb-4">
        ← Back to Products
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-600">Add New Product</h1>
        <p className="text-gray-600">Fill in the details below to add a new product to your catalog</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-sm p-8 border rounded-xl"
      >
        {/* Product Name */}
        <label className="block mb-5">
          <span className="font-medium">Product Name *</span>
          <input
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
            className="mt-2 w-full border rounded-lg px-3 py-2"
            placeholder="e.g. Wireless Headphones"
          />
        </label>

        {/* Price */}
        <label className="block mb-5">
          <span className="font-medium">Price (USD) *</span>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            className="mt-2 w-full border rounded-lg px-3 py-2"
            placeholder="0.00"
          />
        </label>

        {/* Description */}
        <label className="block mb-5">
          <span className="font-medium">Description</span>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="mt-2 w-full border rounded-lg px-3 py-2 h-24"
            placeholder="Write something..."
          />
        </label>

        {/* Category */}
        <label className="block mb-5">
          <span className="font-medium">Category *</span>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="mt-2 w-full border rounded-lg px-3 py-2"
          >
            <option value="electronics">Electronics</option>
            <option value="home">Home</option>
            <option value="accessories">Accessories</option>
          </select>
        </label>

        {/* Stock Quantity */}
        <label className="block mb-5">
          <span className="font-medium">Stock Quantity *</span>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            required
            className="mt-2 w-full border rounded-lg px-3 py-2"
            placeholder="e.g. 25"
          />
        </label>

        {/* Image Upload */}
        <label className="block mb-6">
          <span className="font-medium">Product Image *</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="mt-2 w-full border rounded-lg px-3 py-2"
          />
        </label>

        {/* Preview Image */}
        {previewImg && (
          <img
            src={previewImg}
            alt="Preview"
            className="h-48 w-48 object-cover rounded-lg border mx-auto mb-6"
          />
        )}

        <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-lg font-medium">
          + Add Product
        </button>
      </form>
    </div>
  );
}
