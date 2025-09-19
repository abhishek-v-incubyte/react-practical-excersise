import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductCard } from "../components/ProductCard";

describe("ProductCard Component", () => {
  it("renders with title, image, and price", () => {
    render(
      <ProductCard
        title="Premium Headphones"
        image="/headphones.jpg"
        alt="Premium wireless headphones"
        price={199.99}
      />
    );

    expect(screen.getByText("Premium Headphones")).toBeInTheDocument();
    expect(
      screen.getByAltText("Premium wireless headphones")
    ).toBeInTheDocument();
    expect(screen.getByText("$199.99")).toBeInTheDocument();
  });

  it("formats price correctly with currency symbol", () => {
    render(<ProductCard title="Test Product" price={49.5} />);

    expect(screen.getByText("$49.50")).toBeInTheDocument();
  });

  it("renders with custom currency", () => {
    render(
      <ProductCard title="European Product" price={99.99} currency="EUR" />
    );

    expect(screen.getByText("€99.99")).toBeInTheDocument();
  });

  it("renders sale price when provided", () => {
    render(<ProductCard title="Sale Item" price={100} salePrice={75} />);

    const originalPrice = screen.getByText("$100.00");
    const salePrice = screen.getByText("$75.00");

    expect(originalPrice).toHaveClass("original-price");
    expect(salePrice).toHaveClass("sale-price");
  });

  it("renders product description", () => {
    render(
      <ProductCard
        title="Product with Description"
        price={50}
        description="High-quality product with amazing features"
      />
    );

    expect(
      screen.getByText("High-quality product with amazing features")
    ).toBeInTheDocument();
  });

  it("renders rating when provided", () => {
    render(
      <ProductCard
        title="Rated Product"
        price={60}
        rating={4.5}
        reviewCount={123}
      />
    );

    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("(123 reviews)")).toBeInTheDocument();
  });

  it("renders action buttons in footer", () => {
    render(
      <ProductCard
        title="Product with Actions"
        price={80}
        footer={
          <div>
            <button>Add to Cart</button>
            <button>Buy Now</button>
          </div>
        }
      />
    );

    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
    expect(screen.getByText("Buy Now")).toBeInTheDocument();
  });

  it("applies product-specific styling class", () => {
    const { container } = render(
      <ProductCard title="Styled Product" price={40} />
    );

    expect(container.firstChild).toHaveClass("product-card");
  });

  it("renders out of stock badge when stock is 0", () => {
    render(<ProductCard title="Out of Stock Product" price={30} stock={0} />);

    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
  });

  it("uses semantic HTML for product information", () => {
    render(
      <ProductCard
        title="Semantic Test Product"
        price={25}
        image="/test.jpg"
        alt="Test product"
      />
    );

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Test product");
  });
});
