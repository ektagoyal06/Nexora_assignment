import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { products } = useProducts(); // use context only

  return (
    <div className="px-10 py-10">
      <h1 className="text-4xl font-bold text-purple-600 text-center mb-3">
        Premium Collection
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Discover our curated selection of high-quality products
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((item, index) => (
          <ProductCard key={item._id || `product-${index}`} product={item} />
        ))}
      </div>
    </div>
  );
}
