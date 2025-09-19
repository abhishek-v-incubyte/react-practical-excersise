import React from "react";
import type { ReactNode } from "react";
import { Card } from "./Card";
import "./Card.css";

interface ProductCardProps {
  title: string;
  image?: string;
  alt?: string;
  price: number;
  salePrice?: number;
  currency?: "USD" | "EUR" | "GBP";
  description?: string;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  footer?: ReactNode;
  className?: string;
}

const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  alt = "",
  price,
  salePrice,
  currency = "USD",
  description,
  rating,
  reviewCount,
  stock,
  footer,
  className = "",
}) => {
  const formatPrice = (value: number) => {
    const symbol = currencySymbols[currency];
    return `${symbol}${value.toFixed(2)}`;
  };

  const productContent = (
    <div className="product-content">
      {stock === 0 && !image && (
        <div className="out-of-stock-badge standalone">Out of Stock</div>
      )}
      {image && (
        <div className="product-image">
          <img src={image} alt={alt} />
          {stock === 0 && (
            <div className="out-of-stock-badge">Out of Stock</div>
          )}
        </div>
      )}
      <div className="product-details">
        <h2 className="product-title">{title}</h2>

        {rating !== undefined && (
          <div className="product-rating">
            <span className="rating-value">{rating}</span>
            {reviewCount !== undefined && (
              <span className="review-count">({reviewCount} reviews)</span>
            )}
          </div>
        )}

        {description && <p className="product-description">{description}</p>}

        <div className="product-pricing">
          {salePrice ? (
            <>
              <span className="original-price">{formatPrice(price)}</span>
              <span className="sale-price">{formatPrice(salePrice)}</span>
            </>
          ) : (
            <span className="price">{formatPrice(price)}</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Card
      content={productContent}
      footer={footer}
      className={`product-card ${className}`.trim()}
    />
  );
};
