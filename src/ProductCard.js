export function ProductCard({ title, description, price, imgUrl }) {
  return (
    <div className="product-card">
      <div>
        <img src={imgUrl} alt="product image" />
      </div>
      <div className="product-details">
        <h3>{title}</h3>
        <div className="description">{description}</div>
        <h4>$ {price}</h4>
      </div>
    </div>
  );
}
