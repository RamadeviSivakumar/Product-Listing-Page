import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

export default async function ProductsPage() {
  const response = await fetch(
    "https://dummyjson.com/products",
    {
      next:{
        revalidate:60,
      },
    }
  );


  if (!response.ok) {
    throw new Error(
      `Failed to fetch products: ${response.status}`
    );
  }

  const data = await response.json();
    console.log(data.products[0].thumbnail);


  return (
    <div className="page">
      <Header />

      <main>
        <h2 className="heading">
          Product List
        </h2>

        <div className="product-grid">
          {data.products.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </main>
    </div>
  );
}