import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import "./styles.css";

const BASE_URL = "https://dummyjson.com";
const LIMIT = 15;

export default function App() {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [inProgress, setInProgress] = useState(true);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    console.log("inside useEffect");

    const fetchProducts = async () => {
      const response = await fetch(
        `${BASE_URL}/products?limit=${LIMIT}&skip=${offset}&delay=2000`
      );
      const result = await response.json();
      console.log("fetch products response: ", result);
      // set states
      setProducts((prevProducts) => [...prevProducts, ...result.products]);
      //products.concat(result.products)
      setInProgress(false);
      setLoadMore(false);
    };

    fetchProducts();
  }, [offset]);

  const renderProducts = () => {
    return products.map((product, index) => (
      <ProductCard
        key={product.id + index}
        title={product.title}
        description={product.description}
        price={product.price}
        imgUrl={product.images[0]}
      />
    ));
  };

  const handleInfiniteScroll = (event) => {
    if (loadMore) return;
    const endOfPage =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;
    console.log("--handleInfiniteScroll---", endOfPage);
    if (endOfPage) {
      console.log("--page offset---", offset);
      setLoadMore(true);
      setOffset((prevOffset) => prevOffset + LIMIT);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <div className="App">
      {inProgress ? <div>Loading....</div> : renderProducts()}
      {loadMore && (
        <div style={{ paddingTop: 20, paddingBottom: 10, color: "#0a790a" }}>
          loading more...
        </div>
      )}
    </div>
  );
}
